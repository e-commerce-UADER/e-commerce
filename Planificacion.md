# Aventura 360 — Planificación

Plan de **17 sprints de una semana** (≈ 4 meses), del **lunes 12 de octubre de 2026 al viernes 5 de febrero de 2027**, construido sobre [ToDo.md](ToDo.md). Cada sprint nombra las fases y casos de uso del ToDo que cubre; el detalle y los criterios de aceptación viven allá.

## Criterio

- **Primero todo lo `P1`**, en orden de dependencias: base → modelo → cuentas → catálogo → kits → carrito → checkout → pago → historial y envíos. El objetivo es tener una compra completa de punta a punta lo antes posible y el MVP cerrado antes de enero.
- **Después lo `P2`**, agrupado por dominio para no reabrir módulos más de una vez.
- **Lo `P3` y la estabilización al final**, con el último sprint como colchón.
- Las semanas con feriados o fiestas llevan **menos carga** y se usan para cerrar lo pendiente.
- Cada sprint termina con algo **demostrable** en la columna «Demo».
- **Cada pantalla se entrega responsive** (RNF01) en el mismo sprint en que se construye: escritorio a partir de los mockups y adaptación a tableta y móvil.

## Hitos

| Hito | Al cerrar | Qué se puede mostrar |
|---|---|---|
| **H1** | Sprint 2 | Proyecto levantando en local, modelo de datos migrado y semilla cargada |
| **H2** | Sprint 6 | Catálogo navegable con búsqueda y filtros; el administrador carga productos |
| **H3** | Sprint 10 | Compra completa: carrito → checkout → Mercado Pago (sandbox) → pedido pagado y stock descontado |
| **H4** | Sprint 12 | **MVP: todos los `P1` terminados** |
| **H5** | Sprint 16 | Todos los `P2` terminados |
| **H6** | Sprint 17 | `P3`, estabilización y entrega |

## Calendario

| Sprint | Semana | Foco | Prioridad | Hito |
|---|---|---|---|---|
| 1 | 12 – 16 oct | Base del proyecto y gestiones externas | P1 | |
| 2 | 19 – 23 oct | Modelo de datos y componentes base | P1 | H1 |
| 3 | 26 – 30 oct | Cuentas locales y roles | P1 | |
| 4 | 2 – 6 nov | Ingreso con Google | P1 | |
| 5 | 9 – 13 nov | Panel de catálogo | P1 | |
| 6 | 16 – 20 nov | Tienda: portada, catálogo, ficha y búsqueda | P1 | H2 |
| 7 | 23 – 27 nov | Kits y disponibilidad | P1 | |
| 8 | 30 nov – 4 dic | Carrito anónimo y fusión | P1 | |
| 9 | 7 – 11 dic | Checkout y pedido | P1 | |
| 10 | 14 – 18 dic | Mercado Pago y descuento de stock | P1 | H3 |
| 11 | 21 – 25 dic | Confirmación de venta e historial | P1 | |
| 12 | 28 dic – 1 ene | Envíos, contacto, legales y cierre del MVP | P1 | H4 |
| 13 | 4 – 8 ene | Ofertas y compras a proveedores | P2 | |
| 14 | 11 – 15 ene | Cuentas P2: vinculación, perfil y contraseña | P2 | |
| 15 | 18 – 22 ene | Devoluciones, comprobante y aviso de envío | P2 | |
| 16 | 25 – 29 ene | Asistente, auditoría y respaldo | P2 | H5 |
| 17 | 1 – 5 feb | Reportes, P3, pruebas en navegadores y entrega | P3 | H6 |

**Semanas con menos días:** sprint 1 (lunes 12 de octubre feriado), sprint 7 (posible traslado del feriado del 20 de noviembre al lunes 23), sprint 9 (martes 8 de diciembre), sprint 11 (viernes 25 de diciembre) y sprint 12 (viernes 1 de enero). Los sprints 11 y 12 caen en fiestas y llevan la mitad de carga.

---

## Sprints

### Sprint 1 — Base del proyecto · 12 al 16 oct

**Objetivo:** que los dos puedan clonar, instalar y levantar backend y frontend en local.

- Fase 0, backend: proyecto Express, configuración por entorno, errores centralizados, validación con Zod, registro de eventos, CORS y cabeceras, cliente de Prisma, plantilla de módulo, Jest + Supertest
- Fase 0, frontend: React + Vite, ESLint, router con `PublicLayout`, `AccountLayout`, `AdminLayout`, cliente HTTP, React Query
- Fase 0, repositorio: flujo de ramas y protección de `main`
- **Gestiones externas** (tardan días y bloquean sprints posteriores):
  - Credenciales de prueba de Mercado Pago y usuarios de prueba comprador/vendedor
  - Proyecto en Google Cloud con el cliente OAuth y la pantalla de consentimiento
  - Servicio de correo para desarrollo (por ejemplo Mailtrap)

