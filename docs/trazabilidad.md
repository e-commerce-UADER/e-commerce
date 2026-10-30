# Trazabilidad — requerimientos y casos de uso → código

Mapa de dónde vive cada área funcional de [requisitos-y-casos-de-uso.md](requisitos-y-casos-de-uso.md). Actualizar cuando se agregue un módulo o una feature.

| Área | RF | UC | Backend | Frontend |
|---|---|---|---|---|
| Autenticación y cuentas | RF02–RF07, RF10 | UC05–UC07, UC13, UC16, UC28 | `modules/auth/` | `features/auth/` |
| Perfil y direcciones | RF08, RF09 | UC12 | `modules/users/` | `features/profile/` |
| Catálogo, categorías y stock | RF11–RF18 | UC01, UC02, UC17–UC19 | `modules/catalog/` | `features/catalog/`, `features/admin/` |
| Kits y combos | RF19–RF22 | UC20, UC27 | `modules/kits/` | `features/catalog/`, `features/admin/` |
| Ofertas | RF23–RF25 | UC21, UC26 | `modules/offers/` | `features/admin/` |
| Carrito | RF01, RF26–RF28 | UC04 | `modules/cart/` | `features/cart/` |
| Checkout y pedidos | RF27, RF28, RF37 | UC08, UC10, UC25 | `modules/orders/` | `features/checkout/`, `features/orders/` |
| Pagos | RF29–RF31 | UC09 | `modules/payments/` | `features/checkout/` |
| Envíos y costo de envío fijo | RF32–RF34 | UC15, UC22 | `modules/shipping/` | `features/admin/`, `features/orders/` |
| Comprobantes y notificaciones | RF35, RF36 | UC14 | `modules/orders/`, `infrastructure/mail/` | `features/orders/` |
| Devoluciones | RF38–RF40 | UC11, UC23 | `modules/returns/` | `features/returns/`, `features/admin/` |
| Asistente | RF41–RF43 | UC03 | `modules/assistant/` | `features/assistant/` |
| Panel y reportes | RF44, RF45 | UC24 | `modules/admin/` | `features/admin/` |
| Contacto | RF46 | UC03 | `modules/contact/` | `components/common/` |

## Procesos automáticos

Los cuatro procesos del apartado 5.4 no tienen módulo propio: viven dentro del service del caso de uso que los incluye.

| UC | Proceso | Dónde |
|---|---|---|
| UC25 | Descontar stock al vender | `modules/orders/` — transacción disparada por el pago aprobado |
| UC26 | Aplicar descuento de oferta en el carrito | `modules/offers/` — invocado desde `cart` y `orders` |
| UC27 | Validar disponibilidad de combo | `modules/kits/` — invocado desde `cart`, `orders` y `assistant` |
| UC28 | Vincular cuenta OAuth con cuenta local | `modules/auth/` — dentro del callback de Google |

## Wireframes

Pantallas de [diseno/wireframes.html](diseno/wireframes.html) y el código que las implementa.

| # | Pantalla | UC | Frontend |
|---|---|---|---|
| 01 | Catálogo con filtros | UC01, UC02 | `features/catalog/` |
| 02 | Ficha de producto | UC01, UC04 | `features/catalog/` |
| 03 | Carrito | UC04, UC26, UC27 | `features/cart/` |
| 04 | Checkout y pago | UC08, UC09 | `features/checkout/` |
| 05 | Ingreso y registro | UC05, UC06, UC07, UC28 | `features/auth/` |
| 06 | Mis pedidos | UC10, UC11, UC15 | `features/orders/`, `features/returns/` |
| 07 | Panel · productos y stock | UC17, UC19, UC24 | `features/admin/` |
| 08 | Panel · envíos y devoluciones | UC22, UC23 | `features/admin/` |
| 09 | Asistente y vista móvil | UC03 | `features/assistant/` |
| 10 | Flujo de compra | UC04 → UC14 | — (recorrido, no pantalla) |

Pantallas que el documento pide y todavía no tienen wireframe: perfil y direcciones (UC12), costo de envío fijo (RF32), cambio de contraseña (UC13), armado de kits (UC20) y alta de ofertas (UC21).

## Requerimientos no funcionales transversales

| RNF | Dónde se materializa |
|---|---|
| RNF01, RNF02 (usabilidad, responsive) | `frontend/src/styles/`, layouts |
| RNF03, RNF04 (HTTPS, tokens OAuth) | `config/`, `infrastructure/oauth/` |
| RNF05–RNF07 (hash, política de contraseñas, mensaje genérico) | `modules/auth/`, `shared/middlewares/` |
| RNF09 (no almacenar tarjetas) | `infrastructure/mercadopago/` |
| RNF10 (log de auditoría) | `shared/middlewares/auditLog` |
| RNF11 (rendimiento de búsqueda) | índices en `prisma/schema.prisma`, `modules/catalog/` |
| RNF16 (concurrencia, sin sobreventa) | `infrastructure/database/` — transacciones |
| RNF17 (términos y política de devoluciones) | `frontend/src/pages/` |
| RNF18 (respaldo periódico) | `backend/src/jobs/` |
