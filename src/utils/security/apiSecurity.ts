/**
 * API security utilities for request signing and validation
 */

import { securityMonitor, RATE_LIMITS } from './securityMonitor';
import { sanitizeInput } from './inputSanitizer';

interface SecureApiOptions {
  timeout?: number;
  retries?: number;
  validateResponse?: boolean;
  rateLimit?: boolean;
}

/**
 * Secure API request wrapper with built-in protections
 */
export async function secureApiRequest(
  url: string,
  options: RequestInit & SecureApiOptions = {}
): Promise<Response> {
  const {
    timeout = 10000,
    retries = 1,
    validateResponse = true,
    rateLimit = true,
    ...fetchOptions
  } = options;

  // Rate limiting check
  if (rateLimit) {
    const rateLimitPassed = securityMonitor.checkRateLimit(
      `api_${new URL(url).hostname}`,
      RATE_LIMITS.API_CALLS
    );
    
    if (!rateLimitPassed) {
      throw new Error('Rate limit exceeded for API requests');
    }
  }

  // Request validation
  if (fetchOptions.body && typeof fetchOptions.body === 'string') {
    try {
      const bodyData = JSON.parse(fetchOptions.body);
      // Sanitize request body
      const sanitizedBody = JSON.stringify(sanitizeRequestBody(bodyData));
      fetchOptions.body = sanitizedBody;
    } catch (error) {
      securityMonitor.logSecurityEvent({
        type: 'invalid_input',
        timestamp: Date.now(),
        details: 'Invalid JSON in API request body',
        severity: 'medium'
      });
    }
  }

  // Add security headers
  const secureHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    ...fetchOptions.headers
  };

  let lastError: Error;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        headers: secureHeaders,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Response validation
      if (validateResponse) {
        await validateApiResponse(response);
      }

      // Log successful request
      securityMonitor.logSecurityEvent({
        type: 'api_error', // Using as info level
        timestamp: Date.now(),
        details: `API request successful: ${response.status}`,
        severity: 'low'
      });

      return response;

    } catch (error) {
      lastError = error as Error;
      
      securityMonitor.logSecurityEvent({
        type: 'api_error',
        timestamp: Date.now(),
        details: `API request failed (attempt ${attempt + 1}): ${lastError.message}`,
        severity: attempt === retries ? 'high' : 'medium'
      });

      if (attempt === retries) {
        throw lastError;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw lastError!;
}

/**
 * Sanitize request body recursively
 */
function sanitizeRequestBody(data: any): any {
  if (typeof data === 'string') {
    return sanitizeInput(data);
  }
  
  if (Array.isArray(data)) {
    return data.map(sanitizeRequestBody);
  }
  
  if (data && typeof data === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      const sanitizedKey = sanitizeInput(key, { allowSpecialChars: false });
      sanitized[sanitizedKey] = sanitizeRequestBody(value);
    }
    return sanitized;
  }
  
  return data;
}

/**
 * Validate API response for security issues
 */
async function validateApiResponse(response: Response): Promise<void> {
  // Check response headers for suspicious content
  const contentType = response.headers.get('content-type');
  if (contentType && !contentType.includes('application/json') && !contentType.includes('text/plain')) {
    securityMonitor.logSecurityEvent({
      type: 'suspicious_activity',
      timestamp: Date.now(),
      details: `Unexpected content type in API response: ${contentType}`,
      severity: 'medium'
    });
  }

  // Check for suspicious headers
  const suspiciousHeaders = ['x-xss-protection', 'x-frame-options'];
  suspiciousHeaders.forEach(header => {
    const headerValue = response.headers.get(header);
    if (headerValue && headerValue.toLowerCase().includes('allowall')) {
      securityMonitor.logSecurityEvent({
        type: 'suspicious_activity',
        timestamp: Date.now(),
        details: `Suspicious security header value: ${header}=${headerValue}`,
        severity: 'high'
      });
    }
  });

  // Validate response size
  const contentLength = response.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) { // 50MB limit
    securityMonitor.logSecurityEvent({
      type: 'suspicious_activity',
      timestamp: Date.now(),
      details: `Unusually large API response: ${contentLength} bytes`,
      severity: 'medium'
    });
  }
}

/**
 * Generate request signature for API authentication
 */
export function generateRequestSignature(
  method: string,
  url: string,
  body: string,
  timestamp: number,
  secret: string
): string {
  const message = `${method.toUpperCase()}|${url}|${body}|${timestamp}`;
  
  // Simple hash-based signature (in production, use proper HMAC)
  return btoa(message + secret).replace(/[+/=]/g, '').substring(0, 32);
}

/**
 * Add request signature to headers
 */
export function addRequestSignature(
  headers: Record<string, string>,
  method: string,
  url: string,
  body: string = '',
  secret?: string
): Record<string, string> {
  if (!secret) return headers;

  const timestamp = Date.now();
  const signature = generateRequestSignature(method, url, body, timestamp, secret);

  return {
    ...headers,
    'X-Timestamp': timestamp.toString(),
    'X-Signature': signature
  };
}