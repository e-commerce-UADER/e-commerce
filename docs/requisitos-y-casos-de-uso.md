# Aventura 360 — Requisitos y casos de uso

Resumen en markdown de [Aventura360-Requerimientos-v1.0.pdf](Aventura360-Requerimientos-v1.0.pdf) (versión final): 48 requerimientos funcionales, 18 no funcionales y 30 casos de uso. Ante cualquier diferencia, **manda el PDF**.

Cliente: Aventura 360, Paraná (Entre Ríos). Rubro: e-commerce de productos de aventura —trekking, camping y kayak—.

**Prioridades MoSCoW:** Imprescindible (sin esto no hay producto) · Importante (se entrega sin él solo si el tiempo apremia) · Opcional (si sobra capacidad).

---

## 1. Requerimientos funcionales

### 1.1 Usuarios, cuentas y autenticación

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF01 | Imprescindible | Navegar el catálogo y gestionar el carrito sin iniciar sesión |
| RF02 | Imprescindible | Registro e inicio de sesión mediante OAuth 2.0 con Google |
| RF03 | Imprescindible | Registro de cuenta propia con correo y contraseña, sin depender de un proveedor externo |
| RF04 | Imprescindible | Inicio de sesión con credenciales locales |
| RF05 | Importante | Verificar el correo del registro local por enlace; la cuenta no confirma compras hasta verificarse |
| RF06 | Imprescindible | Recuperar el acceso con enlace de restablecimiento, de un solo uso y con vencimiento |
| RF07 | Importante | Cambiar la contraseña desde el perfil, exigiendo la actual |
| RF08 | Importante | Vincular cuenta local y Google bajo un único usuario cuando el correo coincide, evitando duplicados |
| RF09 | Imprescindible | Exigir sesión iniciada **únicamente** al confirmar la compra |
| RF10 | Imprescindible | Distinguir al menos dos roles: Cliente y Administrador |
| RF11 | Importante | Gestionar datos de perfil y direcciones de envío |
| RF12 | Imprescindible | Cerrar sesión |

### 1.2 Catálogo de productos

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF13 | Imprescindible | Alta, modificación y baja de productos por el administrador |
| RF14 | Imprescindible | Cada producto registra: ID, SKU, nombre, descripción, marca, categoría, precio, garantía, estado, ocasión y dimensiones |
| RF15 | Imprescindible | Asociar una o más imágenes a cada producto |
| RF16 | Imprescindible | Categorías mínimas: carpas, mochilas y accesorios (linternas, aislantes, bastones, botellas y termos) |
| RF17 | Imprescindible | Búsqueda con filtros: categoría, marca, precio, ocasión, estado, entre otros |
| RF18 | Importante | Registrar compras a proveedores para incrementar el stock |
| RF19 | Imprescindible | Descontar stock automáticamente al concretarse una venta |
| RF20 | Imprescindible | Impedir la venta sin stock disponible, evitando la sobreventa |

### 1.3 Kits y combos

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF21 | Imprescindible | Armar kits o combos combinando productos existentes |
| RF22 | Imprescindible | Un kit solo se ofrece si **todos** sus componentes tienen stock |
| RF23 | Imprescindible | Al vender un combo, descontar stock de cada producto que lo compone |
| RF24 | Importante | Definir precio o descuento propio del combo, distinto de la suma de sus componentes |

### 1.4 Ofertas

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF25 | Importante | Crear ofertas como porcentaje de descuento, aplicables a producto, categoría o combo |
| RF26 | Importante | Mostrar el descuento aplicado en el carrito antes de confirmar |
| RF27 | Opcional | Vigencia con fecha de inicio y de fin; deja de aplicarse automáticamente al vencer |

### 1.5 Carrito y checkout

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF28 | Imprescindible | Agregar, quitar y modificar cantidades de productos y combos en el carrito |
| RF29 | Imprescindible | Calcular automáticamente subtotal, descuentos, costo de envío y total |
| RF30 | Imprescindible | Solicitar la dirección de envío al confirmar la compra |

### 1.6 Pagos

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF31 | Imprescindible | Integrar Mercado Pago como medio de pago |
| RF32 | Imprescindible | Actualizar el estado del pedido según la confirmación: aprobado, rechazado o pendiente |
| RF33 | Imprescindible | Validar la notificación de pago (webhook) para no confirmar pedidos no pagados |

### 1.7 Envíos

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF34 | Imprescindible | Envío a todo el país |
| RF35 | Imprescindible | Registro simulado: el administrador actualiza el estado a mano (pendiente, en preparación, en camino, entregado) |
| RF36 | Importante | Notificar al cliente, por correo o desde su panel, cuando cambia el estado del envío |

### 1.8 Comprobantes y notificaciones

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF37 | Importante | Al confirmarse el pago, generar el comprobante de la operación (ítems, descuentos, envío y total). El comprobante **fiscal** lo emite Mercado Pago |
| RF38 | Imprescindible | Enviar correo de confirmación de venta al cliente |

### 1.9 Historial y devoluciones

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF39 | Imprescindible | Mostrar al cliente su historial de pedidos |
| RF40 | Importante | Permitir al cliente solicitar una devolución sobre un pedido |
| RF41 | Importante | Permitir al administrador aprobar o rechazar la solicitud |
| RF42 | Importante | Registrar el estado de la devolución (solicitada, aprobada, rechazada, reembolsada) y su impacto en el stock |

### 1.10 Asistente de recomendación

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF43 | Importante | Asistente semiautomatizado que ayuda a elegir productos en determinadas situaciones |
| RF44 | Opcional | Recomendar kits y combos, no solo productos individuales |
| RF45 | Importante | Criterios de recomendación: ID, SKU, marca, categoría, estado y ocasión |