**Demo:** `npm run dev` en los dos proyectos y una ruta de salud respondiendo.

### Sprint 2 — Modelo de datos y componentes base · 19 al 23 oct

**Objetivo:** el esquema completo de Prisma, incluidas las entidades `P2`, para no migrar a ciegas más adelante.

- Fase 1 completa: todos los modelos, estados, índices, primera migración
- Semilla: categorías mínimas (carpas, mochilas y accesorios), un administrador y productos de ejemplo
- Fase 0, frontend: variables de diseño en los dos temas, selector de tema, componente `Icono`, componentes base de `components/ui/`, todos responsive
- Integración continua en GitHub Actions (`P2`, pero conviene tenerla desde el inicio)

**Demo:** `prisma migrate reset` deja la base con datos de ejemplo; página de muestra con todos los componentes base en tema claro y oscuro.

### Sprint 3 — Cuentas locales y roles · 26 al 30 oct

- UC05 Registro con correo y contraseña: política mínima de contraseñas, cuenta habilitada al crearse
- UC06 Inicio de sesión: mensaje genérico, sin revelar si el correo existe
- UC16 Cerrar sesión
- Middleware de autorización por rol y guardas de ruta en el frontend
- Pantalla `ingreso`

**Demo:** registrarse, entrar, ver el panel solo con rol de administrador y salir.

### Sprint 4 — Ingreso con Google · 2 al 6 nov

- UC07 Ingreso con Google: `state`, rechazo sin correo verificado, cancelación, alta sin contraseña
- Pruebas de las reglas de RNF05 y RNF07
- Adaptador de correo en `infrastructure/mail/`, pendiente de la Fase 0
- **Carga liviana:** la semana se usa también para cerrar lo pendiente de los sprints 1 a 3

**Demo:** entrar con una cuenta de Google y llegar a «Mi cuenta» con la sesión iniciada; sin correo verificado, el acceso se rechaza.

### Sprint 5 — Panel de catálogo · 9 al 13 nov

- UC17 Productos: alta, modificación, baja lógica, SKU único
- Carga de imágenes con orden y portada
- UC18 Categorías: alta, renombre y baja, con reasignación de productos
- Navegación del panel (RF44)

**Demo:** el administrador crea una categoría y carga en ella un producto con imágenes.

### Sprint 6 — Tienda · 16 al 20 nov

- Portada (propuesta E)
- UC01 Navegar el catálogo y ficha de producto, con estado «no disponible» sin stock
- UC02 Búsqueda con filtros combinados, en la URL, con paginación del servidor
- Secciones propias de Kits y Ofertas (vacías hasta los sprints 7 y 13)

**Demo:** un visitante sin sesión busca «carpa», filtra por marca y precio y abre la ficha.

### Sprint 7 — Kits · 23 al 27 nov

- UC20 Armar un kit, con precio propio o descuento (RF22 es `P2`, pero va acá porque es parte del mismo formulario)
- UC27 Disponibilidad del kit por cantidad total, como función reutilizable
- Kits en el catálogo, excluyendo los no disponibles

**Demo:** un kit desaparece del catálogo al dejar sin stock uno de sus componentes.

### Sprint 8 — Carrito · 30 nov al 4 dic

- UC04 Carrito anónimo con cookie `httpOnly`: agregar, quitar, cambiar cantidades, ajuste al stock máximo, kits validados
- Cálculo de subtotal, envío y total provisorio (sin ofertas todavía)
- Fusión del carrito anónimo al ingresar con correo o con Google
- Ícono del carrito en la barra

**Demo:** armar un carrito sin sesión, entrar y encontrar los ítems sumados a los de la cuenta.

### Sprint 9 — Checkout · 7 al 11 dic

- Costo de envío fijo, editable desde el panel (RF32)
- UC08 Confirmar la compra: sesión exigida solo acá, revalidación de stock y kits, dirección de envío, resumen, pedido en `PENDIENTE_PAGO` con precios congelados
- Carga mínima de una dirección dentro del checkout (la gestión completa de direcciones es `P2`, en el sprint 14)
- Prueba de precios congelados

**Demo:** confirmar un carrito y ver el pedido creado con los precios del momento.

### Sprint 10 — Mercado Pago · 14 al 18 dic

- **Despliegue de prueba con HTTPS** (o un túnel) para que Mercado Pago pueda llamar al webhook
- UC09 Preferencia de pago, páginas de resultado, webhook con firma validada, consulta del estado real, idempotencia
- UC25 Descuento de stock en una transacción con control de concurrencia, reversión total y `REVISION_MANUAL`
- Pruebas: webhook inválido, webhook repetido, dos pagos sobre la última unidad

