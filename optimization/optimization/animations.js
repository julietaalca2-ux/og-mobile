/**
 * ÖG Animation Engine - Motor de Transiciones y Animaciones (Versión Slide & Gestos)
 */
export const ÖGAnimationEngine = {
  init() {
    console.log("🚀 ÖG Animation Engine inicializado con soporte de Slide Lateral.");
  },

  /**
   * Transición fluida con desplazamiento lateral (Slide) entre pestañas principales
   */
  transitionTo(targetTabId) {
    const tabsOrder = ['feed', 'messagesPage', 'explore', 'profile'];
    const currentActive = document.querySelector('main > div.active');
    const targetElement = document.getElementById(targetTabId);

    if (!targetElement || currentActive === targetElement) return;

    const currentIndex = tabsOrder.indexOf(currentActive?.id);
    const targetIndex = tabsOrder.indexOf(targetTabId);

    // Calcular dirección del desplazamiento
    const direction = targetIndex > currentIndex ? 'right' : 'left';

    // Limpiar clases de animación previas
    targetElement.className = targetElement.className.replace(/slide-\S+/g, '');
    if (currentActive) {
      currentActive.className = currentActive.className.replace(/slide-\S+/g, '');
    }

    if (currentActive) {
      if (direction === 'right') {
        currentActive.classList.add('slide-out-left');
        targetElement.classList.add('slide-in-right');
      } else {
        currentActive.classList.add('slide-out-right');
        targetElement.classList.add('slide-in-left');
      }

      currentActive.classList.remove('active');
      targetElement.classList.add('active');

      setTimeout(() => {
        currentActive.classList.remove('slide-out-left', 'slide-out-right');
        targetElement.classList.remove('slide-in-right', 'slide-in-left');
      }, 280);
    } else {
      targetElement.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  /**
   * Efecto tipo Instagram: Doble toque para dar Me Gusta con corazón animado
   */
  handleDoubleTapLike(event, containerElement, callbackLikeAction) {
    if (containerElement.dataset.animating === 'true') return;
    containerElement.dataset.animating = 'true';

    const rect = containerElement.getBoundingClientRect();
    const x = event.clientX ? event.clientX - rect.left : rect.width / 2;
    const y = event.clientY ? event.clientY - rect.top : rect.height / 2;

    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
      position: absolute;
      left: ${x - 25}px;
      top: ${y - 25}px;
      font-size: 50px;
      pointer-events: none;
      z-index: 100;
      transform: scale(0);
      animation: floatHeartPop 0.8s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
    `;

    containerElement.style.position = 'relative';
    containerElement.appendChild(heart);

    if (typeof callbackLikeAction === 'function') {
      callbackLikeAction();
    }

    setTimeout(() => {
      heart.remove();
      containerElement.dataset.animating = 'false';
    }, 800);
  }
};

// Inyectar keyframes dinámicos para el corazón flotante si no están presentes
if (!document.getElementById('og-dynamic-heart-keyframes')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'og-dynamic-heart-keyframes';
  styleSheet.innerHTML = `
    @keyframes floatHeartPop {
      0% { transform: scale(0) rotate(-15deg); opacity: 0; }
      25% { transform: scale(1.2) rotate(10deg); opacity: 1; }
      50% { transform: scale(1) rotate(-5deg); opacity: 1; }
      100% { transform: scale(1.4) translateY(-70px) rotate(15deg); opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);
}
