# Iconografía

Set redibujado a partir de la franja inferior del logo de Aventura 360, donde aparecen
carpa, mochila, farol y bastones. Esos cuatro son los íconos de categoría (RF16); el
resto completa la interfaz manteniendo la misma construcción.

## Construcción

- Lienzo `24 × 24`, trazo `1.75`, sin relleno (`fill="none"`).
- `stroke="currentColor"`: el color lo pone el contexto, nunca el SVG.
- `stroke-linecap="round"`, `stroke-linejoin="round"`.
- Geometría angulosa, sin curvas blandas: acompaña la condensada del wordmark.

## Uso

```jsx
import { ReactComponent as IconCarpa } from '@/assets/icons/carpa.svg';
<IconCarpa aria-hidden="true" width={20} />
```

Un ícono decorativo lleva `aria-hidden="true"`. Un ícono que es el único contenido de
un control lleva `role="img"` y `<title>`.
