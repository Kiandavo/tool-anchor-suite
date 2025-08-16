/**
 * Security headers and enhanced monitoring utilities
 */

import { securityMonitor } from './securityMonitor';

export interface SecurityHeaders {
  'X-Content-Type-Options': string;
  'X-Frame-Options': string;
  'X-XSS-Protection': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
  'Strict-Transport-Security': string;
}

/**
 * Get recommended security headers
 */
export function getSecurityHeaders(): SecurityHeaders {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  };
}

/**
 * Apply security headers to meta tags (for client-side enforcement)
 */
export function addSecurityHeaders(): void {
  const headers = getSecurityHeaders();
  
  Object.entries(headers).forEach(([name, content]) => {
    const existingMeta = document.querySelector(`meta[name="${name}"], meta[http-equiv="${name}"]`);
    if (existingMeta) return;

    const meta = document.createElement('meta');
    meta.setAttribute('http-equiv', name);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  });

  securityMonitor.logSecurityEvent({
    type: 'api_error', // Using api_error as info level
    timestamp: Date.now(),
    details: 'Security headers applied successfully'
  });
}

/**
 * Enhanced cookie security utilities
 */
export const secureCookies = {
  /**
   * Set a secure cookie with proper flags
   */
  set(name: string, value: string, options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    httpOnly?: boolean;
  } = {}): void {
    const {
      maxAge = 86400, // 24 hours
      path = '/',
      secure = location.protocol === 'https:',
      sameSite = 'lax',
      httpOnly = false
    } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    cookieString += `; Max-Age=${maxAge}`;
    cookieString += `; Path=${path}`;
    cookieString += `; SameSite=${sameSite}`;
    
    if (secure) {
      cookieString += '; Secure';
    }
    
    if (httpOnly) {
      cookieString += '; HttpOnly';
    }

    try {
      document.cookie = cookieString;
      
      securityMonitor.logSecurityEvent({
        type: 'api_error', // Using as info level
        timestamp: Date.now(),
        details: `Secure cookie set: ${name}`
      });
    } catch (error) {
      securityMonitor.logSecurityEvent({
        type: 'suspicious_activity',
        timestamp: Date.now(),
        details: `Failed to set secure cookie: ${name}`
      });
    }
  },

  /**
   * Get a cookie value safely
   */
  get(name: string): string | null {
    try {
      const value = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${encodeURIComponent(name)}=`))
        ?.split('=')[1];
      
      return value ? decodeURIComponent(value) : null;
    } catch (error) {
      securityMonitor.logSecurityEvent({
        type: 'api_error',
        timestamp: Date.now(),
        details: `Failed to read cookie: ${name}`
      });
      return null;
    }
  },

  /**
   * Delete a cookie securely
   */
  delete(name: string, path: string = '/'): void {
    this.set(name, '', { maxAge: 0, path });
  }
};

/**
 * Monitor for potential security threats
 */
export function initializeSecurityMonitoring(): void {
  // Monitor for suspicious DOM manipulation
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Check for suspicious script tags
            if (element.tagName === 'SCRIPT') {
              securityMonitor.logSecurityEvent({
                type: 'suspicious_activity',
                timestamp: Date.now(),
                details: `Script element added dynamically: ${element.getAttribute('src') || 'inline'}`
              });
            }
            
            // Check for suspicious iframe tags
            if (element.tagName === 'IFRAME') {
              securityMonitor.logSecurityEvent({
                type: 'suspicious_activity',
                timestamp: Date.now(),
                details: `Iframe element added: ${element.getAttribute('src') || 'about:blank'}`
              });
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Monitor for console manipulation attempts
  const originalConsole = { ...console };
  Object.keys(console).forEach((method) => {
    if (typeof console[method as keyof Console] === 'function') {
      (console[method as keyof Console] as any) = function(...args: any[]) {
        // Check for suspicious console usage patterns
        const message = args.join(' ');
        if (message.includes('javascript:') || message.includes('eval(')) {
          securityMonitor.logSecurityEvent({
            type: 'suspicious_activity',
            timestamp: Date.now(),
            details: `Suspicious console usage detected: ${method}`
          });
        }
        
        return (originalConsole[method as keyof Console] as any).apply(console, args);
      };
    }
  });

  securityMonitor.logSecurityEvent({
    type: 'api_error',
    timestamp: Date.now(),
    details: 'Security monitoring initialized successfully'
  });
}