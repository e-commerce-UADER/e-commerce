# Trazabilidad — requerimientos y casos de uso → código

Mapa de dónde vive cada área funcional del documento v1.0. Actualizar cuando se agregue un módulo o una feature.

| Área | RF | UC | Backend | Frontend |
|---|---|---|---|---|
| Autenticación y cuentas | RF02–RF09, RF12 | UC05–UC09, UC15, UC18, UC30 | `modules/auth/` | `features/auth/` |
| Perfil y direcciones | RF10, RF11 | UC14 | `modules/users/` | `features/profile/` |
| Catálogo, categorías y stock | RF13–RF20 | UC01, UC02, UC19–UC21 | `modules/catalog/` | `features/catalog/`, `features/admin/` |
| Kits y combos | RF21–RF24 | UC22, UC29 | `modules/kits/` | `features/catalog/`, `features/admin/` |
| Ofertas | RF25–RF27 | UC23, UC28 | `modules/offers/` | `features/admin/` |
| Carrito | RF01, RF28–RF30 | UC04 | `modules/cart/` | `features/cart/` |
| Checkout y pedidos | RF29, RF30, RF39 | UC10, UC12, UC27 | `modules/orders/` | `features/checkout/`, `features/orders/` |
| Pagos | RF31–RF33 | UC11 | `modules/payments/` | `features/checkout/` |
| Envíos | RF34–RF36 | UC17, UC24 | `modules/shipping/` | `features/admin/`, `features/orders/` |
| Comprobantes y notificaciones | RF37, RF38 | UC16 | `modules/orders/`, `infrastructure/mail/` | `features/orders/` |
| Devoluciones | RF40–RF42 | UC13, UC25 | `modules/returns/` | `features/returns/`, `features/admin/` |
| Asistente | RF43–RF45 | UC03 | `modules/assistant/` | `features/assistant/` |
| Panel y reportes | RF46, RF47 | UC26 | `modules/admin/` | `features/admin/` |
| Contacto | RF48 | — | `modules/contact/` | `components/common/` |

## Procesos automáticos

Los cuatro procesos del apartado 6.4 no tienen módulo propio: viven dentro del service del caso de uso que los incluye.

| UC | Proceso | Dónde |
|---|---|---|
| UC27 | Descontar stock al vender | `modules/orders/` — transacción disparada por el pago aprobado |
| UC28 | Aplicar descuento de oferta en el carrito | `modules/offers/` — invocado desde `cart` y `orders` |
| UC29 | Validar disponibilidad de combo | `modules/kits/` — invocado desde `cart`, `orders` y `assistant` |
| UC30 | Vincular cuenta OAuth con cuenta local | `modules/auth/` — dentro del callback de Google |

## Wireframes

Pantallas de [diseno/wireframes.html](diseno/wireframes.html) y el código que las implementa.

| # | Pantalla | UC | Frontend |
|---|---|---|---|
| 01 | Catálogo con filtros | UC01, UC02 | `features/catalog/` |
| 02 | Ficha de producto | UC01, UC04 | `features/catalog/` |
| 03 | Carrito | UC04, UC28, UC29 | `features/cart/` |
| 04 | Checkout y pago | UC10, UC11 | `features/checkout/` |
| 05 | Ingreso y registro | UC05, UC06, UC07, UC30 | `features/auth/` |
| 06 | Mis pedidos | UC12, UC13, UC17 | `features/orders/`, `features/returns/` |
| 07 | Panel · productos y stock | UC19, UC21, UC26 | `features/admin/` |
| 08 | Panel · envíos y devoluciones | UC24, UC25 | `features/admin/` |
| 09 | Asistente y vista móvil | UC03 | `features/assistant/` |
| 10 | Flujo de compra | UC04 → UC16 | — (recorrido, no pantalla) |

Pantallas que el documento pide y todavía no tienen wireframe: verificación de correo (UC09), recuperación de contraseña (UC08), perfil y direcciones (UC14), cambio de contraseña (UC15), armado de kits (UC22) y alta de ofertas (UC23).

## Requerimientos no funcionales transversales

| RNF | Dónde se materializa |
|---|---|
| RNF01, RNF02 (usabilidad, responsive) | `frontend/src/styles/`, layouts |
| RNF03, RNF04 (HTTPS, tokens OAuth) | `config/`, `infrastructure/oauth/` |
| RNF05–RNF07 (hash, rate limit, tokens) | `modules/auth/`, `shared/middlewares/` |
| RNF09 (no almacenar tarjetas) | `infrastructure/mercadopago/` |
| RNF10 (log de auditoría) | `shared/middlewares/auditLog` |
| RNF11 (rendimiento de búsqueda) | índices en `prisma/schema.prisma`, `modules/catalog/` |
| RNF16 (concurrencia, sin sobreventa) | `infrastructure/database/` — transacciones |
| RNF17 (términos y política de devoluciones) | `frontend/src/pages/` |
| RNF18 (respaldo periódico) | `backend/src/jobs/` |
