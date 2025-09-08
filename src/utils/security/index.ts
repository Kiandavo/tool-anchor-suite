/**
 * Security utilities main export file
 */

export * from './inputSanitizer';
export * from './securityMonitor';
export * from './domSecurity';
export * from './secureStorage';
export * from './securityHeaders';
export * from './apiSecurity';
export * from './safeMathEvaluator';

// Initialize security features when imported
import { addCSPMetaTag } from './domSecurity';
import { addSecurityHeaders, initializeSecurityMonitoring } from './securityHeaders';

/**
 * Initialize all security features
 */
export function initializeSecurity(): void {
  // Add CSP headers
  addCSPMetaTag();
  
  // Add security headers
  addSecurityHeaders();
  
  // Start security monitoring
  initializeSecurityMonitoring();
}

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSecurity);
  } else {
    initializeSecurity();
  }
}