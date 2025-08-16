/**
 * Secure DOM manipulation utilities
 */

import { sanitizeInput } from './inputSanitizer';
import { securityMonitor } from './securityMonitor';

/**
 * Safely set text content without XSS risks
 */
export function safeSetTextContent(element: HTMLElement, content: string): void {
  const sanitizedContent = sanitizeInput(content);
  element.textContent = sanitizedContent;
}

/**
 * Safely create HTML elements with validation
 */
export function safeCreateElement(
  tagName: string,
  options: {
    textContent?: string;
    className?: string;
    attributes?: Record<string, string>;
  } = {}
): HTMLElement | null {
  const allowedTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a', 'img'];
  
  if (!allowedTags.includes(tagName.toLowerCase())) {
    securityMonitor.logSecurityEvent({
      type: 'suspicious_activity',
      timestamp: Date.now(),
      details: `Attempt to create disallowed HTML element: ${tagName}`
    });
    return null;
  }

  try {
    const element = document.createElement(tagName);
    
    if (options.textContent) {
      safeSetTextContent(element, options.textContent);
    }
    
    if (options.className) {
      const sanitizedClassName = sanitizeInput(options.className, { allowSpecialChars: false });
      element.className = sanitizedClassName;
    }
    
    if (options.attributes) {
      for (const [key, value] of Object.entries(options.attributes)) {
        const sanitizedKey = sanitizeInput(key, { allowSpecialChars: false });
        const sanitizedValue = sanitizeInput(value);
        
        // Prevent dangerous attributes
        const dangerousAttributes = ['onclick', 'onload', 'onerror', 'onmouseover', 'javascript:'];
        if (dangerousAttributes.some(attr => sanitizedKey.toLowerCase().includes(attr))) {
          securityMonitor.logSecurityEvent({
            type: 'suspicious_activity',
            timestamp: Date.now(),
            details: `Attempt to set dangerous attribute: ${sanitizedKey}`
          });
          continue;
        }
        
        element.setAttribute(sanitizedKey, sanitizedValue);
      }
    }
    
    return element;
  } catch (error) {
    securityMonitor.logSecurityEvent({
      type: 'api_error',
      timestamp: Date.now(),
      details: `Failed to create element: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
    return null;
  }
}

/**
 * Safe alternative to innerHTML with sanitization
 */
export function safeSetInnerHTML(element: HTMLElement, html: string): void {
  // For safety, we'll create a text node instead of using innerHTML
  const sanitizedText = sanitizeInput(html, { allowHtml: false });
  element.textContent = sanitizedText;
  
  securityMonitor.logSecurityEvent({
    type: 'api_error',
    timestamp: Date.now(),
    details: 'innerHTML usage detected and converted to safe text content'
  });
}

/**
 * Create Content Security Policy meta tag
 */
export function addCSPMetaTag(): void {
  const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (existingCSP) return;

  const cspMeta = document.createElement('meta');
  cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
  cspMeta.setAttribute('content', 
    "default-src 'self'; " +
    "script-src 'self' https: 'wasm-unsafe-eval'; " +  // Removed unsafe-inline and unsafe-eval, kept wasm-unsafe-eval for React dev
    "style-src 'self' https: 'unsafe-inline'; " +       // Keep unsafe-inline for Tailwind
    "img-src 'self' data: https: blob:; " +             // Added blob: support
    "font-src 'self' https: data:; " +                  // Added data: for embedded fonts
    "connect-src 'self' https: wss:; " +                // Added wss: for websockets
    "frame-src 'none'; " +
    "frame-ancestors 'none'; " +                        // Prevent clickjacking
    "object-src 'none'; " +
    "base-uri 'self'; " +                               // Restrict base tag
    "form-action 'self';"                               // Restrict form submissions
  );
  
  document.head.appendChild(cspMeta);
}