### 1.11 Panel de administración

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF46 | Imprescindible | Panel que gestione productos, combos, ofertas, envíos y devoluciones sin modificar código |
| RF47 | Opcional | Reportes básicos de ventas y stock |

### 1.12 Contacto

| Código | Prioridad | Requerimiento |
|---|---|---|
| RF48 | Imprescindible | Mostrar un número de contacto como único canal de contacto directo |

### 1.13 Fuera de alcance en esta versión

| Fuera de alcance | Motivo |
|---|---|
| Aplicación móvil nativa | La interfaz responsive (RNF01) cubre el uso desde el teléfono |
| Facturación electrónica ARCA (ex AFIP) | El comprobante fiscal lo emite Mercado Pago (RF37) |
| Medios de pago adicionales | La arquitectura prevé incorporarlos sin reescritura mayor (RNF13) |
| API de operadores logísticos | El estado del envío se administra manualmente (RF35) |
| Fidelización, cupones nominales y lista de deseos | No fueron solicitados por el cliente en esta etapa |

---

## 2. Requerimientos no funcionales

| Código | Categoría | Prioridad | Requerimiento |
|---|---|---|---|
| RNF01 | Usabilidad | Imprescindible | Interfaz responsive: móviles, tabletas y escritorio |
| RNF02 | Usabilidad | Importante | Catálogo y carrito usables sin fricción por usuarios no registrados |
| RNF03 | Seguridad | Imprescindible | Toda comunicación sobre HTTPS |
| RNF04 | Seguridad | Imprescindible | OAuth 2.0 sin exponer ni almacenar credenciales del proveedor; manejo correcto de expiración, refresco y almacenamiento de tokens |
| RNF05 | Seguridad | Imprescindible | Contraseñas locales solo como hash con salt (bcrypt o Argon2). Nunca en texto plano, ni en logs, ni en respuestas de la API |
| RNF06 | Seguridad | Importante | Política mínima de contraseñas y límite de intentos fallidos (rate limiting o bloqueo temporal) |
| RNF07 | Seguridad | Imprescindible | Tokens de verificación y reset aleatorios, de un solo uso y con vencimiento. No revelar si un correo está registrado |
| RNF08 | Seguridad | Imprescindible | Datos personales conforme a la Ley 25.326 de Protección de Datos Personales |
| RNF09 | Seguridad | Imprescindible | Pagos delegados íntegramente a Mercado Pago; no almacenar datos de tarjetas |
| RNF10 | Seguridad | Importante | Log de auditoría de acciones administrativas críticas: stock, precio, estado de envío y de devolución |
| RNF11 | Rendimiento | Importante | Búsqueda con filtros en tiempos aceptables con catálogos de varios cientos de productos |
| RNF12 | Disponibilidad | Importante | Disponibilidad acorde a un e-commerce en producción; SLA a definir con el proveedor de hosting |
| RNF13 | Escalabilidad | Importante | La arquitectura permite agregar categorías, atributos o medios de pago sin reescritura mayor |
| RNF14 | Mantenibilidad | Imprescindible | Código versionado en la organización de GitHub del equipo, con historial trazable por funcionalidad |
| RNF15 | Compatibilidad | Importante | Funcionar en Chrome, Firefox, Safari y Edge |
| RNF16 | Confiabilidad | Imprescindible | Control de concurrencia en el descuento de stock: sin sobreventa |
| RNF17 | Legal | Imprescindible | Sección visible de Términos y Condiciones y de Política de Devoluciones |
| RNF18 | Respaldo | Importante | Respaldo periódico de la base: productos, pedidos y usuarios |

---

## 3. Actores

| Actor | Tipo | Descripción |
|---|---|---|
| **Visitante** | Primario | Usuario no registrado. Navega el catálogo y arma el carrito; no confirma compras |
| **Cliente** | Primario | Usuario registrado, por cuenta local o por Google. Compra, consulta su historial y solicita devoluciones |
| **Administrador** | Primario | Dueño u operador. Gestiona catálogo, combos, ofertas, envíos y devoluciones desde el panel |
| **Asistente (bot)** | Secundario (del sistema) | Ventana de chat que recomienda productos y kits según criterios de búsqueda (RF43) |
| **Mercado Pago** | Externo | Procesa el pago, notifica por webhook y emite el comprobante de pago |
| **Proveedor de OAuth (Google)** | Externo | Autentica al usuario que elige el acceso federado |
| **Servicio de correo** | Externo | Entrega verificación, restablecimiento, confirmación de venta y cambio de estado de envío |

El Cliente es un Visitante autenticado: hereda todos sus casos de uso y suma los propios.

---

## 4. Casos de uso

### 4.1 Visitante

| Código | Caso de uso | Requerimientos |
|---|---|---|
| UC01 | Navegar el catálogo sin registrarse | RF01, RF16 |
| UC02 | Buscar productos con filtros | RF17 |
| UC03 | Consultar al asistente vía chat | RF43, RF44, RF45 |
| UC04 | Armar el carrito sin sesión iniciada | RF01, RF26, RF28 |
| UC05 | Registrarse con correo y contraseña | RF03, RF05 |
| UC06 | Iniciar sesión con correo y contraseña | RF04, RF09 |
| UC07 | Registrarse o iniciar sesión con Google (OAuth) | RF02, RF08, RF09 |
| UC08 | Recuperar la contraseña | RF06 |
| UC09 | Verificar la dirección de correo | RF05 |

### 4.2 Cliente

