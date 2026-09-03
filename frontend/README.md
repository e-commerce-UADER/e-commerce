# Aventura 360 — Frontend

SPA en React con Vite. Interfaz responsive (RNF01) para visitante, cliente y administrador.

## Estructura

```
src/
├── app/            Providers, router y bootstrap
├── features/       Un directorio por dominio, con components/, hooks/ y api/ propios
│   ├── auth/       Login local, registro, Google, verificación y reset
│   ├── catalog/    Listado, filtros y ficha de producto
│   ├── cart/       Carrito anónimo y de usuario
│   ├── checkout/   Dirección, resumen y redirección a Mercado Pago
│   ├── orders/     Historial y detalle de pedidos
│   ├── returns/    Solicitud de devolución
│   ├── profile/    Datos personales, direcciones y seguridad
│   ├── assistant/  Ventana de chat de recomendación
│   └── admin/      Panel: productos, categorías, stock, kits, ofertas, envíos, devoluciones, reportes
├── components/     ui/ (primitivas) y common/ (compartidos con lógica)
├── layouts/        PublicLayout, AccountLayout, AdminLayout
├── pages/          Páginas enrutadas que componen features
├── services/       Cliente HTTP por recurso de la API
├── store/          Estado global: sesión, carrito, UI
├── hooks/          Hooks reutilizables entre features
├── lib/            axios, react-query y configuración de librerías
├── styles/         Estilos globales y tokens de marca
├── types/          Tipos compartidos con la API
└── utils/          Formateo de precios y fechas, helpers de formularios
```

Regla: un componente usado por una sola feature vive dentro de esa feature. Solo sube a `components/` cuando lo consume más de una.

## Puesta en marcha

```bash
npm install
cp .env.example .env
npm run dev
```
