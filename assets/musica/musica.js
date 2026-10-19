/* Música del portafolio c444aro — vive en el CV y no se corta al abrir un proyecto.
   Los proyectos se abren dentro del mismo CV (visor), así que la música nunca cambia de
   página: sigue sonando en el segundo en que iba y solo se detiene con el botón.
   Si un proyecto se abre directo (enlace compartido), arranca en el segundo guardado. */
(function () {
  var base = new URL('.', document.currentScript.src).href;
  var nav = document.querySelector('header.site .nav');
  if (!nav) return;

  /* Dentro del visor de proyectos (iframe del CV) la música la lleva el documento padre:
     aquí solo se coloca el botón y se le pasa la orden. */
  var enVisor = false;
  try { enVisor = window.self !== window.top; } catch (e) { enVisor = true; }
  if (enVisor) {
    var api = null;
    try { api = window.parent.c444aroMusica || null; } catch (e) {}
    if (!api) return;
    var botonVisor = document.createElement('button');
    botonVisor.className = 'music-btn';
    botonVisor.type = 'button';
    botonVisor.id = 'musicBtn';
    nav.appendChild(botonVisor);
    var sincronizar = function () {
      var on = api.activa();
      botonVisor.textContent = on ? 'Música: on' : 'Música: off';
      botonVisor.setAttribute('aria-pressed', on ? 'true' : 'false');
      botonVisor.title = on ? 'Pausar la música' : 'Activar la música';
    };
    botonVisor.addEventListener('click', function () {
      api.alternar();
      api.desbloquear();      /* por si el navegador dejó el sonido en silencio */
      sincronizar();
    });
    /* Si la música del CV quedó en silencio, el primer toque dentro del proyecto la suena. */
    document.addEventListener('pointerdown', function () { api.desbloquear(); }, true);
    sincronizar();
    return;
  }

  var CLAVE_ON = 'c444aro-musica';
  var CLAVE_TIEMPO = 'c444aro-musica-tiempo';
  var FUENTE = base + 'musica-cv.m4a?v=3';

  function leer(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }
  function escribir(clave, valor) { try { localStorage.setItem(clave, String(valor)); } catch (e) {} }

  /* La preferencia se lee antes de crear el audio: si está encendida, la descarga
     empieza de inmediato y la música no tarda en sonar al cambiar de página. */
  var encendida = leer(CLAVE_ON) === '1';
  var ultimoTiempo = parseFloat(leer(CLAVE_TIEMPO)) || 0;
  var objetivo = ultimoTiempo;

  var audio = document.createElement('audio');
  audio.id = 'bgMusic';
  audio.src = FUENTE;
  audio.loop = true;
  audio.preload = encendida ? 'auto' : 'none';
  audio.setAttribute('playsinline', '');
  document.body.appendChild(audio);

  var btn = document.createElement('button');
  btn.className = 'music-btn';
  btn.type = 'button';
  btn.id = 'musicBtn';
  nav.appendChild(btn);

  function pintar() {
    btn.textContent = encendida ? 'Música: on' : 'Música: off';
    btn.setAttribute('aria-pressed', encendida ? 'true' : 'false');
    btn.title = encendida ? 'Pausar la música' : 'Activar la música';
  }

  /* Mientras se salta al segundo guardado, los primeros instantes del audio no cuentan:
     si se guardaran, la música volvería al principio en la página siguiente. */
  var restaurando = false;

  /* Guarda el segundo exacto; si el audio ya se reinició al cerrar la página,
     conserva el último punto conocido para no perder el avance. */
  function guardarTiempo() {
    var t = audio.currentTime;
    if (restaurando && objetivo > 0 && t < objetivo - 2) t = objetivo;
    if (!t && ultimoTiempo > 1) t = ultimoTiempo;
    ultimoTiempo = t;
    escribir(CLAVE_TIEMPO, t);
  }

  var momentoGuardado = 0;
  audio.addEventListener('timeupdate', function () {
    if (audio.currentTime > 0) {
      if (restaurando) {
        if (audio.currentTime >= objetivo - 2) restaurando = false;
        else return;
      }
      ultimoTiempo = audio.currentTime;
    }
    var ahora = Date.now();
    if (ahora - momentoGuardado > 1000) { momentoGuardado = ahora; escribir(CLAVE_TIEMPO, ultimoTiempo); }
  });
  audio.addEventListener('pause', guardarTiempo);

  /* Guardar el punto antes de cambiar de página o de pestaña. */
  ['pagehide', 'beforeunload'].forEach(function (ev) { window.addEventListener(ev, guardarTiempo); });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') guardarTiempo();
  });

  /* Algunos navegadores (Safari, sobre todo) bloquean el sonido hasta que el visitante
     interactúa. En ese caso la música sigue corriendo en silencio para no perder el
     hilo, y suena en cuanto hay un gesto. */
  var eventosGesto = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
  function escucharGesto() {
    eventosGesto.forEach(function (ev) { document.addEventListener(ev, conGesto, { capture: true }); });
  }
  function olvidarGesto() {
    eventosGesto.forEach(function (ev) { document.removeEventListener(ev, conGesto, { capture: true }); });
  }
  function conGesto() {
    olvidarGesto();
    if (!encendida) return;
    audio.muted = false;
    if (audio.paused) retomar();
  }

  function arrancar() {
    var p = audio.play();
    if (!p || !p.catch) return;
    p.catch(function () {
      if (!encendida) return;
      audio.muted = true;                       /* deja correr el tiempo sin sonido */
      var p2 = audio.play();
      if (p2 && p2.catch) p2.catch(function () {});
      escucharGesto();
    });
  }

  /* Arranca de inmediato con un play() síncrono (Safari y Firefox solo dan sonido si
     la reproducción empieza dentro del gesto del visitante: si se retrasa al evento de
     carga, lo silencian) y salta al segundo guardado en cuanto hay datos. */
  var eventosAjuste = ['loadedmetadata', 'canplay', 'playing'];
  function retomar() {
    var t = objetivo;
    audio.preload = 'auto';
    if (t > 0) { try { audio.currentTime = t; } catch (e) {} }
    restaurando = t > 0;
    arrancar();
    if (t > 0) {
      var ajustar = function () {
        if (audio.currentTime < t - 2) { try { audio.currentTime = t; } catch (e) {} }
      };
      eventosAjuste.forEach(function (ev) { audio.addEventListener(ev, ajustar); });
      setTimeout(function () {
        eventosAjuste.forEach(function (ev) { audio.removeEventListener(ev, ajustar); });
        restaurando = false;
      }, 4000);
    }
  }

  btn.addEventListener('click', function () {
    if (encendida) {
      encendida = false;
      escribir(CLAVE_ON, '0');
      guardarTiempo();
      audio.pause();
    } else {
      encendida = true;
      audio.muted = false;
      escribir(CLAVE_ON, '1');
      objetivo = ultimoTiempo;
      retomar();
    }
    pintar();
  });

  /* Las páginas de proyecto abiertas dentro del visor controlan esta misma música. */
  window.c444aroMusica = {
    activa: function () { return encendida; },
    alternar: function () { btn.click(); },
    desbloquear: function () {
      if (!encendida) return;
      audio.muted = false;
      if (audio.paused) retomar();
    }
  };

  pintar();
  if (encendida) { objetivo = ultimoTiempo; retomar(); }
})();