| Código | Caso de uso | Requerimientos |
|---|---|---|
| UC10 | Confirmar la compra (checkout) | RF09, RF20, RF29, RF30 |
| UC11 | Pagar con Mercado Pago | RF31, RF32, RF33, RF37 |
| UC12 | Consultar el historial de pedidos | RF39 |
| UC13 | Solicitar una devolución | RF40, RF42 |
| UC14 | Gestionar el perfil y las direcciones | RF11 |
| UC15 | Cambiar la contraseña | RF07 |
| UC16 | Notificar la confirmación de venta | RF37, RF38 |
| UC17 | Notificar el cambio de estado del envío | RF36 |
| UC18 | Cerrar sesión | RF12 |

### 4.3 Administrador

| Código | Caso de uso | Requerimientos |
|---|---|---|
| UC19 | Gestionar productos (alta, baja y modificación) | RF13, RF14, RF15, RF20 |
| UC20 | Gestionar categorías de producto | RF16 |
| UC21 | Gestionar el stock por compra a proveedores | RF18, RF19 |
| UC22 | Armar un kit o combo | RF21, RF22, RF23, RF24 |
| UC23 | Crear y gestionar ofertas | RF25, RF26, RF27 |
| UC24 | Actualizar el estado de un envío (simulado) | RF34, RF35 |
| UC25 | Gestionar una solicitud de devolución | RF41, RF42 |
| UC26 | Consultar reportes de ventas y stock | RF47 |

### 4.4 Sistema (procesos automáticos)

No los inicia ningún actor humano: el sistema los ejecuta como parte de otro caso de uso, mediante una relación «include». Se especifican aparte porque concentran las reglas de negocio críticas.

| Código | Caso de uso | Incluido en | Requerimientos |
|---|---|---|---|
| UC27 | Descontar stock al vender | UC10, UC11 | RF19, RF20, RF23 |
| UC28 | Aplicar el descuento de oferta en el carrito | UC04, UC10 | RF25, RF26, RF27 |
| UC29 | Validar la disponibilidad de un combo antes de vender | UC10, UC22 | RF20, RF22 |
| UC30 | Vincular una cuenta OAuth con una cuenta local existente | UC07 | RF08 |

---

## 5. Especificación de los casos de uso

### 5.1 Casos de uso del Visitante

#### UC01 — Navegar el catálogo sin registrarse

- **Actor principal:** Visitante · **Secundarios:** — · **Requerimientos:** RF01, RF16
- **Precondiciones:** el catálogo tiene al menos un producto publicado.

**Flujo principal**
1. El visitante accede al sitio.
2. El sistema muestra las categorías y los productos publicados, con su precio vigente y los descuentos activos.
3. El visitante recorre las categorías y abre la ficha de un producto.
4. El sistema muestra los atributos del producto (RF14), sus imágenes y su disponibilidad.

**Flujos alternativos**
- *2a.* Una categoría sin productos publicados: informa que no hay resultados y sugiere otras categorías.
- *4a.* El producto no tiene stock: se muestra como no disponible y no puede agregarse al carrito (RF20).

**Postcondiciones:** ninguna. La navegación no modifica el estado del sistema.

#### UC02 — Buscar productos con filtros

- **Actor principal:** Visitante · **Requerimientos:** RF17
- **Precondiciones:** el visitante se encuentra en el catálogo.

**Flujo principal**
1. Ingresa un texto de búsqueda o selecciona filtros: categoría, marca, rango de precio, ocasión y estado.
2. El sistema aplica los filtros de forma combinada sobre el catálogo.
3. Devuelve los productos que cumplen todos los criterios, con su precio y su descuento vigente.
4. El visitante ajusta o limpia los filtros y el sistema recalcula el resultado.

**Flujos alternativos**
- *1a.* Rango de precio inválido (mínimo mayor que máximo): lo señala y no ejecuta la búsqueda.
- *3a.* Ningún producto cumple los criterios: informa que no hay resultados y ofrece quitar filtros.

**Postcondiciones:** ninguna.

#### UC03 — Consultar al asistente vía chat

- **Actor principal:** Visitante · **Secundarios:** Asistente (bot) · **Requerimientos:** RF43, RF44, RF45
- **Precondiciones:** el visitante se encuentra en cualquier página del sitio.

**Flujo principal**
1. Abre la ventana de chat.
2. Describe la actividad, la ocasión o la característica que busca.
3. El asistente interpreta los criterios de recomendación: ID, SKU, marca, categoría, estado y ocasión.
4. Consulta el catálogo y devuelve los productos y kits que coinciden, con enlace a cada ficha.
5. El visitante refina el pedido y el asistente ajusta la recomendación.

**Flujos alternativos**
- *2a.* La consulta excede el dominio del catálogo: el asistente aclara que solo asiste en la elección de productos y muestra el número de contacto (RF48).
- *4a.* Ningún producto coincide: lo informa y propone relajar algún criterio.
- *4b.* Un kit candidato no tiene stock en todos sus componentes: no se ofrece (RF22).

**Postcondiciones:** ninguna. La conversación no genera un pedido ni modifica el carrito por sí sola.

#### UC04 — Armar el carrito sin sesión iniciada

- **Actor principal:** Visitante · **Requerimientos:** RF01, RF26, RF28
- **Precondiciones:** existe al menos un producto o kit con stock disponible.

**Flujo principal**
1. Agrega un producto o un kit al carrito, indicando la cantidad.
2. El sistema crea o recupera el carrito anónimo asociado a la sesión del navegador.
3. Verifica que haya stock suficiente (RF20) y, si es un kit, su disponibilidad (UC29).
4. Aplica los descuentos vigentes (UC28).
5. Muestra el detalle con subtotal, descuentos y total provisorio.
6. El visitante modifica cantidades o quita ítems y el sistema recalcula.

