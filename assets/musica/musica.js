/* Música del portafolio c444aro — se comparte entre el CV y las páginas de proyecto.
   La música solo se detiene cuando se pulsa el botón: al cambiar de página se guarda
   la preferencia (on/off) y el segundo exacto donde iba, y en la página siguiente se
   retoma desde ese mismo punto. */
(function () {
  var base = new URL('.', document.currentScript.src).href;
  var nav = document.querySelector('header.site .nav');
  if (!nav) return;

  var CLAVE_ON = 'c444aro-musica';
  var CLAVE_TIEMPO = 'c444aro-musica-tiempo';

  function leer(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }
  function escribir(clave, valor) { try { localStorage.setItem(clave, String(valor)); } catch (e) {} }

  var audio = document.createElement('audio');
  audio.id = 'bgMusic';
  audio.src = base + 'musica-cv.m4a';
  audio.loop = true;
  audio.preload = 'none';
  audio.setAttribute('playsinline', '');
  document.body.appendChild(audio);

  var btn = document.createElement('button');
  btn.className = 'music-btn';
  btn.type = 'button';
  btn.id = 'musicBtn';
  nav.appendChild(btn);

  /* Intención del usuario: la música solo se apaga con el botón. */
  var encendida = leer(CLAVE_ON) === '1';
  var ultimoTiempo = parseFloat(leer(CLAVE_TIEMPO)) || 0;
  var objetivo = ultimoTiempo;
  var momentoGuardado = 0;

  function pintar() {
    btn.textContent = encendida ? 'Música: on' : 'Música: off';
    btn.setAttribute('aria-pressed', encendida ? 'true' : 'false');
    btn.title = encendida ? 'Pausar la música' : 'Activar la música';
  }

  /* Guarda el segundo exacto; si el audio ya se reinició al cerrar la página,
     conserva el último punto conocido para no perder el avance. */
  function guardarTiempo() {
    var t = audio.currentTime;
    if (!t && ultimoTiempo > 1) t = ultimoTiempo;
    ultimoTiempo = t;
    escribir(CLAVE_TIEMPO, t);
  }

  audio.addEventListener('timeupdate', function () {
    if (audio.currentTime > 0) ultimoTiempo = audio.currentTime;
    var ahora = Date.now();
    if (ahora - momentoGuardado > 1000) { momentoGuardado = ahora; escribir(CLAVE_TIEMPO, ultimoTiempo); }
  });
  audio.addEventListener('pause', guardarTiempo);

  /* Guardar el punto antes de cambiar de página o de pestaña. */
  ['pagehide', 'beforeunload'].forEach(function (ev) { window.addEventListener(ev, guardarTiempo); });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') guardarTiempo();
  });

  /* Si el navegador bloquea el autoplay, se reanuda con el primer gesto del visitante. */
  var eventosGesto = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
  function esperarGesto() {
    eventosGesto.forEach(function (ev) { document.addEventListener(ev, conGesto, { capture: true }); });
  }
  function sinGestos() {
    eventosGesto.forEach(function (ev) { document.removeEventListener(ev, conGesto, { capture: true }); });
  }
  function conGesto() {
    sinGestos();
    if (encendida && audio.paused) retomar();
  }

  /* Coloca el audio en el segundo guardado, reintentando por si el servidor
     tarda en permitir el salto; luego arranca la reproducción. */
  function fijarTiempo(t, luego) {
    if (!t) { luego(); return; }
    var intentos = 0;
    (function intentarPoner() {
      try { audio.currentTime = t; } catch (e) {}
      intentos++;
      if (Math.abs(audio.currentTime - t) > 1.5 && intentos < 6) setTimeout(intentarPoner, 120);
      else luego();
    })();
  }

  function arrancar() {
    var p = audio.play();
    if (p && p.catch) {
      p.catch(function () { if (encendida) esperarGesto(); });
    }
  }

  function retomar() {
    var t = objetivo, hecho = false;
    function seguir() {
      if (hecho) return;
      hecho = true;
      fijarTiempo(t, arrancar);
    }
    audio.preload = 'auto';
    if (audio.readyState >= 1) { seguir(); return; }
    audio.addEventListener('loadedmetadata', seguir, { once: true });
    try { audio.load(); } catch (e) {}          /* arranca la carga aunque el preload fuera 'none' */
    setTimeout(seguir, 2500);                    /* respaldo por si el evento no llega */
  }

  btn.addEventListener('click', function () {
    if (encendida) {
      encendida = false;
      escribir(CLAVE_ON, '0');
      guardarTiempo();
      audio.pause();
    } else {
      encendida = true;
      escribir(CLAVE_ON, '1');
      objetivo = ultimoTiempo;
      retomar();
    }
    pintar();
  });

  pintar();
  if (encendida) {
    audio.preload = 'auto';
    objetivo = ultimoTiempo;
    retomar();
  }
})();
