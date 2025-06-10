/**
 * Security monitoring and rate limiting utilities
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface SecurityEvent {
  type: 'api_error' | 'invalid_input' | 'rate_limit' | 'suspicious_activity';
  timestamp: number;
  details: string;
  userAgent?: string;
}

class SecurityMonitor {
  private requestCounts: Map<string, { count: number; resetTime: number }> = new Map();
  private securityEvents: SecurityEvent[] = [];
  private maxEventsToStore = 100;

  /**
   * Rate limiting for API calls
   */
  checkRateLimit(identifier: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const key = `rate_${identifier}`;
    const existing = this.requestCounts.get(key);

    if (!existing || now > existing.resetTime) {
      this.requestCounts.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });
      return true;
    }

    if (existing.count >= config.maxRequests) {
      this.logSecurityEvent({
        type: 'rate_limit',
        timestamp: now,
        details: `Rate limit exceeded for ${identifier}`,
        userAgent: navigator.userAgent
      });
      return false;
    }

    existing.count++;
    return true;
  }

  /**
   * Log security events
   */
  logSecurityEvent(event: SecurityEvent): void {
    this.securityEvents.push(event);
    
    // Keep only the most recent events
    if (this.securityEvents.length > this.maxEventsToStore) {
      this.securityEvents = this.securityEvents.slice(-this.maxEventsToStore);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security Event:', event);
    }
  }

  /**
   * Check for suspicious input patterns
   */
  detectSuspiciousInput(input: string): boolean {
    const suspiciousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /eval\s*\(/gi,
      /document\s*\.\s*cookie/gi,
      /window\s*\.\s*location/gi,
      /(union|select|insert|delete|update|drop|create|alter)\s+/gi
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(input)) {
        this.logSecurityEvent({
          type: 'suspicious_activity',
          timestamp: Date.now(),
          details: `Suspicious input detected: ${input.substring(0, 100)}`,
          userAgent: navigator.userAgent
        });
        return true;
      }
    }

    return false;
  }

  /**
   * Get recent security events (for admin/debugging)
   */
  getSecurityEvents(): SecurityEvent[] {
    return [...this.securityEvents];
  }

  /**
   * Clear security events
   */
  clearSecurityEvents(): void {
    this.securityEvents = [];
  }
}

export const securityMonitor = new SecurityMonitor();

// Rate limit configurations
export const RATE_LIMITS = {
  API_CALLS: { maxRequests: 60, windowMs: 60000 }, // 60 requests per minute
  TEXT_PROCESSING: { maxRequests: 30, windowMs: 60000 }, // 30 requests per minute
  FORM_SUBMISSIONS: { maxRequests: 10, windowMs: 60000 } // 10 submissions per minute
};
