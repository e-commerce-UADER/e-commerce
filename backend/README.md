# Aventura 360 — Backend

API REST en Express sobre Node.js, con PostgreSQL y Prisma como ORM.

## Estructura

```
src/
├── config/            Variables de entorno, CORS, logger
├── modules/           Un módulo por área funcional del documento de requerimientos
│   ├── auth/          RF02-RF07, RF10 · UC05-UC07, UC13, UC16, UC28
│   ├── users/         RF08, RF09 · UC12 (perfil y direcciones)
│   ├── catalog/       RF11-RF18 · UC01, UC02, UC17, UC18, UC19
│   ├── kits/          RF19-RF22 · UC20, UC27
│   ├── offers/        RF23-RF25 · UC21, UC26
│   ├── cart/          RF01, RF26-RF28 · UC04 (carrito anónimo y fusión)
│   ├── orders/        RF37 · UC08, UC10, UC25
│   ├── payments/      RF29-RF31 · UC09 (preferencia + webhook)
│   ├── shipping/      RF32-RF34 · UC22, UC15 (estado y costo fijo de envío)
│   ├── returns/       RF38-RF40 · UC11, UC23
│   ├── assistant/     RF41-RF43 · UC03
│   ├── admin/         RF44, RF45 · UC24 y agregación del panel
│   └── contact/       RF46
├── shared/            Middlewares, errores, validadores y utilidades transversales
├── infrastructure/    Adaptadores a servicios externos (DB, mail, MP, OAuth, storage)
└── jobs/              Tareas programadas (vencimiento de ofertas, respaldo)
```

Cada módulo sigue el mismo patrón de cinco archivos:

| Archivo | Responsabilidad |
|---|---|
| `<modulo>.routes.js` | Definición de endpoints y middlewares de la ruta |
| `<modulo>.controller.js` | Lee la request, delega y arma la response. Sin reglas de negocio |
| `<modulo>.service.js` | Reglas de negocio y transacciones. No conoce HTTP |
| `<modulo>.repository.js` | Único punto de acceso a Prisma |
| `<modulo>.schema.js` | Validación de entrada (Zod) |

La carpeta `src/modules/_plantilla/` es el modelo para copiar: un recurso `ejemplo` con los cinco archivos y sus pruebas en `tests/integration/plantilla.test.js`. No se monta en la API.

## Puesta en marcha

Requiere Node 22.12 o superior y Docker.

```bash
npm install
cp .env.example .env      # completar credenciales
docker compose up -d      # PostgreSQL en el puerto 5433, con las bases aventura360 y aventura360_test
npm run dev               # http://localhost:3000/api/salud responde {"estado":"ok"}
```

La API no arranca si falta una variable obligatoria del `.env`: el error dice cuál. Si el puerto 3000 está ocupado, cambia `PORT` y `API_URL` en tu `.env`.

En producción la API redirige a HTTPS todo lo que llega por HTTP (RNF03). Si corre detrás de un proxy o balanceador que termina el TLS, define `TRUST_PROXY` con la cantidad de proxies (normalmente `1`). Si no, la API no ve que la solicitud original era HTTPS y redirige todo.

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Levanta la API y la reinicia al guardar un archivo |
| `npm start` | Levanta la API sin reinicio automático |
| `npm test` | Corre Jest + Supertest. Necesita el contenedor de PostgreSQL levantado |
| `npm run lint` | Análisis estático con ESLint |
| `npm run prisma:generate` | Regenera el cliente de Prisma después de cambiar el esquema |

## Pruebas

Las pruebas leen `.env.test` y usan **solo** la base `aventura360_test`, separada de la de desarrollo. Si `DATABASE_URL` apunta a una base cuyo nombre no termina en `_test`, se niegan a correr.

## Errores y registro

- Toda respuesta de error tiene la forma `{ "error": { "codigo", "mensaje", "detalles"? } }`. Los services lanzan los errores de `src/shared/errors/errores.js`, y el manejador central los traduce a HTTP. La traza solo se devuelve en desarrollo.
- El registro de eventos (`src/config/logger.js`) oculta contraseñas, tokens y datos de tarjeta, y no escribe ni cabeceras ni cuerpos de las solicitudes (RNF05, RNF09).
- Para validar la entrada se usa `validar({ params, query, body })` con los esquemas Zod del módulo. Los mensajes salen en español porque `z` se importa siempre desde `src/shared/validators/zod.js`.