**Flujos alternativos**
- *2a.* El visitante inicia sesión más adelante: el carrito anónimo se fusiona con el de su cuenta (UC06, UC07).
- *3a.* La cantidad solicitada supera el stock: la ajusta al máximo disponible e informa el motivo.
- *3b.* El kit no tiene stock en alguno de sus componentes: no se permite agregarlo.

**Postcondiciones:** existe un carrito asociado a la sesión del navegador, con los ítems y las cantidades elegidas. **No hay reserva de stock.**

#### UC05 — Registrarse con correo electrónico y contraseña

- **Actor principal:** Visitante · **Secundarios:** Servicio de correo · **Requerimientos:** RF03, RF05; RNF05, RNF06, RNF07
- **Precondiciones:** el visitante no posee una cuenta verificada asociada a la dirección que declara.

**Flujo principal**
1. Accede al formulario de registro.
2. Ingresa nombre, correo y contraseña, y confirma esta última.
3. El sistema valida el formato del correo y la política mínima de contraseñas (RNF06).
4. Verifica que la dirección no esté registrada.
5. Almacena el usuario con la contraseña como hash con salt (RNF05) y la cuenta en estado «no verificada».
6. Genera un token de verificación de un solo uso, con vencimiento, y envía el enlace por correo (UC09).
7. Informa que debe revisar su casilla.

**Flujos alternativos**
- *3a.* La contraseña no cumple la política: indica los requisitos incumplidos y no crea la cuenta.
- *4a.* La dirección ya corresponde a una cuenta local: informa el error de manera genérica y ofrece iniciar sesión o recuperar la contraseña.
- *4b.* La dirección corresponde a una cuenta creada con Google: propone iniciar sesión con Google o definir una contraseña para esa misma cuenta (RF08, UC30).
- *6a.* Falla el envío del correo: la cuenta se conserva como «no verificada» y se permite reenviar el enlace.

**Postcondiciones:** existe un usuario con credenciales locales y cuenta pendiente de verificación. La contraseña no se almacena en texto plano en ningún punto del proceso.

#### UC06 — Iniciar sesión con correo electrónico y contraseña

- **Actor principal:** Visitante con cuenta local · **Requerimientos:** RF04, RF09; RNF05, RNF06
- **Precondiciones:** el usuario posee una cuenta local verificada.

**Flujo principal**
1. Ingresa su dirección de correo y su contraseña.
2. El sistema recupera el usuario y compara la contraseña contra el hash almacenado.
3. Comprueba que la cuenta esté verificada y activa.
4. Crea la sesión, asigna el rol correspondiente (RF10) y fusiona el carrito anónimo con el del usuario.
5. Redirige a la página desde la que solicitó autenticarse.

**Flujos alternativos**
- *2a.* Credenciales inválidas: mensaje genérico —sin revelar si la dirección existe— e incrementa el contador de intentos fallidos.
- *2b.* Se supera el límite de intentos: bloquea temporalmente el acceso a esa cuenta (RNF06).
- *2c.* La dirección corresponde a una cuenta de Google sin contraseña local: sugiere iniciar sesión con Google (UC07).
- *3a.* La cuenta no está verificada: ofrece reenviar el correo de verificación y no crea la sesión.

**Postcondiciones:** el usuario queda autenticado y su carrito anónimo, si existía, pasa a estar asociado a su cuenta.

#### UC07 — Registrarse o iniciar sesión con Google (OAuth)

- **Actor principal:** Visitante · **Secundarios:** Proveedor de OAuth (Google) · **Requerimientos:** RF02, RF08, RF09; RNF04
- **Precondiciones:** el visitante posee una cuenta de Google.

**Flujo principal**
1. Selecciona «Continuar con Google».
2. El sistema lo redirige al proveedor de OAuth.
3. El visitante se autentica y otorga el consentimiento.
4. El proveedor devuelve el código de autorización; el sistema lo intercambia por los tokens y obtiene el perfil básico y el correo verificado.
5. El sistema busca un usuario con esa dirección: si no existe, lo crea sin contraseña local; si existe, vincula el proveedor a ese usuario (UC30).
6. Crea la sesión y fusiona el carrito anónimo.

**Flujos alternativos**
- *3a.* El visitante cancela el consentimiento: retorna al inicio de sesión sin crear la sesión.
- *4a.* El proveedor no devuelve un correo verificado: **rechaza el acceso**.
- *5a.* Ya existe una cuenta local con esa dirección: vincula ambos métodos a un mismo usuario, sin duplicar la cuenta (RF08).

**Postcondiciones:** el usuario queda autenticado y su identidad de Google queda vinculada a un único registro de usuario.

#### UC08 — Recuperar la contraseña

- **Actor principal:** Visitante con cuenta local · **Secundarios:** Servicio de correo · **Requerimientos:** RF06; RNF05, RNF07
- **Precondiciones:** el usuario declara una dirección de correo.

**Flujo principal**
1. Solicita restablecer su contraseña e ingresa su dirección de correo.
2. El sistema responde **siempre con el mismo mensaje**, sin revelar si la dirección está registrada (RNF07).
3. Si corresponde a una cuenta local, genera un token aleatorio de un solo uso con vencimiento y envía el enlace.
4. El visitante abre el enlace e ingresa la nueva contraseña.
5. El sistema valida el token y la política de contraseñas, almacena el nuevo hash e invalida el token.
6. Cierra las sesiones activas de ese usuario y le solicita iniciar sesión nuevamente.

