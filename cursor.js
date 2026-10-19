/* Cursor personalizado c444aro — ícono de la marca con rastro azul tenue.
   Compartido por el CV y las páginas de proyecto. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var base = new URL('.', document.currentScript.src).href;
  /* Se cuelga de <html> y no de <body>: el body tiene transform por la animación de
     entrada y eso lo vuelve contenedor de sus hijos position:fixed, que se irían con el scroll. */
  var raiz = document.documentElement;

  var cur = document.createElement('div');
  cur.id = 'cursor';
  cur.className = 'hidden';
  cur.setAttribute('aria-hidden', 'true');
  var img = document.createElement('img');
  img.src = base + 'assets/img/icon-c444aro.png';
  img.alt = '';
  cur.appendChild(img);
  raiz.appendChild(cur);

  var dots = [];
  var N = 12;
  var idx = 0;
  var last = 0;
  for (var i = 0; i < N; i++) {
    var s = document.createElement('span');
    s.className = 'trail';
    s.setAttribute('aria-hidden', 'true');
    raiz.appendChild(s);
    dots.push(s);
  }

  function place(x, y) {
    cur.classList.remove('hidden');
    cur.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    var now = performance.now();
    if (now - last > 40) {
      last = now;
      var d = dots[idx++ % N];
      d.classList.remove('live');
      void d.offsetWidth;
      d.style.left = x + 'px';
      d.style.top = y + 'px';
      d.classList.add('live');
    }
  }

  if (window.matchMedia('(pointer:fine)').matches) {
    document.documentElement.classList.add('has-cursor');
    window.addEventListener('mousemove', function (e) { place(e.clientX, e.clientY); }, { passive: true });
  }
  window.addEventListener('touchmove', function (e) {
    var t = e.touches[0];
    if (t) place(t.clientX, t.clientY);
  }, { passive: true });
  window.addEventListener('touchend', function () { cur.classList.add('hidden'); }, { passive: true });
})();
