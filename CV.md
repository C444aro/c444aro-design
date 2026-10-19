# Mi Landing de CV — Carolina Romero

> Arquitectura de información, diseño y contenido en lenguaje natural.
> Nota del documento original: se utilizó la IA Claude para detectar contradicciones de la marca y para ayudar en la redacción.

## Estructura general y navegación

Mi CV es una landing de dos páginas. La primera página es la portada (hero), donde aparece el texto “Portafolio” sobre fondo azul y un botón “Entrar”; al pulsarlo la pantalla se acerca y abre directamente en el inicio del CV. Desde el CV se vuelve a la portada pulsando “Inicio” o mi nombre c444aro en el header.

Las carpetas de proyecto se abren dentro del CV, en un visor a pantalla completa: la música no se corta ni se reinicia al entrar o salir de un proyecto.

Lleva un header con los apartados:

- Inicio (vuelve a la portada)
- Sobre mí
- Educación
- Habilidades
- Proyectos
- Contacto

Hay un botón que activa y desactiva la música de la interfaz. La música vive en el CV y solo se apaga con ese botón: las carpetas de proyecto se abren dentro del CV (visor a pantalla completa), así que al entrar y salir de un proyecto sigue en el mismo segundo, sin cortes, sin reinicios y sin esperas. Si la apago con el botón, la canción no se detiene: solo se le quita el sonido, así que al volver a encenderla continúa donde va, sin reiniciarse desde el principio. El botón del header del proyecto controla esa misma música. Si el navegador bloquea el sonido hasta que el visitante interactúa, la música arranca con el primer gesto sin reiniciarse. En tableta y móvil (pantallas táctiles) los proyectos se abren como página normal y el header se adapta en tamaño a la pantalla.

En el header también lleva mi nombre de c444aro junto con mi logo, que es mi icono; al pulsarlo se vuelve a la portada. Todo el portafolio debe ser responsivo y aplicar mi sistema de diseño.

> Nota de implementación (derivada del sistema): en el CV siempre se usa “Carolina Romero” / “Caro Romero”, nunca “c444aro” como nombre (ver `DESIGN.md` — Don'ts).

## Inicio (hero)

La segunda página después de la portada de portafolio es una pantalla de dos columnas:

- A la derecha lleva una fotografía mía con un marco animado de serpentinas que cambian de color.
- A la izquierda hay un texto que dice “¡Hola soy Caro Romero!”, mi campo profesional: “Diseñadora Gráfica, con profundización en Diseño y Estrategia de Marca”, y una catchphrase: “Conoce más sobre mi trayectoria y habilidades.”

Hay unos botones que son shortcuts a partes cruciales de mi CV: Contacto y Proyectos.

## Sobre mí

Esta es una presentación sobre mí: Soy Caro Romero, tengo 21 años, soy piscis, desde hace 4 años estudio Diseño Gráfico en la Universidad La Salle. A lo largo de mi trayectoria en la carrera he explotado mil habilidades, me he especializado en el Diseño de Marcas y Empaques.

Menciono mi filosofía del diseño “Menos es más”, y tantito de mis hobbies: me apasiona el cine, tengo dos gatos con nombres griegos, mi color favorito es el verde, me encanta escuchar música, descubrir nuevos géneros.

## Educación

Esta sección muestra mi educación en este orden:

1. Preparatoria en Centro Universitario México
2. Licenciatura en Universidad La Salle
3. Artwork Intern en Henkel México

## Habilidades

Esta sección es la segunda más importante y de las más extensas. Se divide en dos partes:

### Softwares

Son los íconos de los softwares de Adobe Suite y otros externos. Al seleccionar uno aparece una visualización al lado de ellos donde se ve cuánto se maneja del software. Estos son los softwares y sus medidas:

- Adobe Illustrator: 80%
- Adobe Photoshop: 50% (en el original: “Photshop”)
- Adobe InDesign: 70%
- Figma: 90%

### Soft Skills

En esta parte son tres bloques distintos que describen mis habilidades:

- **Organización:** Me considero una persona que sabe gestionar sus tiempos y sus pendientes, la organización me ha ayudado a crear proyectos en forma.
- **Curiosidad:** Me interesa cómo puedo innovar en el diseño, y esto lo plasmo en mis proyectos y mis investigaciones.
- **Liderazgo:** Me considero una líder nata, por lo que trabajar en equipo es lo ideal para mí, siempre he tenido una gran comunicación con mis equipos de trabajo.

## Proyectos

Esta es la parte más extensa de todo el portafolio y la más importante. Aquí se muestran todos mis proyectos que he trabajado.

Deben mostrarse como carpetas. Al seleccionar uno se abre el folder dentro del CV (visor a pantalla completa), aparecen las imágenes del proyecto y los softwares que se utilizaron para crear el proyecto. Las imágenes se mueven solas. Aparece un link que lleva a la bitácora del proyecto y el enlace “Volver a proyectos” regresa al CV sin que la música se corte.

Lista con todos los proyectos, softwares, una pequeña descripción y el link a la bitácora:

### 1. Rediseño Aerolínea ANA

En este rediseño me enfoqué en crear un diseño innovador que transmitiera los valores de la ANA. Además, este fue el primer proyecto realizado con el método Design Thinking.

- **Softwares:** Illustrator, Photoshop (en el original: “Photshop”), Figma.

### 2. Rediseño Laboratorio LABDIC

En este rediseño seleccioné un laboratorio y se le creó una nueva imagen para posicionarlo en el mercado. Además se hicieron aplicaciones realistas. Para la marca se realizó un Brand Book, se adjunta link.

- **Softwares:** Illustrator, Photoshop (en el original: “Photshop”), Figma, InDesign.
- **Link Brand Book:** <https://drive.google.com/file/d/19LdYpp2P-2kkHdX83p7q30wMvuv9H6pN/view?usp=sharing>

### 3. Kleenex AMOXTLI

En este proyecto se creó una nueva línea de Kleenex llamada Amoxtli inspirada en la chef mexicana Elena Reygadas. Se creó un master graphic a partir de la tradición mexicana de bordado.

- **Softwares:** Illustrator, InDesign.
- **Link Bitácora:** <https://drive.google.com/file/d/1NNw43K4kB1n3aV_f3ax5dP-09VJ4OfDb/view?usp=sharing>

### 4. Core Frost

Este proyecto fue una colaboración con la Facultad de Química. Se creó desde cero la marca y el sistema de empaque. Adjunto la bitácora del proyecto.

- **Softwares:** Illustrator, InDesign.
- **Link Bitácora:** <https://drive.google.com/file/d/1byISu8R8gn2J_9SIelB9Ma-FZVdm4SPa/view?usp=sharing>

### 5. Publicidad Jugos Invicto

En este proyecto se creó una nueva marca de jugos inspirada en la cultura mexicana de la lucha libre y en los jugos de puesto. Se creó el diseño de empaque, publicidad y marca.

- **Softwares:** Illustrator, Photoshop (en el original: “Photshop”), Figma, InDesign.
- **Link Bitácora:** <https://drive.google.com/file/d/14i2znQOnjvh-XWaxVYVdNIOJWb_yIgdb/view?usp=sharing>

## Contacto

En esta sección únicamente vienen mis contactos. Debe tener de título: “¡Trabajemos juntos!”

Estos son mis contactos, deben tener el ícono de cada red:

- **Correo:** karolina.romero2005@gmail.com
- **Número:** 55 - 8131 - 4898
