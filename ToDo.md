# Aventura 360 — ToDo

Lista de trabajo derivada de [Aventura360-Requerimientos-v1.0.pdf](docs/Aventura360-Requerimientos-v1.0.pdf) (48 RF, 18 RNF, 30 UC). Los requisitos se implementan tal como están en el documento (ver [CLAUDE.md](CLAUDE.md)). La v1.1 del PDF solo suma los diagramas de clases (apartado 8): el alcance no cambia.

Las fases siguen el orden de dependencias: no se puede pagar sin pedido, ni armar un pedido sin carrito, ni un carrito sin catálogo. Dentro de cada fase, las tareas `P1` van primero.

| Marca | Prioridad MoSCoW | Criterio |
|---|---|---|
| `P1` | Imprescindible | Sin esto no hay producto |
| `P2` | Importante | Se entrega sin él solo si el tiempo apremia |
| `P3` | Opcional | Si sobra capacidad |

Las sublistas de cada tarea son sus **criterios de aceptación**, tomados de los flujos alternativos del caso de uso. Una tarea se tilda cuando los cumple todos, en backend y frontend, y tiene sus pruebas.

Los nombres siguen la convención de idioma de CLAUDE.md: modelos, campos, variables, funciones y componentes en español, sin tildes ni eñes; carpetas, capas, layouts y variables de entorno en inglés.

---

## Fase 0 — Base del proyecto

### Backend

- [ ] `P1` Inicializar el proyecto Node + Express: `package.json` y scripts de desarrollo, arranque, pruebas y análisis estático
- [ ] `P1` Configuración por entorno en `src/config/`, leyendo `.env` y validándolo al arrancar (falla si falta una variable obligatoria)
- [ ] `P1` Manejo centralizado de errores en `src/shared/errors/`, con respuestas uniformes y sin filtrar trazas en producción
- [ ] `P1` Middleware de validación de entrada con Zod (`<modulo>.schema.js`)
- [ ] `P1` Registro de eventos que **nunca** escriba contraseñas, tokens ni datos de tarjeta — RNF05, RNF09
- [ ] `P1` CORS limitado a la URL del frontend, cabeceras de seguridad (helmet) y redirección a HTTPS fuera de desarrollo — RNF03
- [ ] `P1` Cliente de Prisma único en `src/infrastructure/database/`
- [ ] `P1` Adaptador de correo en `src/infrastructure/mail/` con plantillas en español neutro
- [ ] `P1` Plantilla de módulo (`routes` → `controller` → `service` → `repository` → `schema`) para copiar en cada dominio
- [ ] `P1` Configurar Jest (o Vitest) + Supertest y una base de datos de pruebas separada

### Frontend

- [ ] `P1` Inicializar React + Vite, ESLint y Prettier
- [ ] `P1` Enrutador con los tres layouts: `PublicLayout`, `AccountLayout`, `AdminLayout`
- [ ] `P1` Cliente HTTP en `src/lib/` (axios) con manejo de sesión vencida y refresco de token — RNF04
- [ ] `P1` React Query para los datos del servidor; estado global para sesión, carrito e interfaz
- [ ] `P1` Variables de diseño de [hoja-de-diseno.html](docs/diseno/hoja-de-diseno.html) en `src/styles/`: paleta, tipografía, espaciado, radios. **Tema claro y oscuro definidos juntos**
- [ ] `P1` Selector de tema (claro / oscuro / sistema), recordado por navegador
- [ ] `P1` Componente `Icono` que consuma `src/assets/icons/` (24 px, trazo 1,75, `currentColor`)
- [ ] `P1` Componentes base en `components/ui/`: `Boton` (con una sola variante de acento naranja), `Campo`, `Selector`, `Casilla`, `Pildora` de estado (color **y** texto), `Tabla`, `Ventana`, `Aviso`, `Paginacion`, `EstadoVacio`
- [ ] `P1` Interfaz responsive: móviles, tabletas y escritorio. Los mockups (1180 px) son la referencia de la vista de escritorio — RNF01

### Repositorio

