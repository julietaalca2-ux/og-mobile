/**
 * ÖG Optimization System - Render Module
 */
export const RenderOptimizer = {
  init() {
    // Inicialización pasiva de renderizado
  },

  scheduleUpdate(callback) {
    if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
      return window.requestAnimationFrame(callback);
    }
    return setTimeout(callback, 0);
  },

  debounceRender(fn, delay = 100) {
    let timeoutId = null;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        this.scheduleUpdate(() => fn(...args));
      }, delay);
    };
  }
};