**Flujos alternativos**
- *3a.* La dirección corresponde a una cuenta creada únicamente con Google: se envía un correo indicando que el acceso se realiza con Google.
- *5a.* Token vencido o ya utilizado: rechaza la operación y ofrece solicitar uno nuevo.

**Postcondiciones:** la contraseña queda reemplazada por su nuevo hash y el token utilizado deja de ser válido.

#### UC09 — Verificar la dirección de correo electrónico

- **Actor principal:** Visitante con cuenta local · **Secundarios:** Servicio de correo · **Requerimientos:** RF05; RNF07
- **Precondiciones:** existe una cuenta local «no verificada» y un token de verificación vigente.

**Flujo principal**
1. Abre el enlace de verificación recibido por correo.
2. El sistema valida que el token exista, no haya sido utilizado y no esté vencido.
3. Marca la cuenta como verificada e invalida el token.
4. Informa el resultado y ofrece iniciar sesión (UC06).

**Flujos alternativos**
- *2a.* Token vencido o ya utilizado: lo rechaza y ofrece reenviar un enlace nuevo.
- *2b.* La cuenta ya estaba verificada: informa la situación y no realiza cambios.

**Postcondiciones:** la cuenta queda habilitada para confirmar compras (RF09).

### 5.2 Casos de uso del Cliente

Requieren sesión iniciada, obtenida indistintamente por cuenta local (UC06) o por Google (UC07). UC16 y UC17 se ejecutan de forma automática y tienen al Cliente como destinatario.

#### UC10 — Confirmar la compra (checkout)

- **Actor principal:** Cliente · **Requerimientos:** RF09, RF20, RF29, RF30
- **Precondiciones:** el cliente tiene al menos un ítem en el carrito.

**Flujo principal**
1. Solicita confirmar la compra.
2. El sistema exige sesión iniciada; si no la hay, invoca UC06 o UC07 y luego retoma el flujo.
3. Revalida el stock de cada ítem y la disponibilidad de los kits (UC29).
4. Solicita la dirección de envío o permite elegir una de las guardadas (RF11).
5. Calcula subtotal, descuentos vigentes (UC28), costo de envío y total.
6. Muestra el resumen para su confirmación.
7. El cliente confirma; el sistema genera el pedido en estado «pendiente de pago» y deriva al pago (UC11).

**Flujos alternativos**
- *2a.* La cuenta local no está verificada: no permite confirmar y ofrece reenviar la verificación (UC09).
- *3a.* Un ítem perdió stock: lo informa, ajusta el carrito y solicita revisar antes de continuar.
- *4a.* El cliente no tiene direcciones cargadas: se le pide cargar una (UC14).

**Postcondiciones:** existe un pedido en estado «pendiente de pago», con sus ítems, precios y dirección de envío **ya congelados**.

#### UC11 — Pagar con Mercado Pago

- **Actor principal:** Cliente · **Secundarios:** Mercado Pago, Servicio de correo · **Requerimientos:** RF31, RF32, RF33, RF37; RNF09
- **Precondiciones:** existe un pedido del cliente en estado «pendiente de pago».

**Flujo principal**
1. El sistema genera la preferencia de pago con el detalle del pedido y redirige a Mercado Pago.
2. El cliente completa el pago en el entorno de Mercado Pago.
3. Mercado Pago notifica el resultado mediante webhook.
4. El sistema valida la autenticidad de la notificación y **consulta el estado real del pago contra la API del proveedor**.
5. Si el pago fue aprobado, marca el pedido como «pagado», descuenta el stock (UC27), genera el comprobante de la operación y dispara la notificación al cliente (UC16).
6. Redirige al cliente a la página de resultado.

**Flujos alternativos**
- *3a.* El pago es rechazado: el pedido queda en «pago rechazado», no se descuenta stock y se ofrece reintentar.
- *3b.* El pago queda pendiente: el pedido permanece en ese estado hasta recibir la confirmación definitiva.
- *3c.* La misma notificación se recibe más de una vez: **el sistema la procesa una sola vez**.
- *4a.* La notificación no supera la validación: se descarta sin modificar el pedido (RF33).

**Postcondiciones:** el estado del pedido refleja el resultado del pago y el stock se descontó únicamente si el pago fue aprobado.

#### UC12 — Consultar el historial de pedidos

- **Actor principal:** Cliente · **Requerimientos:** RF39
- **Precondiciones:** el cliente tiene la sesión iniciada.

**Flujo principal**
1. Accede a la sección de pedidos.
2. El sistema lista sus pedidos con fecha, total y estado del pedido y del envío.
3. El cliente abre un pedido y consulta el detalle: ítems, precios, descuentos aplicados, dirección de envío y comprobante.

**Flujos alternativos**
- *2a.* El cliente no registra compras: lo informa y ofrece ir al catálogo.

**Postcondiciones:** ninguna.

#### UC13 — Solicitar una devolución

- **Actor principal:** Cliente · **Requerimientos:** RF40, RF42
- **Precondiciones:** existe un pedido pagado del cliente, dentro del plazo de la política de devoluciones (RNF17).

**Flujo principal**
1. Selecciona un pedido de su historial y solicita la devolución.
2. Indica los ítems que devuelve y el motivo.
3. El sistema registra la solicitud en estado «solicitada» y la asocia al pedido.
4. Notifica al administrador y confirma la recepción de la solicitud al cliente.

**Flujos alternativos**
- *1a.* El pedido no está pagado o está fuera de plazo: no permite la solicitud y muestra la política de devoluciones.
- *1b.* Ya existe una devolución en curso para ese pedido: muestra su estado en lugar de crear otra.

