# Aventura 360

E-commerce de productos de aventura — trekking, camping y kayak — para **Aventura 360**, emprendimiento radicado en Paraná, Entre Ríos.

Trabajo Integrador de la cátedra **Taller de Integración**, Universidad Autónoma de Entre Ríos (UADER), Facultad de Ciencia y Tecnología — Sede Concepción del Uruguay.

| | |
|---|---|
| **Integrantes** | Julián Agustín Olivera · David Saipert |
| **Cátedra** | Esp. Lic. Julián Escalante · Lic. Daniel Figueroa |
| **Carreras** | Análisis de Sistemas · Licenciatura en Sistemas de Información |
| **Año académico** | 2026 |

## Documentación

| Documento | Contenido |
|---|---|
| [Requerimientos v1.0](docs/Aventura360-Requerimientos-v1.0.pdf) | 48 requerimientos funcionales, 18 no funcionales y 30 casos de uso. Es la fuente de verdad del alcance |
| [Trazabilidad](docs/trazabilidad.md) | Mapa de cada RF y UC al módulo que lo implementa |
| [CLAUDE.md](CLAUDE.md) | Reglas de negocio críticas y convenciones del proyecto |

## Stack

React + Vite en el frontend, Express sobre Node.js en el backend, PostgreSQL como motor de base de datos y Prisma como ORM. Pagos con Mercado Pago y autenticación federada con Google (OAuth 2.0).

## Estructura

```
e-commerce/
├── backend/      API REST por módulos de dominio
├── frontend/     SPA React organizada por features
├── docs/         Requerimientos, trazabilidad y diseño
└── assets/       Logo e identidad de marca
```

Cada proyecto tiene su propio README con el detalle de su estructura y cómo levantarlo.

## Alcance

Catálogo con filtros, gestión de stock por compras a proveedores, kits o combos, ofertas con vigencia, carrito sin sesión iniciada, checkout con Mercado Pago, seguimiento simulado de envíos, historial de pedidos, devoluciones, asistente de recomendación y panel de administración que no requiere modificar código.

Queda fuera de esta versión: aplicación móvil nativa, facturación electrónica ARCA, medios de pago adicionales e integración con operadores logísticos.
