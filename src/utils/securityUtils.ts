
/**
 * Security utility functions for input sanitization and validation
 */

// Sanitize text input to prevent XSS attacks
export const sanitizeTextInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    // Remove script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframe tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove javascript: protocols
    .replace(/javascript:/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove data URIs that might contain scripts
    .replace(/data:(?!image\/)[^;]+;base64,/gi, '')
    // Trim whitespace
    .trim();
};

// Validate API key format (basic validation)
export const validateApiKeyFormat = (apiKey: string): { isValid: boolean; error?: string } => {
  if (!apiKey || typeof apiKey !== 'string') {
    return { isValid: false, error: 'کلید API نامعتبر است' };
  }

  const trimmedKey = apiKey.trim();
  
  if (trimmedKey.length < 20) {
    return { isValid: false, error: 'کلید API خیلی کوتاه است' };
  }

  // Check for common API key patterns
  const validPrefixes = ['sk-', 'sk-or-', 'pk-', 'api-'];
  const hasValidPrefix = validPrefixes.some(prefix => trimmedKey.startsWith(prefix));
  
  if (!hasValidPrefix) {
    return { isValid: false, error: 'فرمت کلید API نامعتبر است' };
  }

  return { isValid: true };
};

// Rate limiting helper for client-side
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests: number[] = [];
  
  return (): boolean => {
    const now = Date.now();
    
    // Remove old requests outside the window
    while (requests.length > 0 && requests[0] <= now - windowMs) {
      requests.shift();
    }
    
    // Check if we're under the limit
    if (requests.length < maxRequests) {
      requests.push(now);
      return true;
    }
    
    return false;
  };
};

// Secure session storage helper
export const secureSessionStorage = {
  set: (key: string, value: string): void => {
    try {
      // Add a timestamp to enable expiration
      const data = {
        value: value,
        timestamp: Date.now()
      };
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to session storage:', error);
    }
  },
  
  get: (key: string, maxAgeMs: number = 3600000): string | null => { // Default 1 hour
    try {
      const item = sessionStorage.getItem(key);
      if (!item) return null;
      
      const data = JSON.parse(item);
      const age = Date.now() - data.timestamp;
      
      if (age > maxAgeMs) {
        sessionStorage.removeItem(key);
        return null;
      }
      
      return data.value;
    } catch (error) {
      console.error('Error reading from session storage:', error);
      return null;
    }
  },
  
  remove: (key: string): void => {
    sessionStorage.removeItem(key);
  }
};

// Content Security Policy helper (for meta tags)
export const getSecurityHeaders = () => {
  return {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.openrouter.ai https://openrouter.ai;",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
};
