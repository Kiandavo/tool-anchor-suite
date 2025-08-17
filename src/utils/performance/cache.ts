interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private maxSize = 100; // Maximum number of cached items

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void { // Default 5 minutes TTL
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

export const memoryCache = new MemoryCache();

// Auto cleanup every 5 minutes
setInterval(() => {
  memoryCache.cleanup();
}, 5 * 60 * 1000);