/* Música del portafolio c444aro — vive en el CV y no se corta al abrir un proyecto.
   Los proyectos se abren dentro del mismo CV (visor), así que la música nunca cambia de
   página: sigue sonando en el segundo en que iba hasta que se apaga con el botón.
   Al apagarla, la canción se detiene; al volver a encenderla empieza desde el inicio.
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
      botonVisor.title = on ? 'Apagar la música' : 'Encender la música';
    };
    botonVisor.addEventListener('click', function () {
      api.alternar();
      api.desbloquear();      /* por si el navegador dejó el sonido en silencio */
      sincronizar();
    });
    /* Si la música del CV quedó en silencio, el primer toque dentro del proyecto la suena;
       de paso el botón se pone al día con el estado real del CV. */
    document.addEventListener('pointerdown', function () { api.desbloquear(); sincronizar(); }, true);
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
    btn.title = encendida ? 'Apagar la música' : 'Encender la música';
  }

  /* Mientras se salta al segundo guardado, los primeros instantes del audio no cuentan:
     si se guardaran, la música volvería al principio en la página siguiente. */
  var restaurando = false;
  var ajusteHasta = 0;        /* hasta cuándo se insiste en volver al punto guardado */

  /* Guarda el segundo exacto; si el audio ya se reinició al cerrar la página,
     conserva el último punto conocido para no perder el avance. Con la música
     apagada el punto queda en cero: al encenderla, empieza desde el inicio. */
  function guardarTiempo() {
    if (!encendida) { ultimoTiempo = 0; escribir(CLAVE_TIEMPO, 0); return; }
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
        if (audio.currentTime >= objetivo - 3) restaurando = false;
        else return;                    /* todavía no llegó: no se guarda un punto equivocado */
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

  /* Devuelve la música al punto guardado. No se da por vencido en el primer intento: al
     pausar, hay navegadores que sueltan el audio y lo vuelven a cargar al reanudar, así
     que el salto se aplica en cuanto el audio está listo, y se sigue intentando unos
     segundos (con un tope, para no insistir sin fin). Es el mismo salto que se hace al
     abrir la página, que es el que sí funciona. */
  var intentosPunto = 0;
  var ultimoIntento = 0;
  function alPunto() {
    if (!restaurando || objetivo <= 0) return;
    if (audio.currentTime >= objetivo - 3) { restaurando = false; return; }
    if (Date.now() > ajusteHasta || intentosPunto >= 8) { restaurando = false; return; }  /* no se pudo: se deja sonar */
    if (audio.paused || audio.readyState < 1) return;                                     /* todavía no está listo */
    var ahora = Date.now();
    if (ahora - ultimoIntento < 500) return;                                              /* se deja pasar un momento */
    ultimoIntento = ahora;
    intentosPunto++;
    try { audio.currentTime = objetivo; } catch (e) {}
  }
  ['loadedmetadata', 'canplay', 'playing', 'seeked', 'timeupdate'].forEach(function (ev) {
    audio.addEventListener(ev, alPunto);
  });

  /* Vuelve a sonar desde el punto guardado.
     El play() es síncrono: Safari y Firefox solo dan sonido si la reproducción empieza
     dentro del gesto del visitante.
     Solo se salta al segundo guardado si de verdad hace falta: si el audio ya está en
     ese punto (por ejemplo al volver a encender con el botón), saltar sin necesidad
     reinicia la canción en algunos navegadores. Si aun así el navegador arranca desde
     otro punto, se devuelve al punto guardado en cuanto el audio está listo. */
  function retomar() {
    var t = objetivo;
    audio.preload = 'auto';
    var salto = t > 0 && Math.abs(audio.currentTime - t) > 1.5;
    restaurando = t > 0;
    if (t > 0) { ajusteHasta = Date.now() + 10000; intentosPunto = 0; }
    if (salto) { try { audio.currentTime = t; } catch (e) {} }
    arrancar();
  }

  /* Apagar la música detiene la canción: si se dejara corriendo en silencio, al
     encenderla seguiría por donde iba, y aquí se quiere que empiece de nuevo. */
  function apagar() {
    audio.muted = false;
    audio.pause();
    ultimoTiempo = 0;                  /* al volver a encenderla, desde el inicio */
    escribir(CLAVE_TIEMPO, 0);
  }

  function encender() {
    audio.muted = false;
    objetivo = 0;
    restaurando = false;
    audio.preload = 'auto';
    try { audio.currentTime = 0; } catch (e) {}   /* la canción empieza desde el inicio */
    if (audio.paused) arrancar();
  }

  btn.addEventListener('click', function () {
    encendida = !encendida;
    escribir(CLAVE_ON, encendida ? '1' : '0');
    if (encendida) encender(); else apagar();
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
  if (encendida) retomar();
})();
