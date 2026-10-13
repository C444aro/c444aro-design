---
version: alpha
name: c444aro
description: "Portafolio de Carolina Romero. Menos es mas: primarios vibrantes sobre beige, patrones textiles mexicanos y mandala pixelado."
colors:
  primary: "#0081C5"
  secondary: "#E80029"
  tertiary: "#FFC600"
  neutral: "#F9DFB7"
  ink: "#0B1F3A"
  white: "#FFFFFF"
  primary-soft: "rgba(0, 129, 197, 0.6)"
  secondary-soft: "rgba(232, 0, 41, 0.6)"
  tertiary-soft: "rgba(255, 198, 0, 0.6)"
  shadow-blue: "rgba(0, 129, 197, 0.7)"
  shadow-red: "rgba(232, 0, 41, 0.7)"
  shadow-yellow: "rgba(255, 198, 0, 0.7)"
typography:
  headline-display:
    fontFamily: Mr Eaves Sans OT
    fontSize: 64px
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Mr Eaves Sans OT
    fontSize: 44px
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Mr Eaves Sans OT
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0em
  body-lg:
    fontFamily: Avenir
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-md:
    fontFamily: Avenir
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 0em
  label-md:
    fontFamily: Avenir
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.02em
  label-lg:
    fontFamily: Avenir
    fontSize: 18px
    fontWeight: 900
    lineHeight: 1.4
    letterSpacing: 0em
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section: 120px
  container: 1200px
  shadow-offset: 12px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
    typography: "{typography.label-lg}"
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
    typography: "{typography.label-lg}"
    padding: 16px
  button-tertiary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    typography: "{typography.label-lg}"
    padding: 16px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
    typography: "{typography.label-lg}"
    padding: 16px
  card-project:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 24px
  tag:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    typography: "{typography.label-md}"
    padding: 8px
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    padding: 8px
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.label-lg}"
    padding: 8px
  social-icon:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
    size: 40px
  social-icon-alt:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 40px
---

# c444aro

## Overview

Portafolio de Carolina Romero bajo el concepto "menos es más". Sensación juguetona, innovadora y juvenil, combinada con lo formal. Lo sintetizado resalta: colores primarios y tipografías sencillas dejan que el ícono principal brille.

- Inspiración: patrones de textiles mexicanos.
- Ícono principal: mándala simétrico estilo pixelado / bordado de punto de cruz. Formas rojas curvas ({colors.secondary}), ramas azules ({colors.primary}), centro amarillo ({colors.tertiary}). Se repite en las cuatro direcciones.
- Marca verbal: "c444aro" solo en contacto o junto al ícono, texto a la izquierda e ícono a la derecha, en Mr Eaves Sans OT Heavy ({typography.headline-display}). El ícono siempre va sobre beige ({colors.neutral}), nunca sobre blanco. En el resto del sitio el nombre es "Carolina Romero", nunca "c444aro". En CV siempre "Carolina Romero".
- Secciones base: Inicio, Sobre mí, Experiencia, Educación, Proyectos/Portafolio, Habilidades y Contacto. Una gran sección vertical continua, nunca partida; las serpentinas conectan una sección con la siguiente.
- Elementos gráficos recurrentes: serpentinas orgánicas con degradado de primarios en movimiento lento y suave (fondo, encabezados, fotos), ícono como cursor, favicon, marcos y separadores. Cursor personalizado con rastro azul de baja opacidad, activo también en táctil siguiendo el dedo. <!-- REVISAR: valores de movimiento, opacidad del rastro y degradado no especificados en el original -->

## Colors

Paleta de PANTONES para no alterar el color en web, impresión y digital. Base neutral beige que hace resaltar primarios y patrón.

