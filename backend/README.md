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

## Puesta en marcha

```bash
npm install
cp .env.example .env      # completar credenciales
npx prisma migrate dev
npm run dev
```
