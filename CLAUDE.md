# Aventura 360 — E-commerce de productos de aventura

Trabajo Integrador de la cátedra Taller de Integración (UADER, FCyT — Sede Concepción del Uruguay).
Integrantes: Julián Agustín Olivera y David Saipert. Año académico 2026.
Cliente real: **Aventura 360**, emprendimiento de Paraná, Entre Ríos, dedicado a equipamiento para trekking, camping y kayak.

**La fuente de verdad del alcance es [Aventura360-Requerimientos-v1.0.pdf](docs/Aventura360-Requerimientos-v1.0.pdf)** (v1.0, versión final): 48 requerimientos funcionales (RF01–RF48), 18 no funcionales (RNF01–RNF18) y 30 casos de uso (UC01–UC30). Ante cualquier duda de comportamiento, consultarlo antes de decidir. No inventar funcionalidad que el documento no pida.

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
│   └── diseno/       Hoja de diseño y wireframes
├── assets/           Logo e identidad de marca
└── CLAUDE.md
```

## Diseño

Antes de escribir una pantalla, mirar estos documentos. Definen lo visual y lo estructural, y evitan discutir de nuevo lo ya resuelto.

| Documento | Qué define |
|---|---|
| [hoja-de-diseno.html](docs/diseno/hoja-de-diseno.html) | Paleta, tipografía, iconografía, componentes, tokens y reglas de aplicación |
| [mockups.html](docs/diseno/mockups.html) | Prototipo navegable: 21 pantallas en alta fidelidad a 1180 px —siete de tienda, cuatro de Mi cuenta y diez del panel— más 21 ventanas de alta y edición. **Referencia para implementar** |
| [wireframes.html](docs/diseno/wireframes.html) | Las mismas pantallas en baja fidelidad, anotadas con sus RF y UC, más el flujo de compra completo |
| [propuestas-landing.html](docs/diseno/propuestas-landing.html) | Cinco portadas alternativas. **Decidida: propuesta E** |

La portada es la **propuesta E**: búsqueda como lupa en la barra, franja de foto con el lema y enseguida categorías y ofertas. La versión a construir es la de `mockups.html`, sección 00.

El sitio se diseña y se construye **para escritorio**, sobre un lienzo de 1180 px. No hay vistas móviles ni diseño mobile-first en esta versión.

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
| **Administrador** | Panel completo: productos, categorías, stock, kits, ofertas, envíos, devoluciones y reportes (RF46) |

Externos: Mercado Pago, Google (OAuth) y el servicio de correo. El asistente (bot) es secundario, del propio sistema.

## Reglas de negocio críticas

Estas concentran el riesgo del sistema. Cambiarlas sin releer el caso de uso correspondiente rompe el trabajo.

1. **La sesión se exige solo en el checkout** (RF09). El catálogo y el carrito funcionan anónimos; el carrito anónimo vive atado a la sesión del navegador y **se fusiona** con el del usuario al iniciar sesión (UC04, UC06, UC07).
2. **Identidad única entre cuenta local y Google** (RF08, UC30). Si el correo verificado que devuelve Google coincide con una cuenta local existente —o al revés—, se vinculan ambos métodos a un mismo usuario. Nunca crear cuentas duplicadas. Si Google no devuelve correo verificado, no se vincula ni se accede.
3. **Nada de sobreventa** (RF20, RNF16, UC27). El descuento de stock ocurre **únicamente cuando el pago fue aprobado**, dentro de una sola transacción con control de concurrencia. Si un ítem no alcanza, se revierte todo el descuento y el pedido queda marcado para revisión manual. Agregar al carrito **no reserva stock**.
4. **El pago manda sobre el estado del pedido** (RF32, RF33, UC11). El webhook de Mercado Pago se valida y luego se consulta el estado real contra la API del proveedor antes de dar un pedido por pagado. La notificación es **idempotente**: recibirla dos veces produce un solo efecto. Una notificación que no valida se descarta sin tocar el pedido.
5. **Un kit está disponible solo si todos sus componentes tienen stock** (RF22, UC29), validado por la cantidad total requerida. Al vender un kit se descuenta el stock de cada componente (RF23). Un kit no disponible se excluye del catálogo y de las recomendaciones del asistente.
6. **Los precios se congelan al generar el pedido** (UC10, UC28). En el carrito los precios son los vigentes al momento de la consulta; si una oferta vence mientras el ítem está en el carrito, se recalcula y se avisa antes de confirmar. Sobre un mismo ítem se aplica **una sola** oferta.
7. **Las ofertas tienen vigencia y se activan y vencen solas** (RF27, UC23), sin intervención del administrador.
8. **El envío es simulado** (RF35, UC24). No hay integración con operadores logísticos: el administrador mueve el estado a mano entre pendiente → en preparación → en camino → entregado, y cada cambio notifica al cliente (UC17).
9. **El comprobante fiscal lo emite Mercado Pago** (RF37). El sistema genera únicamente el comprobante de la operación (ítems, descuentos, envío y total) y lo publica en el historial del cliente.
10. **La devolución no toca el stock al solicitarse** (UC13). El reingreso ocurre recién cuando el administrador aprueba y se recibe la mercadería, y admite devolución parcial (UC25).
11. **El asistente es semiautomatizado** (RF43, apartado 1.4). Recomienda a partir de criterios de búsqueda sobre el catálogo —ID, SKU, marca, categoría, estado y ocasión (RF45)—, no es un agente conversacional general. Fuera de ese dominio, deriva al número de contacto (RF48).
12. **El correo no se cambia** (RF08, decisión del equipo). Es la llave que une la cuenta local con la de Google y de la que cuelga el historial de pedidos: se muestra en «Mis datos» como dato fijo, sin botón de edición. Para operar con otro correo hay que abrir otra cuenta.
13. **Las categorías son tres y son fijas** (RF13, decisión del equipo): **Carpas, Mochilas y Accesorios**. No se crean ni se borran desde el panel; el administrador solo edita su nombre visible y su descripción. Lo que el negocio necesite abrir se agrega como **subcategoría** dentro de una de las tres, y ahí sí hay alta, baja y edición. Un producto pertenece a una categoría y, opcionalmente, a una subcategoría de esa misma categoría. Una subcategoría con productos no se elimina: se oculta. Los kits y las ofertas **no son categorías**: son secciones propias del catálogo.
14. **Marcas y proveedores son datos del negocio, no constantes del código** (RF13, RF19). Ambos se dan de alta desde el panel y tienen su propia pantalla. Un proveedor puede distribuir varias marcas. Ninguno de los dos se elimina si tiene productos o compras asociadas: se archiva, deja de ofrecerse en los formularios y los registros que lo usan lo conservan.

## Seguridad (no negociable)

- Contraseñas locales **solo** como hash con salt (bcrypt o Argon2). Nunca en texto plano, ni en logs, ni en respuestas de la API (RNF05).
- Tokens de verificación y de reset: aleatorios, **de un solo uso** y con vencimiento (RNF07).
- **No revelar si un correo está registrado** (RNF07). En login fallido y en recuperación, mensaje genérico siempre.
- Rate limiting y bloqueo temporal por intentos fallidos de login (RNF06).
- El sistema **no almacena datos de tarjeta**: el pago se delega íntegramente a Mercado Pago (RNF09).
- Toda comunicación sobre HTTPS (RNF03); tokens OAuth con manejo correcto de expiración, refresco y almacenamiento (RNF04).
- Las acciones administrativas que alteran **stock, precio, estado de envío o de devolución** se escriben en el log de auditoría (RNF10).
- Datos personales conforme a la Ley 25.326 de Protección de Datos Personales (RNF08).

## Fuera de alcance en esta versión

No implementar, aunque parezca natural: app móvil nativa, facturación electrónica ARCA/AFIP, medios de pago distintos de Mercado Pago, integración con API de operadores logísticos, programa de fidelización, cupones nominales y lista de deseos (apartado 2.13).

Se suma a la lista, por decisión del equipo: **vista móvil y diseño mobile-first**. El documento lo pide en RNF01; en esta versión no se hace.

## Convenciones

- **Idioma:** código, nombres de variables y funciones en inglés; comentarios, mensajes de UI y contenido de cara al usuario en **español neutro** (tuteo: "elige", "puedes", "guarda"). Nada de voseo. La única excepción es el lema de marca —*"Preparate · Explorá · Viví"*—, que está impreso en el logo y se usa tal cual.
- **Trazabilidad:** al implementar algo, referenciar el requerimiento o caso de uso en el commit y, cuando aclare la intención, en el código. Ejemplo de commit: `feat(cart): fusion de carrito anonimo al iniciar sesion (UC04, UC06)`.
- **Commits:** en la organización de GitHub del equipo, con historial trazable por funcionalidad (RNF14).
- **Coautoría:** el trabajo es de los dos integrantes. Cerrar los commits con la línea del compañero que no los escribió, y **nunca** atribuir coautoría a una herramienta:

  ```
  Co-Authored-By: Saipert <127798777+Saipert@users.noreply.github.com>
  ```
- **Prioridades MoSCoW:** el documento marca cada requerimiento como Imprescindible / Importante / Opcional. Ante falta de tiempo, se implementan primero los Imprescindibles.
- **Navegadores objetivo:** Chrome, Firefox, Safari y Edge (RNF15), en escritorio.

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