- [ ] `P1` Flujo de ramas en la organización de GitHub: `main` ← `developer` ← ramas por funcionalidad, con PR — RNF14
- [ ] `P2` Integración continua en GitHub Actions: análisis estático y pruebas en cada PR
- [ ] `P2` Semilla de Prisma con las categorías mínimas (carpas, mochilas y accesorios), un administrador y productos de ejemplo

---

## Fase 1 — Modelo de datos (Prisma)

Referencia: [diagrama-de-clases.md](docs/diagrama-de-clases.md) y apartado 8 del PDF v1.1.

- [ ] `P1` `Usuario` con `rol` (`CLIENTE`, `ADMINISTRADOR`), `correoVerificado` y `activo` — RF10
- [ ] `P1` `CredencialLocal` (hash, `intentosFallidos`, `bloqueadaHasta`) separada de `CuentaOAuth` (`proveedor`, `idProveedor`), para que un usuario tenga ambos métodos — RF08, RNF05
- [ ] `P1` `Token` de un solo uso con `tipo` (`VERIFICACION_CORREO`, `RESTABLECER_CONTRASENA`), `venceEn` y `usadoEn` — RNF07
- [ ] `P1` `Sesion` con token de refresco revocable, para poder cerrar las demás sesiones — UC08, UC15, UC18
- [ ] `P2` `Direccion` con `predeterminada` — RF11
- [ ] `P1` `Categoria` con `nombre` único y `descripcion` — RF16
- [ ] `P1` `Producto`: ID, `sku` único, `nombre`, `descripcion`, `marca` (texto), categoría, `precio`, `garantia`, `estado` (`NUEVO`, `USADO`), `ocasion` (`TREKKING`, `CAMPING`, `KAYAK`, `MONTANISMO`), `dimensiones`, `stock`, `activo` — RF14
- [ ] `P1` `ImagenProducto` (una o más por producto, con `orden`) — RF15
- [ ] `P1` `MovimientoStock` con `tipo` (`VENTA`, `COMPRA`, `DEVOLUCION`, `AJUSTE`) para trazar cada cambio — RF19, UC21, UC27
- [ ] `P1` `Kit` + `ItemKit` (producto y cantidad), con precio propio o descuento — RF21, RF24
- [ ] `P2` `Oferta`: `porcentaje`, `alcance` (`PRODUCTO`, `CATEGORIA`, `KIT`), `fechaInicio`, `fechaFin`, `prioridad` — RF25, RF27
- [ ] `P1` `Carrito` + `ItemCarrito` (producto **o** kit), atado a un usuario o a un identificador de sesión anónima — RF01, RF28
- [ ] `P1` `Pedido` + `ItemPedido` con precios, descuentos, envío y dirección **congelados** — UC10
- [ ] `P1` Estados del pedido: `PENDIENTE_PAGO`, `PAGADO`, `PAGO_RECHAZADO`, `REVISION_MANUAL` — RF32, UC27
- [ ] `P1` `Pago` con el id de Mercado Pago y registro de notificaciones procesadas (idempotencia) — RF33, UC11
- [ ] `P1` `Envio` con estado (`PENDIENTE`, `EN_PREPARACION`, `EN_CAMINO`, `ENTREGADO`) e historial de cambios — RF35
- [ ] `P2` `Comprobante` de la operación — RF37
- [ ] `P2` `Devolucion` + `ItemDevolucion` con estados (`SOLICITADA`, `APROBADA`, `RECHAZADA`, `REEMBOLSADA`) y cantidades recibidas — RF40–RF42
- [ ] `P2` `RegistroAuditoria`: usuario, acción, entidad, `valorAnterior`, `valorNuevo`, fecha — RNF10
- [ ] `P2` Índices para la búsqueda con filtros (categoría, marca, precio, ocasión, estado, texto) — RNF11
- [ ] `P1` Primera migración y semilla funcionando desde cero

---

## Fase 2 — Cuentas y autenticación

Módulos: `backend/src/modules/auth/`, `users/` · `frontend/src/features/auth/`, `profile/` · Pantalla: `ingreso`

