/**
 * Security monitoring and rate limiting utilities
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface SecurityEvent {
  type: 'api_error' | 'invalid_input' | 'rate_limit' | 'suspicious_activity' | 'cookie_manipulation' | 'dom_tampering';
  timestamp: number;
  details: string;
  userAgent?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  source?: string;
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
   * Log security events with enhanced monitoring
   */
  logSecurityEvent(event: SecurityEvent): void {
    // Set default severity if not provided
    const enhancedEvent = {
      ...event,
      severity: event.severity || this.determineSeverity(event),
      source: event.source || 'client',
      userAgent: event.userAgent || navigator.userAgent
    };

    this.securityEvents.push(enhancedEvent);
    
    // Keep only the most recent events
    if (this.securityEvents.length > this.maxEventsToStore) {
      this.securityEvents = this.securityEvents.slice(-this.maxEventsToStore);
    }

    // Enhanced logging based on severity
    if (process.env.NODE_ENV === 'development') {
      const logLevel = enhancedEvent.severity === 'critical' || enhancedEvent.severity === 'high' ? 'error' : 'warn';
      console[logLevel]('🛡️ Security Event:', enhancedEvent);
    }

    // Alert for critical events
    if (enhancedEvent.severity === 'critical') {
      this.handleCriticalEvent(enhancedEvent);
    }
  }

  /**
   * Determine event severity automatically
   */
  private determineSeverity(event: SecurityEvent): 'low' | 'medium' | 'high' | 'critical' {
    switch (event.type) {
      case 'suspicious_activity':
        return event.details.includes('script') || event.details.includes('eval') ? 'high' : 'medium';
      case 'rate_limit':
        return 'medium';
      case 'invalid_input':
        return 'low';
      case 'cookie_manipulation':
        return 'medium';
      case 'dom_tampering':
        return 'high';
      case 'api_error':
      default:
        return 'low';
    }
  }

  /**
   * Handle critical security events
   */
  private handleCriticalEvent(event: SecurityEvent): void {
    // In a real app, this might trigger alerts, disable features, etc.
    console.error('🚨 CRITICAL Security Event:', event);
    
    // Could implement additional measures like:
    // - Disabling certain features
    // - Forcing logout
    // - Sending alerts to security team
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
