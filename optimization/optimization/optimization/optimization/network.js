/**
 * ÖG Optimization System - Network Module
 */
class NetworkManager {
  constructor() {
    this.pendingRequests = new Map();
  }

  async deduplicatedFetch(url, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    if (method !== 'GET') {
      return fetch(url, options);
    }

    const cacheKey = `${url}_${JSON.stringify(options)}`;

    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey);
    }

    const requestPromise = fetch(url, options)
      .finally(() => {
        this.pendingRequests.delete(cacheKey);
      });

    this.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  init() {
    console.debug('[ÖG Network] Network optimizer initialized.');
  }
}

export const NetworkOptimizer = new NetworkManager();
