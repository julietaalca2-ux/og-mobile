/**
 * ÖG ANIMATION ENGINE - SCRIPT PRINCIPAL
 * Controla la lógica de deslizamiento, efectos táctiles y doble toque.
 */

export const ÖGAnimationEngine = {
  init() {
    console.log("Ög Animation Engine: Inicializado correctamente.");
  },

  // Motor de transición lateral entre pestañas (Inicio, Chat, Explore, Perfil)
  transitionTo(targetId) {
    const currentActive = document.querySelector('main > div.active');
    const targetSection = document.getElementById(targetId);

    if (!targetSection || currentActive === targetSection) return;

    if (currentActive) {
      currentActive.classList.remove('active');
      currentActive.classList.add('slide-left');
      setTimeout(() => {
        currentActive.classList.remove('slide-left');
      }, 350);
    }

    targetSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Efecto de doble toque con corazón flotante (Estilo Instagram)
  handleDoubleTapLike(event, containerElement, callbackLikeAction) {
    const rect = containerElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const heart = document.createElement('div');
    heart.className = 'floating-heart-anim';
    heart.textContent = '❤️';
    heart.style.left = (x - 32) + 'px';
    heart.style.top = (y - 32) + 'px';

    containerElement.appendChild(heart);
    setTimeout(() => heart.remove(), 700);

    // Ejecutar la acción de dar like (callback)
    if (typeof callbackLikeAction === 'function') {
      callbackLikeAction();
    }
  }
};
