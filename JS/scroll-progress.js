// scripts/scroll-progress.js
document.addEventListener("DOMContentLoaded", () => {
  const elems = Array.from(document.querySelectorAll('.autoShow'));
  if (!elems.length) return;

  let ticking = false;

  function update() {
    elems.forEach(el => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // calcular progreso: -1 (fuera arriba) ... 0 (top en viewport) ... 1 (centro) ... 2 (fuera abajo)
      // Normalizamos para obtener un 0..1 cuando el centro del elemento entra y recorre la ventana
      const elementCenter = rect.top + rect.height / 2;
      const progress = (vh - elementCenter) / (vh + rect.height);

      // clamp entre -1 y 1 para seguridad
      const p = Math.max(-1, Math.min(1, progress));

      // mapear p a un desplazamiento vertical: cuando p=-1 -> +100px, p=0 -> +30px, p=1 -> 0px
      // ajusta multiplicador y offset para efecto más/menos fuerte
      const maxMove = 100; // píxeles iniciales cuando fuera de vista
      const minMove = 0;   // cuando totalmente visible
      const translateY = (1 - (p + 1) / 2) * maxMove; // mapea p de [-1,1] a [maxMove,0]

      // aplicar transform
      el.style.transform = `translateY(${translateY.toFixed(2)}px)`;

      // si quieres que se haga visible en cuanto entre parcialmente:
      if (rect.top < vh && rect.bottom > 0) {
        el.classList.add('is-visible');
      } else {
        el.classList.remove('is-visible');
      }

      // marca que estamos activando scroll-linked para evitar transition conflict
      el.setAttribute('data-scroll-active', 'true');
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  // inicializar una vez
  update();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
});
