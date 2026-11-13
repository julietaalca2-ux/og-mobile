/**
 * ÖG Optimization System - Cache Module
 */
class SecureMemoryCache {
  constructor() {
    this.cache = new Map();
    this.maxAge = 5 * 60 * 1000; // 5 minutos por defecto
  }

  set(key, value, customMaxAge = this.maxAge) {
    const forbiddenKeys = ['token', 'auth', 'session', 'supabase', 'password', 'credential', 'chat', 'message'];
    const lowerKey = key.toLowerCase();
    
    if (forbiddenKeys.some(forbidden => lowerKey.includes(forbidden))) {
      console.warn(`[ÖG Cache] Intento bloqueado de almacenar datos protegidos: ${key}`);
      return;
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + customMaxAge
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

export const CacheOptimizer = new SecureMemoryCache();

