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
  /* Cuántas veces se ha intentado devolver la música a su punto, y hasta cuándo hacerlo. */
  var intentosAjuste = 0;
  var ajusteHasta = 0;

  /* El avance real del audio también sirve para comprobar el punto: hay navegadores que
     reanudan desde el principio aunque hayan conservado el segundo, y ahí se devuelve la
     música al punto guardado (el mismo salto que se hace al cambiar de página, que es el
     que siempre funciona). Si no se puede, se deja sonar y se sigue guardando el avance. */
  audio.addEventListener('timeupdate', function () {
    if (restaurando && objetivo > 0 && !audio.paused) {
      if (audio.currentTime >= objetivo - 3) {
        restaurando = false;                                  /* ya quedó en su punto */
      } else if (intentosAjuste < 3 && Date.now() <= ajusteHasta) {
        intentosAjuste++;
        try { audio.currentTime = objetivo; } catch (e) {}
      } else {
        restaurando = false;                                  /* no se pudo: se deja sonar */
      }
      if (restaurando) return;                                /* no se guarda un punto equivocado */
    }
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

  /* Vuelve a sonar desde el punto guardado.
     El play() es síncrono: Safari y Firefox solo dan sonido si la reproducción empieza
     dentro del gesto del visitante.
     Solo se salta al segundo guardado si de verdad hace falta: si el audio ya está en
     ese punto (por ejemplo al volver a encender con el botón), saltar sin necesidad es
     lo que reiniciaba la canción en algunos navegadores. Si aun así el navegador arranca
     desde otro punto, el vigilante del avance lo devuelve a su lugar. */
  function retomar() {
    var t = objetivo;
    audio.preload = 'auto';
    var salto = t > 0 && Math.abs(audio.currentTime - t) > 1.5;
    restaurando = t > 0;
    if (t > 0) { intentosAjuste = 0; ajusteHasta = Date.now() + 5000; }
    if (salto) { try { audio.currentTime = t; } catch (e) {} }
    arrancar();
  }

  /* Segundo exacto en que se apagó la música, para volver a encenderla justo ahí. */
  var pausadaEn = 0;

  btn.addEventListener('click', function () {
    if (encendida) {
      encendida = false;
      escribir(CLAVE_ON, '0');
      guardarTiempo();                 /* deja ultimoTiempo en el punto correcto */
      pausadaEn = ultimoTiempo;
      audio.pause();
    } else {
      encendida = true;
      audio.muted = false;
      escribir(CLAVE_ON, '1');
      objetivo = pausadaEn > 0 ? pausadaEn : ultimoTiempo;
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