### Registro y acceso local

- [ ] `P1` **UC05 — Registro con correo y contraseña** — RF03, RF05
  - [ ] Valida formato de correo y política mínima de contraseña; si no cumple, lista los requisitos incumplidos — RNF06
  - [ ] Guarda la contraseña como hash bcrypt/Argon2 con salt — RNF05
  - [ ] Correo ya registrado como cuenta local: mensaje **genérico**, ofrece ingresar o recuperar — RNF07
  - [ ] Correo de una cuenta de Google: propone ingresar con Google o definir una contraseña para esa misma cuenta — UC30
  - [ ] Si falla el envío del correo, la cuenta queda «no verificada» y se puede reenviar
- [ ] `P2` **UC09 — Verificar el correo** — RF05
  - [ ] Token aleatorio, de un solo uso y con vencimiento configurable en `.env` — RNF07
  - [ ] Token vencido o usado: lo rechaza y ofrece reenviar
  - [ ] Cuenta ya verificada: lo informa sin cambios
  - [ ] Endpoint y botón de «reenviar verificación»
- [ ] `P1` **UC06 — Inicio de sesión local** — RF04, RF09
  - [ ] Credenciales inválidas: mensaje genérico, sin revelar si el correo existe — RNF07
  - [ ] Contador de intentos y bloqueo temporal, con máximo de intentos y minutos de bloqueo configurables en `.env` — RNF06
  - [ ] Límite de solicitudes por IP en los endpoints de autenticación — RNF06
  - [ ] Cuenta solo de Google: sugiere «Continuar con Google»
  - [ ] Cuenta no verificada: no crea la sesión y ofrece reenviar la verificación
  - [ ] Al ingresar, **fusiona el carrito anónimo** con el de la cuenta (ver Fase 5)
  - [ ] Redirige a la página desde la que se pidió ingresar
- [ ] `P1` **UC18 — Cerrar sesión** — RF12
  - [ ] Invalida la sesión y los tokens asociados — RNF04
  - [ ] El carrito queda guardado en la cuenta para el próximo ingreso

### Google

- [ ] `P1` **UC07 — Registro o ingreso con Google (OAuth 2.0)** — RF02, RF09, RNF04
  - [ ] Flujo de código de autorización con el parámetro `state` contra CSRF; intercambio de tokens solo en el backend
  - [ ] Sin correo verificado de Google: **rechaza el acceso**
  - [ ] Cancelación del consentimiento: vuelve a `ingreso` sin sesión
  - [ ] Usuario nuevo: se crea sin contraseña local
  - [ ] Fusiona el carrito anónimo
  - [ ] Tokens del proveedor: no expuestos al frontend, con manejo de vencimiento y refresco — RNF04
- [ ] `P2` **UC30 — Vincular Google con una cuenta local existente** — RF08
  - [ ] Mismo correo verificado → agrega la `CuentaOAuth` al usuario existente; **nunca** duplica
  - [ ] Un único perfil, historial y conjunto de direcciones

### Recuperación y seguridad

- [ ] `P1` **UC08 — Recuperar la contraseña** — RF06
  - [ ] Responde **siempre el mismo mensaje**, exista o no el correo — RNF07
  - [ ] Token de un solo uso con vencimiento configurable en `.env`
  - [ ] Cuenta solo de Google: el correo indica que se ingresa con Google
  - [ ] Token vencido o usado: rechaza y ofrece pedir otro
  - [ ] Al cambiarla, cierra todas las sesiones activas del usuario
- [ ] `P2` **UC15 — Cambiar la contraseña** (pantalla `seguridad`) — RF07
  - [ ] Exige la contraseña actual; si es incorrecta, rechaza
  - [ ] Valida la política de la nueva
  - [ ] Cierra las **demás** sesiones activas
  - [ ] Cuenta sin contraseña local: ofrece definir una — RF08

### Roles y perfil

