/**
 * ÖG Optimization System - Memory Module
 */
class MemoryManager {
  constructor() {
    this.listeners = [];
  }

  registerListener(element, event, handler, options) {
    if (!element) return;
    element.addEventListener(event, handler, options);
    this.listeners.push({ element, event, handler, options });
  }

  cleanUp() {
    this.listeners.forEach(({ element, event, handler, options }) => {
      try {
        element.removeEventListener(event, handler, options);
      } catch (e) {
        // Ignorar elementos ya removidos
      }
    });
    this.listeners = [];
  }

  init() {
    window.addEventListener('beforeunload', () => {
      this.cleanUp();
    });
  }
}

export const MemoryOptimizer = new MemoryManager();

