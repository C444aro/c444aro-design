(function () {
  /* Carrusel de la galería: flechas para ver las imágenes una a una */
  (function () {
    var pista = document.getElementById('pistaGaleria');
    var prev = document.getElementById('galPrev');
    var next = document.getElementById('galNext');
    if (!pista || !prev || !next) return;

    var suave = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    function paso() {
      var item = pista.querySelector('li');
      var ancho = item ? item.getBoundingClientRect().width : 320;
      var separacion = parseFloat(getComputedStyle(pista).columnGap || getComputedStyle(pista).gap || 24) || 24;
      return ancho + separacion;
    }

    prev.addEventListener('click', function () {
      pista.scrollBy({ left: -paso(), behavior: suave });
    });
    next.addEventListener('click', function () {
      pista.scrollBy({ left: paso(), behavior: suave });
    });
    pista.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); pista.scrollBy({ left: paso(), behavior: suave }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); pista.scrollBy({ left: -paso(), behavior: suave }); }
    });
  })();

  /* Revelado suave de las imágenes al entrar en pantalla */
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    var items = [].slice.call(document.querySelectorAll('.galeria > li'));
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.transition = 'opacity .5s ease';
        e.target.style.opacity = '1';
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transitionDelay = (Math.min(i, 4) * 0.06) + 's';
      io.observe(el);
    });
  })();

  /* Transición suave al navegar entre páginas */
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      var href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#') return;
      var url;
      try { url = new URL(href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      document.documentElement.classList.add('saliendo');
      setTimeout(function () { location.href = url.href; }, 240);
    });
  })();
})();