- [ ] `P1` Middleware de autorización por rol; todas las rutas del panel exigen `ADMINISTRADOR` — RF10
- [ ] `P1` Guardas de ruta en el frontend: `AccountLayout` exige sesión, `AdminLayout` exige rol de administrador
- [ ] `P2` **UC14 — Mis datos y direcciones** (pantallas `mis-datos`, `direcciones`) — RF11, RNF08
  - [ ] Editar datos personales
  - [ ] Alta, edición y baja de direcciones; marcar una como predeterminada
  - [ ] Datos incompletos o inválidos: los señala y no guarda
  - [ ] Eliminar la única dirección: advierte que la necesitará en el checkout

---

## Fase 3 — Catálogo

Módulos: `backend/src/modules/catalog/` · `frontend/src/features/catalog/`, `admin/` · Pantallas: `portada`, `catalogo`, `ficha`, `admin-productos`, `admin-categorias`

### Tienda

- [ ] `P1` **Portada — propuesta E** (sección 00 de [mockups.html](docs/diseno/mockups.html)): lupa en la barra, franja con foto y lema, categorías y ofertas
- [ ] `P1` **UC01 — Navegar el catálogo sin sesión** — RF01, RF16
  - [ ] Lista por categoría con precio vigente y descuento activo
  - [ ] Categoría sin productos: «no hay resultados» y sugiere otras
- [ ] `P1` **Ficha de producto** con todos los atributos de RF14, galería de imágenes y disponibilidad — RF14, RF15
  - [ ] Sin stock: se muestra como no disponible y el botón de agregar queda deshabilitado — RF20
- [ ] `P1` **UC02 — Búsqueda con filtros combinados**: texto, categoría, marca, rango de precio, ocasión y estado — RF17
  - [ ] Precio mínimo mayor que el máximo: lo señala y no busca
  - [ ] Sin resultados: lo informa y ofrece quitar filtros
  - [ ] Filtros reflejados en la URL (se pueden compartir y volver atrás)
  - [ ] Paginación del lado del servidor; responde en tiempo aceptable con varios cientos de productos — RNF11
- [ ] `P1` Secciones propias de **Kits** y **Ofertas** en el catálogo (no son categorías)

### Panel

- [ ] `P1` **UC19 — Productos: alta, modificación y baja** — RF13, RF14, RF15
  - [ ] Valida obligatorios y unicidad de SKU; si existe, indica qué producto lo usa
  - [ ] Carga de una o más imágenes, con orden y portada (`infrastructure/storage/`)
  - [ ] Baja de un producto que integra un kit activo: advierte y exige resolver el kit antes
  - [ ] Baja de un producto con pedidos: **baja lógica**, conserva el historial
  - [ ] Cambios de precio y stock al registro de auditoría — RNF10
- [ ] `P1` **UC20 — Categorías: alta, renombre y baja** — RF16
  - [ ] El nombre no se repite
  - [ ] Baja de una categoría con productos: exige reasignarlos a otra categoría antes de continuar
  - [ ] Los cambios se reflejan en los filtros del catálogo

---

## Fase 4 — Stock y kits

Módulos: `catalog/`, `kits/` · Pantallas: `admin-compras`, `admin-kits`

- [ ] `P2` **UC21 — Registrar compra a proveedor** — RF18, RF19
  - [ ] Cantidad nula o negativa: rechaza
  - [ ] Incrementa el stock y registra el `MovimientoStock` en una transacción
  - [ ] Producto que vuelve a tener stock: se reofrece y se rehabilitan los kits que lo usan (UC29)
  - [ ] Al registro de auditoría — RNF10
- [ ] `P1` **UC22 — Armar un kit** — RF21, RF24
  - [ ] Elegir productos y cantidad de cada uno
  - [ ] `P2` Precio propio o descuento sobre la suma de componentes — RF24
  - [ ] Precio mayor que la suma de componentes: advierte y pide confirmación
  - [ ] Componentes inexistentes o inactivos: rechaza
  - [ ] Componente sin stock: se guarda pero se muestra no disponible
