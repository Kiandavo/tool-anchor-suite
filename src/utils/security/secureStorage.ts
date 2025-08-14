/**
 * Secure storage utilities with enhanced security features
 */

import { sanitizeInput } from './inputSanitizer';
import { securityMonitor } from './securityMonitor';

const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_ITEM_SIZE = 1024 * 1024; // 1MB per item

/**
 * Safely parse JSON with error handling and validation
 */
export function safeJsonParse<T>(
  jsonString: string | null,
  defaultValue: T,
  options: {
    maxSize?: number;
    allowedKeys?: string[];
    validator?: (data: any) => boolean;
  } = {}
): T {
  const { maxSize = MAX_ITEM_SIZE, allowedKeys, validator } = options;

  if (!jsonString || typeof jsonString !== 'string') {
    return defaultValue;
  }

  // Check size limit
  if (jsonString.length > maxSize) {
    securityMonitor.logSecurityEvent({
      type: 'suspicious_activity',
      timestamp: Date.now(),
      details: `JSON data exceeds size limit: ${jsonString.length} bytes`
    });
    return defaultValue;
  }

  try {
    const parsed = JSON.parse(jsonString);

    // Validate structure if validator provided
    if (validator && !validator(parsed)) {
      securityMonitor.logSecurityEvent({
        type: 'invalid_input',
        timestamp: Date.now(),
        details: 'JSON data failed validation'
      });
      return defaultValue;
    }

    // Check allowed keys if specified
    if (allowedKeys && typeof parsed === 'object' && parsed !== null) {
      const keys = Object.keys(parsed);
      const hasInvalidKeys = keys.some(key => !allowedKeys.includes(key));
      if (hasInvalidKeys) {
        securityMonitor.logSecurityEvent({
          type: 'suspicious_activity',
          timestamp: Date.now(),
          details: 'JSON contains unexpected keys'
        });
        return defaultValue;
      }
    }

    return parsed;
  } catch (error) {
    securityMonitor.logSecurityEvent({
      type: 'invalid_input',
      timestamp: Date.now(),
      details: `JSON parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
    return defaultValue;
  }
}

/**
 * Safely stringify JSON with size limits
 */
export function safeJsonStringify(
  data: any,
  options: { maxSize?: number } = {}
): string | null {
  const { maxSize = MAX_ITEM_SIZE } = options;

  try {
    const jsonString = JSON.stringify(data);
    
    if (jsonString.length > maxSize) {
      securityMonitor.logSecurityEvent({
        type: 'suspicious_activity',
        timestamp: Date.now(),
        details: `Data exceeds size limit for storage: ${jsonString.length} bytes`
      });
      return null;
    }

    return jsonString;
  } catch (error) {
    securityMonitor.logSecurityEvent({
      type: 'api_error',
      timestamp: Date.now(),
      details: `JSON stringify failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
    return null;
  }
}

/**
 * Secure localStorage operations
 */
export const secureLocalStorage = {
  getItem<T>(key: string, defaultValue: T, validator?: (data: any) => boolean): T {
    try {
      const sanitizedKey = sanitizeInput(key, { allowSpecialChars: false });
      const item = localStorage.getItem(sanitizedKey);
      return safeJsonParse(item, defaultValue, { validator });
    } catch (error) {
      securityMonitor.logSecurityEvent({
        type: 'api_error',
        timestamp: Date.now(),
        details: `localStorage getItem failed for key: ${key}`
      });
      return defaultValue;
    }
  },

  setItem<T>(key: string, value: T): boolean {
    try {
      const sanitizedKey = sanitizeInput(key, { allowSpecialChars: false });
      const jsonString = safeJsonStringify(value);
      
      if (!jsonString) {
        return false;
      }

      // Check total storage usage
      const currentSize = new Blob(Object.values(localStorage)).size;
      const newItemSize = new Blob([jsonString]).size;
      
      if (currentSize + newItemSize > MAX_STORAGE_SIZE) {
        securityMonitor.logSecurityEvent({
          type: 'suspicious_activity',
          timestamp: Date.now(),
          details: 'localStorage quota would be exceeded'
        });
        return false;
      }

      localStorage.setItem(sanitizedKey, jsonString);
      return true;
    } catch (error) {
      securityMonitor.logSecurityEvent({
        type: 'api_error',
        timestamp: Date.now(),
        details: `localStorage setItem failed for key: ${key}`
      });
      return false;
    }
  },

  removeItem(key: string): boolean {
    try {
      const sanitizedKey = sanitizeInput(key, { allowSpecialChars: false });
      localStorage.removeItem(sanitizedKey);
      return true;
    } catch (error) {
      securityMonitor.logSecurityEvent({
        type: 'api_error',
        timestamp: Date.now(),
        details: `localStorage removeItem failed for key: ${key}`
      });
      return false;
    }
  }
};

/**
 * Secure sessionStorage operations
 */
export const secureSessionStorage = {
  getItem<T>(key: string, defaultValue: T, validator?: (data: any) => boolean): T {
    try {
      const sanitizedKey = sanitizeInput(key, { allowSpecialChars: false });
      const item = sessionStorage.getItem(sanitizedKey);
      return safeJsonParse(item, defaultValue, { validator });
    } catch (error) {
      securityMonitor.logSecurityEvent({
        type: 'api_error',
        timestamp: Date.now(),
        details: `sessionStorage getItem failed for key: ${key}`
      });
      return defaultValue;
    }
  },

  setItem<T>(key: string, value: T): boolean {
    try {
      const sanitizedKey = sanitizeInput(key, { allowSpecialChars: false });
      const jsonString = safeJsonStringify(value);
      
      if (!jsonString) {
        return false;
      }

      sessionStorage.setItem(sanitizedKey, jsonString);
      return true;
    } catch (error) {
      securityMonitor.logSecurityEvent({
        type: 'api_error',
        timestamp: Date.now(),
        details: `sessionStorage setItem failed for key: ${key}`
      });
      return false;
    }
  },

  removeItem(key: string): boolean {
    try {
      const sanitizedKey = sanitizeInput(key, { allowSpecialChars: false });
      sessionStorage.removeItem(sanitizedKey);
      return true;
    } catch (error) {
      securityMonitor.logSecurityEvent({
        type: 'api_error',
        timestamp: Date.now(),
        details: `sessionStorage removeItem failed for key: ${key}`
      });
      return false;
    }
  }
};