- **Primary ({colors.primary}):** PANTONE Process Blue. Máxima atención visual. Textos, gráficos e íconos. Sobre {colors.primary} usar texto beige ({colors.neutral}).
- **Secondary ({colors.secondary}):** PANTONE 185. Textos, gráficos e íconos. Sobre {colors.secondary} usar texto beige ({colors.neutral}).
- **Tertiary ({colors.tertiary}):** PANTONE 7548, amarillo brillante. Ícono, gráficos, fondo de botones y contenedores. Sobre {colors.tertiary} usar texto azul marino ({colors.ink}).
- **Neutral ({colors.neutral}):** PANTONE 7506, beige. Siempre el fondo de la marca. Nunca para texto, salvo que sea el único tono contrastante dentro de un contenedor de color.
- **Ink ({colors.ink}):** azul marino casi negro. Color del texto de cuerpo. No usar negro puro ni gris.
- **White ({colors.white}):** neutro de apoyo, solo para texto sobre botones o contenedores azules o rojos como alternativa de contraste. <!-- REVISAR: el original pide beige sobre azul/rojo y a la vez blanco sobre azul/rojo; se mantiene beige como regla y blanco como alternativa AA -->
- Suaves para contenedores: {colors.primary-soft}, {colors.secondary-soft}, {colors.tertiary-soft} (primarios al 50–60%). <!-- REVISAR: se asumió 60% (0.6); el original dice 50% o 60% -->
- Sombras sólidas: {colors.shadow-blue}, {colors.shadow-red}, {colors.shadow-yellow} (primarios al 70%).

Nota de contraste: las combinaciones {colors.primary}/{colors.neutral} (3.29:1) y {colors.secondary}/{colors.neutral} (3.64:1) están fijadas por marca y no llegan a WCAG AA 4.5:1; para texto largo preferir {colors.ink} sobre {colors.neutral} (12.8:1) o {colors.white} sobre azul/rojo (4.25:1 / 4.71:1). <!-- REVISAR: decisión de accesibilidad -->

## Typography

Solo dos familias Sans-Serif. La jerarquía se logra con peso y tamaño, no con más colores ni decoración. Bonus: ambas familias usan color para resaltar.

- Títulos: Mr Eaves Sans OT Heavy ({typography.headline-display}, {typography.headline-lg}).
- Subtítulos: misma familia en peso menor ({typography.headline-md}). <!-- REVISAR: peso exacto no especificado; se asumió 600 -->
- Cuerpo: Avenir Book o Medium ({typography.body-lg}, {typography.body-md}). <!-- REVISAR: Book=400, Medium=500 asumidos -->
- Etiquetas y pies de foto: Avenir Medium 14px ({typography.label-md}).
- Enlaces y URLs: Avenir Black ({typography.label-lg}). En reposo azul ({colors.primary}), al seleccionar cambia a rojo ({colors.secondary}).
- Escala: principal 64px, sección 44px, subtítulo 28px, cuerpo 18px, etiquetas 14px.
- Interlineado: default del sistema, basta con que el texto no se empalme. <!-- REVISAR: se asumieron lineHeight 1.1–1.6 y letterSpacing en tokens; definir valores exactos -->

## Layout

Modelo de secciones continuas con mucho aire beige alrededor de títulos, fotos y tarjetas. Respetar "menos es más", legibilidad y jerarquía.

- Ancho máximo en computadora: {spacing.container} (1200px), centrado.
- Espacio vertical entre secciones: {spacing.section} (120px) en computadora. En foto + texto, espaciado considerable. <!-- REVISAR: valor mobile/tablet no especificado -->
- Escala de espaciado: {spacing.xs} / {spacing.sm} / {spacing.md} / {spacing.lg} / {spacing.xl} sobre base 8px. <!-- REVISAR: escala completa asumida; el original solo fija 120px, 1200px y 12px de sombra -->
- Responsive: una sola columna en celular; adaptable a tablet y computadora sin perder sentido gráfico ni legibilidad. <!-- REVISAR: breakpoints y gutters no especificados -->
- Header fijo (sticky) siempre visible con: Inicio, Sobre mí, Experiencia, Educación, Proyectos/Portafolio, Habilidades y Contacto. La sección activa se subraya en primario.

## Elevation & Depth

Diseño flat: sin sombras difuminadas. La profundidad se logra con marcos gráficos del ícono y recuadro de sombra sólido tipo sticker.

