/* Música del portafolio c444aro — se comparte entre el CV y las páginas de proyecto.
   La preferencia (on/off) y el punto de reproducción se guardan, para que la música
   siga sonando y en el mismo segundo al cambiar de página. */
(function () {
  var base = new URL('.', document.currentScript.src).href;
  var nav = document.querySelector('header.site .nav');
  if (!nav) return;

  var CLAVE_ON = 'c444aro-musica';
  var CLAVE_TIEMPO = 'c444aro-musica-tiempo';

  var audio = document.createElement('audio');
  audio.id = 'bgMusic';
  audio.src = base + 'musica-cv.m4a';
  audio.loop = true;
  audio.preload = 'none';
  document.body.appendChild(audio);

  var btn = document.createElement('button');
  btn.className = 'music-btn';
  btn.type = 'button';
  btn.id = 'musicBtn';
  btn.setAttribute('aria-pressed', 'false');
  btn.title = 'Activar o pausar la música';
  btn.textContent = 'Música: off';
  nav.appendChild(btn);

  function pintar(on) {
    btn.textContent = on ? 'Música: on' : 'Música: off';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  function recordar(on) {
    try { localStorage.setItem(CLAVE_ON, on ? '1' : '0'); } catch (e) {}
  }
  function leida() {
    try { return localStorage.getItem(CLAVE_ON) === '1'; } catch (e) { return false; }
  }

  /* Punto de reproducción: se guarda para retomarlo en la siguiente página. */
  function leerTiempo() {
    try { return parseFloat(localStorage.getItem(CLAVE_TIEMPO)) || 0; } catch (e) { return 0; }
  }
  function guardarTiempo() {
    try { localStorage.setItem(CLAVE_TIEMPO, String(audio.currentTime || 0)); } catch (e) {}
  }
  var ultimoGuardado = 0;
  audio.addEventListener('timeupdate', function () {
    var ahora = Date.now();
    if (ahora - ultimoGuardado > 2000) { ultimoGuardado = ahora; guardarTiempo(); }
  });
  audio.addEventListener('pause', guardarTiempo);
  audio.addEventListener('seeked', guardarTiempo);
  window.addEventListener('pagehide', guardarTiempo);
  window.addEventListener('beforeunload', guardarTiempo);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') guardarTiempo();
  });

  function buscarYCantar() {
    var t = leerTiempo();
    if (!t) { reproducir(); return; }
    function armar() {
      try { audio.currentTime = t; } catch (e) {}
      reproducir();
    }
    if (audio.readyState >= 1) armar();
    else audio.addEventListener('loadedmetadata', armar, { once: true });
  }

  function reproducir() {
    var p = audio.play();
    if (p && p.catch) {
      p.then(function () { pintar(true); })
       .catch(function () {
         pintar(false);
         /* Si el navegador bloqueó el autoplay, reintentamos con la primera interacción. */
         document.addEventListener('pointerdown', reintentar, { once: true });
         document.addEventListener('keydown', reintentar, { once: true });
       });
    }
  }
  function reintentar() { buscarYCantar(); }

  btn.addEventListener('click', function () {
    if (audio.paused) {
      audio.play().then(function () { pintar(true); recordar(true); }).catch(function () { pintar(false); });
    } else {
      audio.pause();
      pintar(false);
      recordar(false);
    }
  });

  if (leida()) {
    audio.preload = 'auto';
    buscarYCantar();
  }

  /* La etiqueta siempre refleja lo que realmente pasa con el audio. */
  audio.addEventListener('play', function () { pintar(true); });
  audio.addEventListener('pause', function () { pintar(false); });
  audio.addEventListener('error', function () { pintar(false); });
})();
