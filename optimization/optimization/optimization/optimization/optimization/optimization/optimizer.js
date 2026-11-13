/**
 * ÖG Optimization System - Main Coordinator
 */
import { PerformanceOptimizer } from './performance.js';
import { CacheOptimizer } from './cache.js';
import { MemoryOptimizer } from './memory.js';
import { NetworkOptimizer } from './network.js';
import { RenderOptimizer } from './render.js';

export const ÖGOptimizer = {
  isInitialized: false,

  init() {
    if (this.isInitialized) return;

    const startOptimization = () => {
      try {
        PerformanceOptimizer.init();
        MemoryOptimizer.init();
        NetworkOptimizer.init();
        RenderOptimizer.init();
        
        this.isInitialized = true;
        console.info('[ÖG Optimizer] Sistema de optimización inicializado correctamente.');
      } catch (error) {
        console.error('[ÖG Optimizer] Error durante la inicialización:', error);
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(startOptimization, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(startOptimization, 1000);
      }, { once: true });
    }
  },

  cache: CacheOptimizer,
  network: NetworkOptimizer,
  render: RenderOptimizer,
  memory: MemoryOptimizer,
  perf: PerformanceOptimizer
};
