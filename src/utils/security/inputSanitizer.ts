
/**
 * Centralized input sanitization utilities
 */

export interface SanitizeOptions {
  allowHtml?: boolean;
  maxLength?: number;
  allowSpecialChars?: boolean;
  trimWhitespace?: boolean;
}

/**
 * Sanitizes user input to prevent XSS and other injection attacks
 */
export function sanitizeInput(
  input: string, 
  options: SanitizeOptions = {}
): string {
  const {
    allowHtml = false,
    maxLength = 10000,
    allowSpecialChars = true,
    trimWhitespace = true
  } = options;

  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Trim whitespace if requested
  if (trimWhitespace) {
    sanitized = sanitized.trim();
  }

  // Remove HTML tags if not allowed
  if (!allowHtml) {
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }

  // Remove potentially dangerous characters
  if (!allowSpecialChars) {
    sanitized = sanitized.replace(/[<>'"&]/g, '');
  }

  // Encode remaining HTML entities
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  // Truncate if too long
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Validates API key format securely
 */
export function validateApiKeyFormat(apiKey: string): {
  isValid: boolean;
  error?: string;
  strength?: 'weak' | 'medium' | 'strong';
} {
  if (!apiKey || typeof apiKey !== 'string') {
    return { isValid: false, error: 'کلید API نمی‌تواند خالی باشد' };
  }

  // Remove any whitespace or special characters
  const cleanKey = apiKey.trim().replace(/\s+/g, '');
  
  if (cleanKey !== apiKey) {
    return { isValid: false, error: 'کلید API نباید شامل فاصله یا کاراکترهای اضافی باشد' };
  }

  if (cleanKey.length < 20) {
    return { isValid: false, error: 'کلید API خیلی کوتاه است' };
  }

  if (cleanKey.length > 500) {
    return { isValid: false, error: 'کلید API خیلی طولانی است' };
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /password/i,
    /123456/,
    /qwerty/i,
    /admin/i,
    /test/i
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(cleanKey)) {
      return { 
        isValid: false, 
        error: 'کلید API نامعتبر یا ناامن است' 
      };
    }
  }

  // Determine strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (cleanKey.length > 50 && /[A-Z]/.test(cleanKey) && /[0-9]/.test(cleanKey)) {
    strength = cleanKey.length > 100 ? 'strong' : 'medium';
  }

  return { isValid: true, strength };
}

/**
 * Securely stores sensitive data with basic obfuscation
 */
export function secureStore(key: string, value: string): boolean {
  try {
    // Simple obfuscation (not encryption, but better than plain text)
    const obfuscated = btoa(encodeURIComponent(value));
    sessionStorage.setItem(`sec_${key}`, obfuscated);
    return true;
  } catch (error) {
    console.warn('Failed to store secure data:', error);
    return false;
  }
}

/**
 * Retrieves securely stored data
 */
export function secureRetrieve(key: string): string | null {
  try {
    const obfuscated = sessionStorage.getItem(`sec_${key}`);
    if (!obfuscated) return null;
    
    return decodeURIComponent(atob(obfuscated));
  } catch (error) {
    console.warn('Failed to retrieve secure data:', error);
    return null;
  }
}

/**
 * Clears securely stored data
 */
export function secureClear(key: string): void {
  try {
    sessionStorage.removeItem(`sec_${key}`);
    localStorage.removeItem(`sec_${key}`);
    // Also clear any legacy storage
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear secure data:', error);
  }
}
