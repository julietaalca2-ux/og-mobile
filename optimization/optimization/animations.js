/* ========================================================================= */
/* MÓDULO INDEPENDIENTE DE ANIMACIONES ÖG - JS                               */
/* ========================================================================= */

export const ÖGAnimations = {
  init() {
    try {
      // Verificar preferencia de movimiento reducido del usuario
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      this.initTapFeedback();
      console.log('✨ Módulo independiente de animaciones ÖG inicializado correctamente.');
    } catch (e) {
      console.warn('ÖGAnimations advertencia de inicialización:', e);
    }
  },

  initTapFeedback() {
    // Optimización táctil instantánea para dispositivos móviles
    document.addEventListener('touchstart', () => {}, { passive: true });
  }
};