- [ ] `P1` **UC29 — Disponibilidad del kit** — RF22
  - [ ] Disponible solo si **todos** los componentes alcanzan, validado por la **cantidad total** pedida
  - [ ] Kit no disponible: excluido del catálogo y del asistente
  - [ ] Función reutilizable desde el carrito, los pedidos y el asistente

---

## Fase 5 — Ofertas y carrito

Módulos: `offers/`, `cart/` · Pantallas: `carrito`, `admin-ofertas`

### Ofertas

- [ ] `P2` **UC23 — Crear y gestionar ofertas** — RF25
  - [ ] Porcentaje dentro de rango y alcance: producto, categoría o kit
  - [ ] Fecha de fin anterior a la de inicio: rechaza
  - [ ] Ya hay una oferta vigente con el mismo alcance: advierte y pide definir cuál prevalece
- [ ] `P3` Vigencia automática: se activa y vence sola por fecha, sin intervención — RF27
- [ ] `P2` **UC28 — Aplicar la oferta** — RF25, RF26
  - [ ] Busca ofertas vigentes por producto, categoría o kit
  - [ ] Varias concurren sobre un ítem: aplica **una sola**, según la regla del administrador
  - [ ] Sin ofertas: precio de lista
  - [ ] Función reutilizable desde el catálogo, el carrito y los pedidos

### Carrito

- [ ] `P1` **UC04 — Carrito sin sesión** — RF01, RF28, RNF02
  - [ ] Carrito anónimo atado a la sesión del navegador (cookie `httpOnly`)
  - [ ] Agregar, quitar y cambiar cantidades de productos y kits
  - [ ] Cantidad mayor al stock: la ajusta al máximo e informa el motivo — RF20
  - [ ] Kit sin stock en algún componente: no se agrega (UC29)
  - [ ] **No reserva stock**
- [ ] `P1` Cálculo de subtotal, descuentos, envío y total provisorio — RF29
- [ ] `P2` Mostrar precio original, descuento aplicado y subtotal por ítem — RF26
- [ ] `P2` Oferta vencida mientras el ítem está en el carrito: recalcula y avisa antes de confirmar — UC28
- [ ] `P1` **Fusión del carrito anónimo** con el de la cuenta al ingresar (local o Google) — UC04, UC06, UC07
  - [ ] Ítems repetidos: suma cantidades y vuelve a validar el stock
- [ ] `P1` Ícono del carrito en la barra con la cantidad de ítems

---

## Fase 6 — Checkout, pedidos y pago

Módulos: `orders/`, `payments/` · `features/checkout/` · Pantalla: `checkout`

### Checkout

- [ ] `P1` **UC10 — Confirmar la compra** — RF09, RF20, RF29, RF30
  - [ ] Exige sesión **solo aquí**; si no la hay, deriva a `ingreso` y retoma — RF09
  - [ ] `P2` Cuenta local no verificada: no deja confirmar y ofrece reenviar la verificación — RF05
  - [ ] Revalida el stock de cada ítem y la disponibilidad de los kits (UC29)
  - [ ] Ítem sin stock: lo informa, ajusta el carrito y pide revisar
  - [ ] Pide la dirección de envío o permite elegir una guardada; sin direcciones, pide cargar una — RF30
  - [ ] Envío a todo el país — RF34
  - [ ] Muestra el resumen final y genera el pedido en `PENDIENTE_PAGO` con **precios y dirección congelados**
- [ ] `P1` Definir cómo se calcula el costo de envío (tarifa fija, por provincia o por peso) y documentarlo — RF29

### Mercado Pago

- [ ] `P1` **UC11 — Pagar con Mercado Pago** — RF31, RF32, RF33, RNF09
  - [ ] Crear la preferencia de pago con el detalle del pedido y redirigir (`infrastructure/mercadopago/`)
  - [ ] Páginas de resultado: aprobado, rechazado y pendiente
  - [ ] Webhook: valida la firma con la clave secreta de Mercado Pago; si no valida, **descarta sin tocar el pedido**
  - [ ] Antes de marcar pagado, **consulta el estado real** del pago contra la API de Mercado Pago
  - [ ] **Idempotente**: la misma notificación dos veces produce un solo efecto
  - [ ] Rechazado: pedido en `PAGO_RECHAZADO`, sin tocar stock, con opción de reintentar
  - [ ] Pendiente: el pedido espera la confirmación definitiva
  - [ ] Ningún dato de tarjeta pasa por el sistema — RNF09
