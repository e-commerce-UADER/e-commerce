# Aventura 360 — E-commerce de productos de aventura

Trabajo Integrador de la cátedra Taller de Integración (UADER, FCyT — Sede Concepción del Uruguay).
Integrantes: Julián Agustín Olivera y David Saipert. Año académico 2026.
Cliente real: **Aventura 360**, emprendimiento de Paraná, Entre Ríos, dedicado a equipamiento para trekking, camping y kayak.

**La fuente de verdad del alcance es el [Documento Único del Proyecto](https://docs.google.com/document/d/1YR72E9bwok5UAzDhEnKElz4woQV6-uSz_M5NWE8NEcU/edit?tab=t.0)**, en Google Docs, donde trabaja el equipo. En el repo, su versión es [requisitos-y-casos-de-uso.md](docs/requisitos-y-casos-de-uso.md), con los requerimientos funcionales, los no funcionales y los casos de uso. Ante cualquier duda de comportamiento, consultarlo antes de decidir. No inventar funcionalidad que el documento no pida.

**Los PDF de `docs/` son versiones anteriores** y no se consultan para decidir.

**Los requisitos no se modifican por cuenta propia.** Cada RF, RNF y UC se implementa tal como está en el documento: su alcance, su prioridad y sus flujos los cambia solo el equipo, y el cambio va primero al documento y después al código, [ToDo.md](ToDo.md) o [Planificacion.md](Planificacion.md). Si un requisito parece contradictorio o incompleto, se le señala al equipo y no se resuelve por cuenta propia.

## Stack

El documento fija el stack en el apartado 1.4; no sustituirlo sin acuerdo del equipo.

- **Frontend:** React + Vite
- **Backend:** Express sobre Node.js
- **Base de datos:** PostgreSQL
- **ORM:** Prisma
- **Pagos:** Mercado Pago (checkout + webhook)
- **Auth federada:** OAuth 2.0 con Google
- **Versionado:** GitHub, organización del equipo (RNF14)

## Estructura del repositorio

```
e-commerce/
├── backend/          API REST — ver backend/README.md
├── frontend/         SPA React — ver frontend/README.md
├── docs/             Documento de requerimientos y material de la cátedra
│   ├── diseno/       Hoja de diseño y wireframes
│   └── avances/      Registro de lo realizado en cada sprint
├── assets/           Logo e identidad de marca
├── Planificacion.md  Plan de 17 sprints, hitos y forma de trabajo
├── ToDo.md           Tareas por fase con sus criterios de aceptación
└── CLAUDE.md
```

## Implementación por etapas

El sistema se construye **por etapas, siguiendo [Planificacion.md](Planificacion.md)**: 17 sprints de una semana, cada uno con su objetivo, sus tareas y su demo. El detalle de cada tarea y sus criterios de aceptación están en [ToDo.md](ToDo.md).

- **Un sprint por vez, en orden.** No se adelanta trabajo de sprints posteriores ni se mezclan dos etapas en una misma rama o PR. Lo único que entra fuera de orden es lo que un sprint anterior dejó pendiente.
- Antes de empezar una tarea, leer su sprint en la planificación y sus criterios de aceptación en el ToDo. Si algo del plan choca con el documento de requerimientos, manda el documento.
- Al terminar una tarea —cumple sus criterios, tiene pruebas y está en `developer` por PR—, se tilda en el ToDo.

**Lo realizado se documenta.** Cada sprint tiene su registro en `docs/avances/sprint-NN.md` (por ejemplo `sprint-01.md`), que se va completando durante la semana y se cierra el viernes con la demo. Lleva:

- **Hecho:** cada tarea terminada, con sus RF y UC y los módulos o features que tocó.
- **Pendiente:** lo que no se terminó y vuelve al ToDo, con su prioridad.
- **Decisiones y desvíos:** lo que se resolvió distinto del plan o del documento, y por qué.
- **Demo:** qué se mostró y cómo reproducirlo.

Si el sprint agrega un módulo o una feature, se actualiza también [trazabilidad.md](docs/trazabilidad.md).

## Diseño

Antes de escribir una pantalla, mirar estos documentos. Definen lo visual y lo estructural, y evitan discutir de nuevo lo ya resuelto.

| Documento | Qué define |
|---|---|
| [hoja-de-diseno.html](docs/diseno/hoja-de-diseno.html) | Paleta, tipografía, iconografía, componentes, tokens y reglas de aplicación |
| [mockups.html](docs/diseno/mockups.html) | Prototipo navegable: 21 pantallas en alta fidelidad a 1180 px —siete de tienda, cuatro de Mi cuenta y diez del panel— más 21 ventanas de alta y edición. **Referencia visual**: el alcance lo fija el documento |
| [tablero.html](docs/diseno/tablero.html) | Las mismas 21 pantallas a la vez sobre un lienzo con zoom, agrupadas por flujo. Monta `mockups.html` en iframes, así que nunca se desactualiza. Sirve para presentar |
| [wireframes.html](docs/diseno/wireframes.html) | Las mismas pantallas en baja fidelidad, anotadas con sus RF y UC, más el flujo de compra completo |
| [propuestas-landing.html](docs/diseno/propuestas-landing.html) | Cinco portadas alternativas. **Decidida: propuesta E** |

La portada es la **propuesta E**: búsqueda como lupa en la barra, franja de foto con el lema y enseguida categorías y ofertas. La versión a construir es la de `mockups.html`, sección 00.

**Los mockups son de referencia**: muestran cómo se ve el sitio, no qué tiene que hacer. Lo que se implementa lo define el documento de requerimientos.
- Lo que un mockup muestra y el documento no pide **no se implementa**. Hoy son las subcategorías, las pantallas de marcas y proveedores, desvincular Google, las preferencias de avisos por correo y las instrucciones de envío de una devolución.
- Lo que el documento pide y ningún mockup muestra **se implementa igual**, siguiendo la hoja de diseño.

Los mockups están dibujados para escritorio, sobre un lienzo de 1180 px, y son la referencia de esa vista. **El sitio se construye responsive** —móviles, tabletas y escritorio—, como pide RNF01: cada pantalla se adapta a anchos menores a partir de su versión de escritorio.

Los íconos viven en [frontend/src/assets/icons/](frontend/src/assets/icons/): lienzo de 24 px, trazo 1,75, `stroke="currentColor"` y `fill="none"`. Los cuatro de categoría —carpa, mochila, farol y bastones— están redibujados de la franja inferior del logo.

Tres decisiones que no conviene revisar sin motivo:

- **Un solo acento por pantalla.** El naranja marca la acción que cierra la compra. Si dos botones compiten en naranja, ninguno es el principal.
- **El estado nunca se comunica solo con color.** La píldora cambia de color *y* de texto, para que se lea sin distinguir tonos.
- **Los dos temas se diseñan juntos.** Ningún color se define únicamente dentro del bloque oscuro.

El backend se organiza **por módulo de dominio** (`src/modules/<dominio>/`), cada uno con el mismo patrón: `routes` → `controller` → `service` → `repository` → `schema`. El controller no contiene reglas de negocio; el service no conoce HTTP; Prisma se toca **solo** desde el repository.

El frontend se organiza **por feature** (`src/features/<dominio>/`), con `components/`, `hooks/` y `api/` propios. Un componente sube a `src/components/` únicamente cuando lo consumen dos o más features.

Los dominios del backend y las features del frontend usan los mismos nombres, para que un requerimiento se pueda rastrear de punta a punta.

## Actores y roles

| Actor | Puede |
|---|---|
| **Visitante** | Navegar el catálogo, filtrar, usar el asistente y armar el carrito **sin sesión** (RF01, RNF02) |
| **Cliente** | Todo lo del visitante + comprar, ver historial y solicitar devoluciones |
| **Administrador** | Panel completo: productos, categorías, stock, kits, ofertas, envíos, devoluciones y reportes (RF44) |

Externos: Mercado Pago, Google (OAuth) y el servicio de correo. El asistente (bot) es secundario, del propio sistema.

## Reglas de negocio críticas

Estas concentran el riesgo del sistema. Cambiarlas sin releer el caso de uso correspondiente rompe el trabajo.

1. **La sesión se exige solo en el checkout** (RF07). El catálogo y el carrito funcionan anónimos; el carrito anónimo vive atado a la sesión del navegador y **se fusiona** con el del usuario al iniciar sesión (UC04, UC06, UC07).
2. **Identidad única entre cuenta local y Google** (RF06, UC28). Si el correo verificado que devuelve Google coincide con una cuenta local existente —o al revés—, se vinculan ambos métodos a un mismo usuario. Nunca crear cuentas duplicadas. Si Google no devuelve correo verificado, no se vincula ni se accede.
3. **Nada de sobreventa** (RF18, RNF16, UC25). El descuento de stock ocurre **únicamente cuando el pago fue aprobado**, dentro de una sola transacción con control de concurrencia. Si un ítem no alcanza, se revierte todo el descuento y el pedido queda marcado para revisión manual. Agregar al carrito **no reserva stock**.
4. **El pago manda sobre el estado del pedido** (RF30, RF31, UC09). El webhook de Mercado Pago se valida y luego se consulta el estado real contra la API del proveedor antes de dar un pedido por pagado. La notificación es **idempotente**: recibirla dos veces produce un solo efecto. Una notificación que no valida se descarta sin tocar el pedido.
5. **Un kit está disponible solo si todos sus componentes tienen stock** (RF20, UC27), validado por la cantidad total requerida. Al vender un kit se descuenta el stock de cada componente (RF21). Un kit no disponible se excluye del catálogo y de las recomendaciones del asistente.
6. **Los precios se congelan al generar el pedido** (UC08, UC26). En el carrito los precios son los vigentes al momento de la consulta; si una oferta vence mientras el ítem está en el carrito, se recalcula y se avisa antes de confirmar. Sobre un mismo ítem se aplica **una sola** oferta: la de mayor porcentaje. Un kit toma solo las ofertas dirigidas a ese kit.
7. **Las ofertas tienen vigencia y se activan y vencen solas** (RF25, UC21), sin intervención del administrador.
8. **El envío es simulado** (RF32, RF33, UC22). No hay integración con operadores logísticos: el administrador mueve el estado a mano entre pendiente → en preparación → en camino → entregado, y cada cambio notifica al cliente (UC15). El costo de envío es **fijo** para todo el país y lo define el administrador desde el panel.
9. **El comprobante fiscal lo emite Mercado Pago** (RF35). El sistema genera únicamente el comprobante de la operación (ítems, descuentos, envío y total) y lo publica en el historial del cliente.
10. **La devolución no toca el stock al solicitarse** (UC11). El reingreso ocurre recién cuando el administrador aprueba y se recibe la mercadería, y admite devolución parcial (UC23).
11. **El asistente es semiautomatizado** (RF41, apartado 1.4). Recomienda a partir de criterios de búsqueda sobre el catálogo —ID, SKU, marca, categoría, estado y ocasión (RF43)—, no es un agente conversacional general. Fuera de ese dominio, deriva al número de contacto (RF46).

## Seguridad (no negociable)

- Contraseñas locales **solo** como hash con salt (bcrypt o Argon2). Nunca en texto plano, ni en logs, ni en respuestas de la API (RNF05).
- Política mínima de contraseñas en el registro y en el cambio de contraseña (RNF06).
- **No revelar si un correo está registrado** (RNF07). En login fallido, mensaje genérico siempre.
- El sistema **no almacena datos de tarjeta**: el pago se delega íntegramente a Mercado Pago (RNF09).
- Toda comunicación sobre HTTPS (RNF03); tokens OAuth con manejo correcto de expiración, refresco y almacenamiento (RNF04).
- Las acciones administrativas que alteran **stock, precio, estado de envío o de devolución** se escriben en el log de auditoría (RNF10).
- Datos personales conforme a la Ley 25.326 de Protección de Datos Personales (RNF08).

## Fuera de alcance en esta versión

No implementar, aunque parezca natural: app móvil nativa, facturación electrónica ARCA/AFIP, medios de pago distintos de Mercado Pago, integración con API de operadores logísticos, programa de fidelización, cupones nominales y lista de deseos (apartado 2.13).

## Convenciones

- **Idioma:** el código de dominio se programa **en español neutro**: variables, funciones, clases, componentes, modelos y campos de Prisma, valores de enumeraciones, rutas de la API, comentarios, mensajes de UI y contenido de cara al usuario.
  - **La arquitectura queda en inglés:** carpetas (`modules/`, `features/`, `infrastructure/`, `shared/`, `layouts/`…), nombres de los dominios (`cart`, `orders`, `returns`…), capas y sufijos de archivo (`routes`, `controller`, `service`, `repository`, `schema`), los layouts (`PublicLayout`, `AccountLayout`, `AdminLayout`) y las variables de entorno. Ejemplo: `modules/cart/cart.service.js` exporta `fusionarCarrito()`.
  - En los identificadores, sin tildes ni eñes (`contrasena`, `anio`, `envio`) y con el estilo de cada caso: `camelCase` para variables y funciones, `PascalCase` para clases, componentes y modelos, `MAYUSCULAS_CON_GUION` para constantes y enumeraciones.
  - También queda en inglés lo que imponen el lenguaje o las herramientas: palabras reservadas, APIs de librerías, el prefijo `use` de los hooks de React y archivos con nombre fijo como `package.json`.
  - En los textos, tuteo ("elige", "puedes", "guarda"). Nada de voseo. La única excepción es el lema de marca —*"Preparate · Explorá · Viví"*—, que está impreso en el logo y se usa tal cual.
- **Trazabilidad:** al implementar algo, referenciar el requerimiento o caso de uso en el commit y, cuando aclare la intención, en el código. Ejemplo de commit: `feat(cart): fusion de carrito anonimo al iniciar sesion (UC04, UC06)`.
- **Commits:** en la organización de GitHub del equipo, con historial trazable por funcionalidad (RNF14).
- **Autoría:** cada integrante firma sus propios commits. **No agregar líneas `Co-Authored-By`**: ni del compañero ni de ninguna herramienta (Claude incluido).
- **Prioridades MoSCoW:** el documento marca cada requerimiento como Imprescindible / Importante / Opcional. Ante falta de tiempo, se implementan primero los Imprescindibles.
- **Navegadores objetivo:** Chrome, Firefox, Safari y Edge (RNF15), en escritorio y en móviles (RNF01).

## Identidad de marca

Logo en [logo-aventura360.jpeg](assets/logo-aventura360.jpeg) (copia servida en `frontend/public/`).
Paleta tomada del logo:

| Uso | Color |
|---|---|
| Verde bosque (primario) | `#2D4A32` |
| Verde oliva (secundario) | `#6B7A3A` |
| Naranja atardecer (acento / CTA) | `#D4622A` |
| Gris pizarra (texto) | `#2E3A42` |
| Crema (fondo) | `#F7F3EC` |

Foto de portada en [hero-portada.jpg](assets/hero-portada.jpg) (Unsplash, licencia libre para uso comercial). El toldo que se ve lleva la marca de otro fabricante: si el cliente aporta una foto propia, se reemplaza sin tocar nada más.

Bajada de marca: *"Equipamiento para tu aventura — Preparate · Explorá · Viví"*.