**Demo (H3):** compra completa con una tarjeta de prueba del sandbox y stock descontado.

### Sprint 11 — Confirmación e historial · 21 al 25 dic · media carga

- UC14 Correo de confirmación de venta con reintento
- UC10 Mis pedidos: lista y detalle, con la píldora de estado
- Aviso en el panel de pedidos en revisión manual

**Demo:** el cliente recibe el correo y ve el pedido pagado en su historial.

### Sprint 12 — Cierre del MVP · 28 dic al 1 ene · media carga

- UC22 Estado del envío (simulado), con confirmación al retroceder y registro de quién lo cambió
- RF46 Número de contacto en el pie
- RNF17 y RNF08: Términos y Condiciones, Política de Devoluciones y Política de Privacidad
- Repaso de las pruebas `P1` de la sección «Pruebas mínimas» del ToDo

**Demo (H4):** recorrido completo del MVP, desde la portada hasta el pedido entregado.

### Sprint 13 — Ofertas y compras · 4 al 8 ene

- UC21 Crear ofertas por producto, categoría o kit
- UC26 Aplicar una sola oferta por ítem, la de mayor porcentaje, en catálogo, carrito y pedido; aviso si vence con el ítem en el carrito
- RF25 Vigencia por fecha (`P3`, pero sale casi sola si la consulta ya filtra por fecha)
- UC19 Registrar compra a proveedor

**Demo:** una oferta programada para mañana no aparece hoy; al registrar una compra, un kit vuelve a estar disponible.

### Sprint 14 — Cuentas P2 · 11 al 15 ene

- UC28 Vincular Google con una cuenta local
- UC13 Cambiar la contraseña
- UC12 Mis datos y direcciones completas

**Demo:** una cuenta local y otra de Google con el mismo correo terminan siendo un solo usuario con un solo historial.

### Sprint 15 — Devoluciones y comprobante · 18 al 22 ene

- UC11 Solicitar una devolución, sin tocar el stock
- UC23 Aprobar, rechazar, registrar recepción parcial y marcar como reembolsada
- RF35 Comprobante de la operación en el historial y en el correo
- UC15 Aviso por correo del cambio de estado del envío

**Demo:** devolución parcial de un pedido: solo vuelve al stock lo recibido.

### Sprint 16 — Asistente y auditoría · 25 al 29 ene

- UC03 Asistente por criterios de ID, SKU, marca, categoría, estado y ocasión, con derivación al contacto
- RNF10 Registro de auditoría en stock, precio, envíos y devoluciones, más su visor en el panel
- RNF18 Respaldo periódico con restauración probada
- RNF13 Revisión de diseño de extensibilidad
- RNF12 Acuerdo de disponibilidad con el proveedor de hosting

**Demo (H5):** pedirle al asistente «carpa para 4 personas» y ver las recomendaciones; ver en la auditoría quién cambió un precio.

### Sprint 17 — Entrega · 1 al 5 feb

- `P3`: UC24 Reportes de ventas y stock, y kits en el asistente (RF42)
- RNF01 y RNF15 Prueba manual en Chrome, Firefox, Safari y Edge, en escritorio, tableta y móvil
- Despliegue final sobre HTTPS
- Actualizar `trazabilidad.md` y los README
- **Colchón:** lo que haya quedado pendiente de sprints anteriores tiene prioridad sobre los `P3`

**Demo (H6):** presentación final.

---

## Forma de trabajo

- **Lunes:** planificación del sprint. Se pasan al sprint las tareas del ToDo y se reparten entre los dos.
- **Viernes:** demo de lo terminado y retrospectiva corta. Lo que no se terminó vuelve al ToDo con su prioridad, y se decide si entra al sprint siguiente.
- **Terminado** significa que cumple los criterios de aceptación del ToDo, tiene sus pruebas, está en `developer` por PR y se tildó en el ToDo.
- Si un sprint se atrasa, se recortan primero los `P3`, después los `P2` del final. **Los `P1` no se recortan.**

## Riesgos

| Riesgo | Sprint | Mitigación |
|---|---|---|
| Credenciales de Mercado Pago o Google sin habilitar a tiempo | 4, 10 | Pedirlas en el sprint 1 |
| El webhook no llega en local | 10 | Despliegue de prueba o túnel listo antes de empezar el sprint |
| Concurrencia en el descuento de stock | 10 | Prueba automatizada de dos pagos simultáneos como criterio de terminado |
| Fiestas de fin de año | 11, 12 | Media carga planificada; el MVP cierra con la entrega de esos dos sprints |
| Los mockups solo cubren escritorio y RNF01 exige móvil y tableta | Todos | Adaptar cada pantalla en su sprint, sin dejarlo para el final |
| Fechas de entrega de la cátedra que no coincidan con los hitos | — | Cargarlas en esta tabla de hitos apenas se conozcan |