- [ ] `P1` **UC27 — Descontar stock al aprobarse el pago** — RF19, RF20, RF23, RNF16
  - [ ] Una sola transacción con control de concurrencia (bloqueo de filas o actualización condicional `stock >= cantidad`)
  - [ ] Los kits descuentan cada componente
  - [ ] Si un ítem no alcanza: **revierte todo**, pedido en `REVISION_MANUAL` y aviso al administrador
  - [ ] Registra los `MovimientoStock`
  - [ ] Producto que llega a cero: deja de ofrecerse y deshabilita sus kits
- [ ] `P1` Prueba de concurrencia: dos pagos simultáneos sobre la última unidad → una venta, ninguna sobreventa

---

## Fase 7 — Comprobante, notificaciones e historial

Módulos: `orders/`, `infrastructure/mail/` · `features/orders/` · Pantalla: `pedidos`

- [ ] `P1` **UC16 — Correo de confirmación de venta** — RF38
  - [ ] Si falla, reintenta; si persiste, registra el error y el comprobante queda en el historial
- [ ] `P2` **Comprobante de la operación** al confirmarse el pago: ítems, descuentos, envío y total. El fiscal lo emite Mercado Pago — RF37
  - [ ] Publicado en el detalle del pedido y adjunto o enlazado en el correo
- [ ] `P1` **UC12 — Mis pedidos** — RF39
  - [ ] Lista con fecha, total, estado del pedido y del envío (píldora con color **y** texto)
  - [ ] Detalle: ítems, precios, descuentos, dirección y comprobante
  - [ ] Sin compras: lo informa y ofrece ir al catálogo

---

## Fase 8 — Envíos

Módulos: `shipping/` · Pantalla: `admin-envios`

- [ ] `P1` **UC24 — Actualizar el estado del envío (simulado)** — RF34, RF35
  - [ ] Estados: pendiente → en preparación → en camino → entregado
  - [ ] Registra fecha y usuario de cada cambio, y lo escribe en el registro de auditoría — RNF10
  - [ ] Retroceso de estado: pide confirmación y motivo
  - [ ] Listado con filtros por estado y búsqueda por pedido
- [ ] `P2` **UC17 — Notificar el cambio de estado** — RF36
  - [ ] Correo al cliente y reflejo en «Mis pedidos»
  - [ ] Si el correo falla, el cambio se ve igual en el panel del cliente y se registra el error

---

## Fase 9 — Devoluciones

Módulos: `returns/` · `features/returns/`, `admin/` · Pantallas: `mis-devoluciones`, `admin-devoluciones`

- [ ] `P2` **UC13 — Solicitar una devolución** — RF40, RF42
  - [ ] Elegir ítems y cantidades del pedido, y el motivo
  - [ ] Pedido no pagado o fuera de plazo: no permite y muestra la política — RNF17
  - [ ] Ya hay una en curso para ese pedido: muestra su estado en lugar de crear otra
  - [ ] Notifica al administrador y confirma al cliente
  - [ ] **No toca el stock**
- [ ] `P2` **UC25 — Gestionar la devolución** — RF41, RF42
  - [ ] Aprobar o rechazar (con motivo); el rechazo no toca el stock
  - [ ] **Registrar recepción**: reingresa al stock solo lo efectivamente recibido (devolución parcial)
  - [ ] Marcar como reembolsada al confirmar el reintegro
  - [ ] Notifica al cliente en cada cambio de estado
  - [ ] Cada cambio de estado y de stock al registro de auditoría — RNF10

---

## Fase 10 — Asistente de recomendación

Módulos: `assistant/` · `features/assistant/` · Pantalla: `asis`

