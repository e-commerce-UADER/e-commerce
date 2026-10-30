# Aventura 360 — Backend

API REST en Express sobre Node.js, con PostgreSQL y Prisma como ORM.

## Estructura

```
src/
├── config/            Variables de entorno, CORS, rate limiting, logger
├── modules/           Un módulo por área funcional del documento de requerimientos
│   ├── auth/          RF02-RF09, RF12 · UC05-UC09, UC15, UC18, UC30
│   ├── users/         RF10, RF11 · UC14 (perfil y direcciones)
│   ├── catalog/       RF13-RF20 · UC01, UC02, UC19, UC20, UC21
│   ├── kits/          RF21-RF24 · UC22, UC29
│   ├── offers/        RF25-RF27 · UC23, UC28
│   ├── cart/          RF01, RF28-RF30 · UC04 (carrito anónimo y fusión)
│   ├── orders/        RF39 · UC10, UC12, UC27
│   ├── payments/      RF31-RF33 · UC11 (preferencia + webhook)
│   ├── shipping/      RF34-RF36 · UC24, UC17
│   ├── returns/       RF40-RF42 · UC13, UC25
│   ├── assistant/     RF43-RF45 · UC03
│   ├── admin/         RF46, RF47 · UC26 y agregación del panel
│   └── contact/       RF48
├── shared/            Middlewares, errores, validadores y utilidades transversales
├── infrastructure/    Adaptadores a servicios externos (DB, mail, MP, OAuth, storage)
└── jobs/              Tareas programadas (vencimiento de ofertas y tokens, respaldo)
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