**Postcondiciones:** la solicitud queda registrada y pendiente de resolución (UC25). **El stock no se modifica en esta instancia.**

#### UC14 — Gestionar el perfil y las direcciones

- **Actor principal:** Cliente · **Requerimientos:** RF11; RNF08
- **Precondiciones:** el cliente tiene la sesión iniciada.

**Flujo principal**
1. Accede a su perfil.
2. Modifica sus datos personales o administra sus direcciones de envío: alta, edición y baja.
3. El sistema valida los datos obligatorios de cada dirección.
4. Guarda los cambios y confirma la operación.

**Flujos alternativos**
- *2a.* Intenta eliminar su única dirección: advierte que la necesitará al confirmar una compra.
- *3a.* Datos incompletos o inválidos: los señala y no guarda.

**Postcondiciones:** los datos de perfil y las direcciones quedan actualizados y disponibles para el checkout (UC10).

#### UC15 — Cambiar la contraseña

- **Actor principal:** Cliente con cuenta local · **Requerimientos:** RF07; RNF05, RNF06
- **Precondiciones:** el cliente tiene la sesión iniciada y su cuenta posee contraseña local.

**Flujo principal**
1. Accede a la sección de seguridad de su perfil.
2. Ingresa la contraseña actual y la nueva, y confirma esta última.
3. El sistema verifica la contraseña actual contra el hash almacenado.
4. Valida que la nueva cumpla la política de contraseñas.
5. Almacena el nuevo hash y cierra las demás sesiones activas del usuario.

**Flujos alternativos**
- *1a.* La cuenta se creó con Google y no tiene contraseña local: ofrece definir una (RF08).
- *3a.* La contraseña actual es incorrecta: rechaza el cambio.
- *4a.* La nueva no cumple la política: indica los requisitos incumplidos.

**Postcondiciones:** la contraseña queda reemplazada por su nuevo hash y las demás sesiones dejan de ser válidas.

#### UC16 — Notificar la confirmación de venta

- **Actor principal:** Sistema (proceso automático incluido en UC11) · **Secundarios:** Servicio de correo, Cliente · **Requerimientos:** RF37, RF38
- **Precondiciones:** un pedido pasó al estado «pagado».

**Flujo principal**
1. Arma el comprobante de la operación con el detalle del pedido: ítems, descuentos, costo de envío y total.
2. Compone el correo de confirmación con el resumen y el comprobante.
3. Lo envía a la dirección de correo del cliente.
4. Deja registro del envío y publica el comprobante en el historial de pedidos (UC12).

**Flujos alternativos**
- *3a.* Falla el envío: reintenta y, si el problema persiste, deja el comprobante disponible en el historial y registra el error.

**Postcondiciones:** el cliente dispone del comprobante por correo y en su historial de pedidos.

#### UC17 — Notificar el cambio de estado del envío

- **Actor principal:** Sistema (proceso automático incluido en UC24) · **Secundarios:** Servicio de correo, Cliente · **Requerimientos:** RF36
- **Precondiciones:** el administrador modificó el estado de un envío (UC24).

**Flujo principal**
1. Detecta el cambio de estado.
2. Compone la notificación con el nuevo estado y el pedido asociado.
3. La envía por correo y la refleja en el panel del cliente.

**Flujos alternativos**
- *3a.* Falla el envío del correo: el cambio queda visible de todos modos en el panel del cliente y el error se registra.

**Postcondiciones:** el cliente conoce el estado actual de su envío.

#### UC18 — Cerrar sesión

- **Actor principal:** Cliente · **Requerimientos:** RF12; RNF04
- **Precondiciones:** el cliente tiene la sesión iniciada.

**Flujo principal**
1. Selecciona cerrar sesión.
2. El sistema invalida la sesión y los tokens asociados.
3. Redirige al catálogo, ahora como visitante.

**Flujos alternativos**
- *2a.* El carrito tiene ítems: se conserva asociado a la cuenta y se recupera en el próximo inicio de sesión.

**Postcondiciones:** no queda ninguna sesión activa en ese navegador.

### 5.3 Casos de uso del Administrador

Todos se ejecutan desde el panel administrativo (RF46) y exigen sesión iniciada con rol Administrador (RF10). Las acciones que alteran stock, precios o estados quedan registradas en el log de auditoría (RNF10).

#### UC19 — Gestionar productos (alta, baja y modificación)

- **Actor principal:** Administrador · **Requerimientos:** RF13, RF14, RF15, RF20; RNF10
- **Precondiciones:** el administrador tiene la sesión iniciada con su rol.

**Flujo principal**
1. Accede al panel, sección de productos.
2. Da de alta un producto completando ID, SKU, nombre, descripción, marca, categoría, precio, garantía, estado, ocasión y dimensiones.
3. Asocia una o más imágenes al producto.
4. El sistema valida los datos obligatorios y la unicidad del SKU.
5. Guarda el producto y lo publica en el catálogo.
6. De la misma forma puede modificar o dar de baja un producto existente.

**Flujos alternativos**
- *4a.* El SKU ya existe: rechaza el alta e indica el producto que lo utiliza.
- *6a.* Baja de un producto que integra un kit activo: advierte y exige resolver el kit antes (UC22).
- *6b.* Baja de un producto con pedidos históricos: **baja lógica**, conservando el historial.

**Postcondiciones:** el catálogo refleja el alta, la modificación o la baja, y la acción queda registrada en el log de auditoría.

#### UC20 — Gestionar categorías de producto

- **Actor principal:** Administrador · **Requerimientos:** RF16
- **Precondiciones:** el administrador tiene la sesión iniciada con su rol.