- [ ] `P2` **UC03 — Consultar al asistente** — RF43, RF45
  - [ ] Ventana de chat accesible desde cualquier página
  - [ ] Semiautomatizado: interpreta criterios de ID, SKU, marca, categoría, estado y ocasión; no es un agente conversacional general
  - [ ] Devuelve productos con enlace a la ficha y permite refinar
  - [ ] Sin coincidencias: lo informa y propone relajar un criterio
  - [ ] Consulta fuera del dominio: aclara su alcance y muestra el número de contacto — RF48
  - [ ] No modifica el carrito por sí solo
- [ ] `P3` Recomendar también kits, excluyendo los no disponibles — RF44, UC29

---

## Fase 11 — Panel y reportes

Módulos: `admin/` · `features/admin/` · Pantalla: `admin-reportes`

- [ ] `P1` Navegación del panel con todas las secciones; nada de lo que gestiona requiere tocar código — RF46
- [ ] `P2` Visor del registro de auditoría (filtros por fecha, usuario y entidad) — RNF10
- [ ] `P1` Aviso de pedidos en revisión manual por falta de stock — UC27
- [ ] `P3` **UC26 — Reportes de ventas y stock** — RF47
  - [ ] Elegir período; ventas, más vendidos y stock actual
  - [ ] Señalar productos por debajo del stock mínimo
  - [ ] Período sin operaciones: lo informa

---

## Fase 12 — Contacto, legales y cierre

- [ ] `P1` Número de contacto visible como único canal directo (pie de página y asistente) — RF48
- [ ] `P1` Páginas de **Términos y Condiciones** y **Política de Devoluciones**, enlazadas desde el pie y desde el checkout — RNF17
- [ ] `P1` Política de privacidad y consentimiento conforme a la Ley 25.326 — RNF08
- [ ] `P2` Respaldo periódico de productos, pedidos y usuarios en `backend/src/jobs/`, con procedimiento de restauración probado — RNF18
- [ ] `P2` Tarea programada de limpieza de tokens vencidos — RNF07
- [ ] `P2` Prueba manual en Chrome, Firefox, Safari y Edge, en escritorio y en móviles — RNF01, RNF15
- [ ] `P2` Despliegue sobre HTTPS y acuerdo de disponibilidad con el hosting — RNF03, RNF12
- [ ] `P2` La arquitectura permite sumar categorías, atributos o medios de pago sin reescritura mayor (revisión de diseño) — RNF13
- [ ] `P1` Actualizar [trazabilidad.md](docs/trazabilidad.md) cuando cambie un módulo o una pantalla

---

## Pruebas mínimas de las reglas críticas

Las reglas de negocio de CLAUDE.md, cada una con al menos una prueba de integración:

- [ ] `P1` Catálogo y carrito sin sesión; checkout exige sesión — RF09
- [ ] `P1` Carrito anónimo se fusiona al ingresar — UC04, UC06, UC07
- [ ] `P2` Mismo correo por Google y local → un solo usuario; sin correo verificado → sin acceso — RF08, UC30
- [ ] `P1` Sin sobreventa bajo concurrencia; reversión total si un ítem no alcanza — RF20, RNF16, UC27
- [ ] `P1` Webhook inválido descartado; webhook repetido con un solo efecto; estado consultado a la API — RF33, UC11
- [ ] `P1` Kit no disponible si un componente no alcanza la cantidad total — RF22, UC29
- [ ] `P1` Precios congelados al generar el pedido — UC10
- [ ] `P2` Una sola oferta por ítem; vence sola por fecha — UC28, RF27
- [ ] `P2` Devolución: stock intacto al solicitar, reingreso parcial al recibir — UC13, UC25
- [ ] `P1` Mensajes genéricos en ingreso fallido y recuperación; tokens de un solo uso y vencidos rechazados — RNF07
- [ ] `P1` La API nunca devuelve el hash de la contraseña — RNF05

---

## Fuera de alcance — no implementar

App móvil nativa · facturación electrónica ARCA/AFIP · medios de pago distintos de Mercado Pago · integración con operadores logísticos · fidelización · cupones nominales · lista de deseos.
