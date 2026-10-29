# Sprint 1 — Base del proyecto · 12 al 16 oct

**Objetivo:** que los dos puedan clonar, instalar y levantar backend y frontend en local.

## Hecho

Fase 0, backend (rama `feat/backend-base`). No implementa RF ni UC: es la base que usan todos. Cubre los RNF indicados.

- **Proyecto Node + Express 5** (`backend/`): ESM, scripts `dev`, `start`, `test` y `lint`.
- **Configuración por entorno** en `src/config/env.js`: valida el `.env` con Zod al arrancar y, si falta una variable obligatoria, no levanta y dice cuál.
- **Manejo centralizado de errores** en `src/shared/errors/`: respuestas `{ error: { codigo, mensaje, detalles? } }`, sin traza fuera de desarrollo.
- **Validación con Zod** (`src/shared/middlewares/validar.js`), con mensajes en español y sin devolver los valores recibidos.
- **Registro de eventos** con pino (`src/config/logger.js`): oculta contraseñas, tokens y datos de tarjeta, incluidos los que viajan en la query string; no escribe cabeceras ni cuerpos. Cubre RNF05 y RNF09.
- **Seguridad HTTP:** CORS limitado a `WEB_URL`, helmet y redirección a HTTPS en producción, siempre hacia el host de `API_URL`. Cubre RNF03.
- **Cliente único de Prisma 7** en `src/infrastructure/database/prisma.js`, con el adaptador de PostgreSQL.
- **Plantilla de módulo** en `src/modules/_plantilla/`: los cinco archivos de un recurso `ejemplo`, con sus pruebas.
- **Pruebas:** Jest + Supertest contra una base separada, `aventura360_test`, que se levanta con `docker compose up -d`. Las pruebas se niegan a correr contra una base cuyo nombre no termine en `_test`.
- **Ruta de salud:** `GET /api/salud`.

## Pendiente

- `P1` Fase 0, frontend: React + Vite, ESLint, router con los tres layouts, cliente HTTP y React Query.
- `P1` Fase 0, repositorio: protección de `main`.
- `P1` Adaptador de correo en `src/infrastructure/mail/`. Está en el ToDo de la Fase 0, pero el plan no lo pone en el sprint 1.
- Gestiones externas: credenciales de prueba de Mercado Pago, proyecto de Google Cloud con OAuth y servicio de correo para desarrollo.

## Decisiones y desvíos

- **Atraso:** el sprint se trabajó el 29 de octubre, durante la semana del sprint 3, como trabajo pendiente.
- **Prisma 7.10.1 fijo**, no la 8: el tag `latest` de `prisma` en npm apunta a una versión candidata, la 8.0.0-rc. La 7 exige un adaptador de base de datos (`@prisma/adapter-pg`) y la URL va en `prisma.config.js`, no en el esquema.
- **Sin dotenv ni nodemon:** se usan `--env-file` y `--watch`, que Node 22 ya trae.
- **PostgreSQL en Docker, puerto 5433**, para no chocar con un PostgreSQL instalado en la máquina.
- **Variables obligatorias:** por ahora solo las que se usan (`API_URL`, `WEB_URL` y `DATABASE_URL`). Cada sprint suma las suyas: JWT, Google, Mercado Pago y correo.
- **Gestión del trabajo:** se creó el tablero Kanban del equipo en GitHub Projects con todas las tareas del ToDo. El plan de sprints se subió en el PR #8.

## Demo

```bash
cd backend
npm install
cp .env.example .env
docker compose up -d
npm test           # 25 pruebas
npm run dev        # GET http://localhost:3000/api/salud -> {"estado":"ok"}
```

Para ver el registro de eventos sin secretos: `GET /api/salud?token=abc` aparece en la consola como `?token=%5BOculto%5D`.
