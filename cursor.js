/* Cursor personalizado c444aro — ícono de la marca con rastro azul tenue.
   Compartido por el CV y las páginas de proyecto.

   Fluidez: la posición se aplica una sola vez por cuadro (requestAnimationFrame) con
   transform/translate3d, y el rastro se anima con la API de animaciones (solo opacidad
   y escala, en el compositor). Antes cada movimiento forzaba un recálculo de la página
   entera para reiniciar la animación del rastro, y eso trababa el cursor en las
   secciones con gifs animados. */
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
  var N = 10;
  var turno = 0;
  for (var i = 0; i < N; i++) {
    var s = document.createElement('span');
    s.className = 'trail';
    s.setAttribute('aria-hidden', 'true');
    raiz.appendChild(s);
    dots.push(s);
  }

  var x = -100, y = -100;      /* posición deseada */
  var visible = false;
  var pendiente = false;       /* ya hay un cuadro pedido */
  var ultimoRastro = 0;
  var SEPARACION = 55;         /* ms entre puntos del rastro */

  function rastro(px, py) {
    var d = dots[turno];
    turno = (turno + 1) % N;
    if (d._anim) { try { d._anim.cancel(); } catch (e) {} }
    var t = 'translate3d(' + px + 'px,' + py + 'px,0)';
    if (!d.animate) { d.style.opacity = '0'; return; }
    d._anim = d.animate(
      [{ opacity: .35, transform: t + ' scale(1)' },
       { opacity: 0, transform: t + ' scale(.25)' }],
      { duration: 750, easing: 'ease-out', fill: 'forwards' });
  }

  function pintar() {
    pendiente = false;
    cur.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    var ahora = performance.now();
    if (ahora - ultimoRastro >= SEPARACION) {
      ultimoRastro = ahora;
      rastro(x, y);
    }
  }

  function mover(e) {
    x = e.clientX;
    y = e.clientY;
    if (!visible) { visible = true; cur.classList.remove('hidden'); }
    if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); }
  }

  function ocultar() {
    if (!visible) return;
    visible = false;
    cur.classList.add('hidden');
  }

  if (window.matchMedia('(pointer:fine)').matches) {
    document.documentElement.classList.add('has-cursor');
  }

  window.addEventListener('pointermove', mover, { passive: true });
  window.addEventListener('pointerdown', mover, { passive: true });
  window.addEventListener('pointerup', function (e) { if (e.pointerType === 'touch') ocultar(); }, { passive: true });
  window.addEventListener('pointercancel', ocultar, { passive: true });
  /* Al salir de la ventana el ícono se esconde, en vez de quedarse clavado en el borde. */
  document.addEventListener('pointerleave', ocultar, { passive: true });
  window.addEventListener('blur', ocultar);
})();