**Flujo principal**
1. Accede a la sección de categorías.
2. Da de alta, renombra o da de baja una categoría.
3. El sistema valida que el nombre no se repita.
4. Guarda el cambio y actualiza los filtros del catálogo (RF17).

**Flujos alternativos**
- *2a.* Baja de una categoría con productos asociados: exige reasignarlos a otra categoría antes de continuar.

**Postcondiciones:** el árbol de categorías queda actualizado y disponible como filtro de búsqueda.

#### UC21 — Gestionar el stock por compra a proveedores

- **Actor principal:** Administrador · **Requerimientos:** RF18, RF19; RNF10
- **Precondiciones:** el administrador tiene la sesión iniciada y los productos ya están dados de alta.

**Flujo principal**
1. Registra una compra a proveedor indicando los productos y las cantidades recibidas.
2. El sistema valida las cantidades.
3. Incrementa el stock de cada producto.
4. Registra el movimiento y deja constancia en el log de auditoría.

**Flujos alternativos**
- *2a.* La cantidad es nula o negativa: rechaza el registro.
- *3a.* Un producto pasa de sin stock a con stock: vuelve a ofrecerse en el catálogo y se habilitan los kits que lo requieren (UC29).

**Postcondiciones:** el stock refleja la compra y el movimiento queda trazado.

#### UC22 — Armar un kit o combo

- **Actor principal:** Administrador · **Requerimientos:** RF21, RF22, RF23, RF24
- **Precondiciones:** existen dados de alta los productos que compondrán el kit.

**Flujo principal**
1. Crea un kit y selecciona los productos que lo integran, con la cantidad de cada uno.
2. Define un precio propio o un descuento sobre la suma de sus componentes.
3. El sistema valida que todos los componentes existan y estén activos.
4. Guarda el kit y lo publica; su disponibilidad se calcula a partir del stock de sus componentes (UC29).

**Flujos alternativos**
- *2a.* El precio definido supera la suma de los componentes: advierte y pide confirmación.
- *3a.* Un componente no tiene stock: el kit se guarda pero se muestra como no disponible hasta reponerlo.

**Postcondiciones:** el kit queda publicado y su disponibilidad queda atada al stock de todos sus componentes.

#### UC23 — Crear y gestionar ofertas

- **Actor principal:** Administrador · **Requerimientos:** RF25, RF26, RF27
- **Precondiciones:** el administrador tiene la sesión iniciada con su rol.

**Flujo principal**
1. Crea una oferta indicando el porcentaje de descuento y su alcance: un producto, una categoría o un kit.
2. Define la fecha de inicio y de fin de vigencia.
3. El sistema valida el porcentaje y la coherencia de las fechas.
4. Guarda la oferta. Al llegar la fecha de inicio se aplica automáticamente en el catálogo y en el carrito (UC28), y al vencer deja de aplicarse **sin intervención**.

**Flujos alternativos**
- *1a.* Ya existe una oferta vigente para el mismo alcance: advierte y solicita definir cuál prevalece.
- *3a.* La fecha de fin es anterior a la de inicio, o el porcentaje está fuera de rango: rechaza la oferta.

**Postcondiciones:** la oferta queda registrada con su vigencia y se aplica sola dentro del período definido.

#### UC24 — Actualizar el estado de un envío (simulado)

- **Actor principal:** Administrador · **Requerimientos:** RF34, RF35; RNF10
- **Precondiciones:** existe un pedido pagado con un envío asociado.

**Flujo principal**
1. Accede a la sección de envíos y localiza el pedido.
2. Selecciona el nuevo estado: pendiente, en preparación, en camino o entregado.
3. El sistema registra el cambio con su fecha y el usuario que lo realizó.
4. Dispara la notificación al cliente (UC17).

**Flujos alternativos**
- *2a.* Retroceso de estado, por ejemplo de «entregado» a «en camino»: pide confirmación y deja constancia del motivo.

**Postcondiciones:** el envío queda en el nuevo estado, el cliente fue notificado y la acción está registrada en el log de auditoría.

#### UC25 — Gestionar una solicitud de devolución

- **Actor principal:** Administrador · **Secundarios:** Cliente · **Requerimientos:** RF41, RF42; RNF10
- **Precondiciones:** existe una solicitud de devolución en estado «solicitada» (UC13).

**Flujo principal**
1. Abre la solicitud y revisa el pedido, los ítems y el motivo declarado.
2. La aprueba o la rechaza.
3. Si la aprueba, la solicitud pasa a «aprobada» y, **al recibir la mercadería**, el sistema reingresa al stock los ítems devueltos.
4. Al confirmarse el reintegro del importe, la devolución pasa a «reembolsada».
5. El sistema notifica al cliente en cada cambio de estado.

**Flujos alternativos**
- *2a.* Rechazo: la devolución pasa a «rechazada» con su motivo y el stock no se modifica.
- *3a.* Devolución parcial: solo se reingresan los ítems efectivamente devueltos.

**Postcondiciones:** la devolución queda en un estado final y el stock refleja el reingreso cuando corresponde.

#### UC26 — Consultar reportes de ventas y stock

- **Actor principal:** Administrador · **Requerimientos:** RF47
- **Precondiciones:** el administrador tiene la sesión iniciada con su rol.

**Flujo principal**
1. Accede a la sección de reportes.
2. Selecciona el período a analizar.
3. El sistema muestra las ventas del período, los productos más vendidos y el stock actual, señalando los productos por debajo del mínimo definido.

**Flujos alternativos**
- *3a.* No hay operaciones en el período seleccionado: informa que no hay datos para mostrar.

**Postcondiciones:** ninguna.

### 5.4 Procesos automáticos del sistema