- Recuadro de sombra: bloque sólido sin blur, con {colors.shadow-blue} / {colors.shadow-red} / {colors.shadow-yellow}, desplazado {spacing.shadow-offset} (12px) abajo y a la derecha, detrás de foto o contenedor. Mismo redondeo que el contenedor ({rounded.md}).
- Alternativa tonal: contenedores en primarios al 50–60% ({colors.primary-soft}, {colors.secondary-soft}, {colors.tertiary-soft}) para separar planos sin elevación.

## Shapes

Todo redondeado, nunca esquinas rectas. Lenguaje orgánico + rectangular.

- Tarjetas, fotos, secciones, títulos y sombras: redondeo ligero {rounded.sm}–{rounded.md} (8–12px).
- Botones: completamente redondeados ({rounded.full}).
- Formas base cuadradas o rectangulares, más formas orgánicas (serpentinas) e ícono mándala.
- Íconos RRSS en contenedores circulares ({rounded.full}). <!-- REVISAR: tamaño 40px asumido en {components.social-icon} -->

## Components

- **Botones ({components.button-primary}, {components.button-secondary}, {components.button-tertiary}):** rectángulos pill ({rounded.full}), cualquier primario incluido amarillo, texto centrado contrastante (beige sobre azul/rojo, marino sobre amarillo). Hover: brillo del mismo color + crecimiento ~5% con transición suave. <!-- REVISAR: padding 16px, duración/easing y radio del brillo no especificados -->
- **Tarjetas y contenedores ({components.card-project}):** fotos o secciones en primario al 50–60% con texto contrastante; tono juguetón pero formal y sintetizado. Tarjetas de proyecto/experiencia: foto + título Mr Eaves + texto breve ({typography.body-md}), más recuadro de sombra al 70%.
- **Navegación y enlaces ({components.nav-link}, {components.nav-link-active}):** Avenir Black. Hover: crece ligeramente + brillo en borde de letras. Activo: cambia a otro primario (azul reposo → rojo seleccionado). Menú sticky con subrayado primario en sección actual. <!-- REVISAR: % de crecimiento y grosor de subrayado no especificados -->
- **Íconos RRSS ({components.social-icon}, {components.social-icon-alt}):** círculo primario con ícono contrastante. Hover/selección: crecen y se invierten (azul↔beige, rojo↔beige, amarillo↔marino).
- **Etiquetas ({components.tag}):** para habilidades, herramientas y categorías. Rectángulo pequeño redondeo ligero, primario al 60%, texto Avenir Medium contrastante. Cada categoría con color distinto.
- **Avatar:** ilustración de gato negro, en Inicio y Sobre mí.
- **Serpentinas y cursor:** serpentinas siempre en movimiento lento, no protagonistas; cursor = ícono de marca con rastro azul tenue. <!-- REVISAR: sin valores de animación definidos -->

## Do's and Don'ts

Do:

- Do usar el ícono como fondo puntual (header, footer, detrás de fotos) sin competir con el texto.
- Do usar el ícono como recurrente: cursor, favicon, marcos y separadores.
- Do dejar mucho beige ({colors.neutral}) alrededor de títulos, fotos y tarjetas.
- Do usar amarillo ({colors.tertiary}) en botones y contenedores con texto marino ({colors.ink}).
- Do jerarquizar solo con peso y tamaño tipográfico.
- Do usar marino ({colors.ink}) para cuerpo.

Don't:

- Don't poner texto beige salvo en contenedor donde sea el único contraste.
- Don't usar esquinas cuadradas; todo orgánico y redondeado ({rounded.sm} mínimo, {rounded.full} en botones).
- Don't usar negro puro ni gris en textos; usar {colors.ink}.
- Don't usar sombras difuminadas; usar recuadro sólido al 70% desplazado {spacing.shadow-offset}.
- Don't usar más de dos tipografías (Mr Eaves Sans OT + Avenir).
- Don't escribir "c444aro" en el CV; ahí va "Carolina Romero".
- Don't poner el ícono sobre blanco; siempre sobre {colors.neutral}.