#### UC27 — Descontar stock al vender

- **Actor principal:** Sistema (incluido en UC11) · **Requerimientos:** RF19, RF20, RF23; RNF16
- **Precondiciones:** un pedido pasó al estado «pagado».

**Flujo principal**
1. Recorre los ítems del pedido.
2. Por cada producto descuenta la cantidad vendida.
3. Por cada kit descuenta la cantidad correspondiente de cada uno de sus componentes.
4. Ejecuta todos los descuentos **dentro de una única transacción con control de concurrencia**.
5. Registra el movimiento de stock resultante.

**Flujos alternativos**
- *2a.* Un producto queda en cero: deja de ofrecerse y se deshabilitan los kits que lo integran (UC29).
- *4a.* Una venta simultánea dejó un ítem sin stock suficiente: **la transacción se revierte por completo**, el pedido se marca para revisión manual y se notifica al administrador.

**Postcondiciones:** el stock refleja la venta sin que se produzca sobreventa, o bien no se modificó nada.

#### UC28 — Aplicar el descuento de oferta en el carrito

- **Actor principal:** Sistema (incluido en UC04 y UC10) · **Requerimientos:** RF25, RF26, RF27
- **Precondiciones:** el carrito tiene al menos un ítem.

**Flujo principal**
1. Por cada ítem busca las ofertas vigentes que lo alcanzan: por producto, por categoría o por kit.
2. Determina cuál corresponde aplicar.
3. Calcula el precio con descuento.
4. Muestra en el carrito el precio original, el descuento aplicado y el subtotal resultante.

**Flujos alternativos**
- *1a.* No hay ofertas vigentes: se toma el precio de lista.
- *1b.* La oferta vence mientras el ítem está en el carrito: recalcula y avisa antes de confirmar la compra.
- *2a.* Concurren varias ofertas sobre el mismo ítem: **se aplica una sola**, según la regla definida por el administrador (UC23).

**Postcondiciones:** el carrito muestra los precios vigentes al momento de la consulta. El precio definitivo se congela al generar el pedido (UC10).

#### UC29 — Validar la disponibilidad de un combo antes de vender

- **Actor principal:** Sistema (incluido en UC10 y UC22) · **Requerimientos:** RF20, RF22
- **Precondiciones:** existe al menos un kit publicado.

**Flujo principal**
1. Identifica los componentes del kit y las cantidades requeridas.
2. Verifica el stock disponible de cada componente.
3. Si todos alcanzan, marca el kit como disponible.
4. Si alguno no alcanza, lo marca como no disponible y lo excluye del catálogo y de las recomendaciones del asistente (UC03).

**Flujos alternativos**
- *2a.* El kit se solicita en más de una unidad: se valida el stock **por la cantidad total requerida**.
- *4a.* La validación se ejecuta durante el checkout: impide confirmar el pedido e informa qué componente falta.

**Postcondiciones:** la disponibilidad publicada del kit se corresponde con el stock real de sus componentes.

#### UC30 — Vincular una cuenta OAuth con una cuenta local existente

- **Actor principal:** Sistema (incluido en UC07) · **Secundarios:** Proveedor de OAuth (Google) · **Requerimientos:** RF08
- **Precondiciones:** el proveedor devolvió una dirección de correo verificada que ya corresponde a un usuario del sistema.

**Flujo principal**
1. Recibe del proveedor la dirección de correo verificada del usuario.
2. Busca un usuario existente con esa dirección.
3. Registra el identificador del proveedor como un método de acceso adicional del mismo usuario.
4. El usuario conserva un único perfil, un único historial de pedidos y un único conjunto de direcciones de envío.

**Flujos alternativos**
- *1a.* La dirección devuelta no está verificada: **no realiza la vinculación**.
- *2a.* No existe un usuario con esa dirección: crea uno nuevo, sin contraseña local, y el caso de uso finaliza.

**Postcondiciones:** un único usuario queda asociado a los dos métodos de autenticación; no se generan cuentas duplicadas.

---

## 6. Matriz de trazabilidad RF → UC

| RF | Casos de uso |
|---|---|
| RF01 | UC01, UC04 |
| RF02 | UC07 |
| RF03 | UC05 |
| RF04 | UC06 |
| RF05 | UC05, UC09 |
| RF06 | UC08 |
| RF07 | UC15 |
| RF08 | UC07, UC30 |
| RF09 | UC06, UC07, UC09, UC10 |
| RF10 | UC06, UC19–UC26 |
| RF11 | UC10, UC14 |
| RF12 | UC18 |
| RF13, RF14, RF15 | UC19 |
| RF16 | UC01, UC20 |
| RF17 | UC02, UC20 |
| RF18 | UC21 |
| RF19 | UC21, UC27 |
| RF20 | UC01, UC04, UC10, UC19, UC27, UC29 |
| RF21 | UC22 |
| RF22 | UC03, UC22, UC29 |
| RF23 | UC22, UC27 |
| RF24 | UC22 |
| RF25 | UC23, UC28 |
| RF26 | UC04, UC23, UC28 |
| RF27 | UC23, UC28 |
| RF28 | UC04 |
| RF29, RF30 | UC10 |
| RF31, RF32, RF33 | UC11 |
| RF34, RF35 | UC24 |
| RF36 | UC17 |
| RF37 | UC11, UC16 |
| RF38 | UC16 |
| RF39 | UC12 |
| RF40 | UC13 |
| RF41 | UC25 |
| RF42 | UC13, UC25 |
| RF43, RF44, RF45 | UC03 |
| RF46 | UC19–UC26 |
| RF47 | UC26 |
| RF48 | UC03 |
