# Aventura 360 — Diagrama de clases (entidades)

Modelo de entidades del dominio, derivado de [requisitos-y-casos-de-uso.md](requisitos-y-casos-de-uso.md).

Criterio: sin separar por responsabilidades, sin normalizar y solo con entidades del negocio. Los atributos compuestos quedan dentro de su clase y no se modelan clases intermedias ni de infraestructura.

---

## Diagrama

![Diagrama de clases de Aventura 360](diagramas/diagrama-de-clases.png)

Imagen lista para el informe: [PNG](diagramas/diagrama-de-clases.png) (2890 × 2826) · [SVG](diagramas/diagrama-de-clases.svg) para imprimir o escalar sin perder nitidez. Se regeneran desde el bloque Mermaid de abajo, que es la fuente.

<details>
<summary>Fuente del diagrama</summary>

```mermaid
classDiagram
    class Usuario {
        id : int
        nombre : string
        apellido : string
        email : string
        telefono : string
        direccion : string
        rol : string
        activo : boolean
        fechaRegistro : Date
    }

    class Producto {
        id : int
        sku : string
        nombre : string
        descripcion : string
        marca : string
        precio : decimal
        stock : int
        garantia : string
        estado : string
        ocasion : string
        dimensiones : string
        imagenes : string
        activo : boolean
    }

    class Categoria {
        id : int
        nombre : string
        descripcion : string
        activa : boolean
    }

    class Kit {
        id : int
        nombre : string
        descripcion : string
        precio : decimal
        descuento : decimal
        imagen : string
        disponible : boolean
        activo : boolean
    }

    class Oferta {
        id : int
        nombre : string
        porcentaje : decimal
        alcance : string
        fechaInicio : Date
        fechaFin : Date
        activa : boolean
    }

    class Carrito {
        id : int
        cantidad : int
        subtotal : decimal
        descuentos : decimal
        total : decimal
        fechaActualizacion : Date
    }

    class Pedido {
        id : int
        numero : string
        fecha : Date
        estado : string
        cantidad : int
        precioUnitario : decimal
        subtotal : decimal
        descuentos : decimal
        costoEnvio : decimal
        total : decimal
        direccionEnvio : string
        pagoIdMercadoPago : string
        pagoEstado : string
        comprobanteNumero : string
    }

    class Envio {
        id : int
        estado : string
        fechaActualizacion : Date
        observaciones : string
    }

    class Devolucion {
        id : int
        fechaSolicitud : Date
        estado : string
        motivo : string
        cantidad : int
        recibido : boolean
        fechaResolucion : Date
        montoReembolso : decimal
    }

    class CompraProveedor {
        id : int
        proveedor : string
        fecha : Date
        comprobante : string
        cantidad : int
        costoUnitario : decimal
        total : decimal
    }

    Usuario "1" --> "0..*" Pedido : realiza
    Usuario "1" --> "0..1" Carrito : posee

    Categoria "1" --> "0..*" Producto : agrupa

    Kit "1" --> "2..*" Producto : se compone de

    Oferta "0..*" --> "0..1" Producto : alcanza
    Oferta "0..*" --> "0..1" Categoria : alcanza
    Oferta "0..*" --> "0..1" Kit : alcanza

    Carrito "0..*" --> "0..*" Producto : contiene
    Carrito "0..*" --> "0..*" Kit : contiene

    Pedido "0..*" --> "1..*" Producto : detalla
    Pedido "0..*" --> "0..*" Kit : detalla

    Pedido "1" --> "0..1" Envio : tiene
    Pedido "1" --> "0..*" Devolucion : origina

    Devolucion "0..*" --> "1..*" Producto : devuelve

    CompraProveedor "0..*" --> "1" Producto : ingresa
```

</details>

---

## Las clases

### Usuario

Un único registro para los dos métodos de acceso (RF06, UC28): el correo verificado unifica la identidad y evita cuentas duplicadas. El `rol` distingue Cliente de Administrador (RF08).

La dirección de envío queda como un atributo del usuario (RF09, UC12). Las credenciales locales no se modelan acá: al implementar, la contraseña se guarda exclusivamente como hash con salt (RNF05).

### Producto

Los atributos que exige RF12 —ID, SKU, nombre, descripción, marca, categoría, precio, garantía, estado, ocasión y dimensiones— más el stock, que gobierna la disponibilidad.

| Atributo | Descripción | Trazabilidad |
|---|---|---|
| `sku` | Código unívoco, validado al alta | RF12, UC17 |
| `stock` | Nunca puede quedar negativo | RF17, RF18 |
| `estado`, `ocasion` | Criterios de filtro y de recomendación | RF15, RF43 |
| `activo` | Baja lógica: conserva el historial | UC17 (6b) |

### Categoría

Carpas, mochilas y accesorios como mínimo (RF14). El nombre no se repite y una categoría con productos asociados no se da de baja sin reasignarlos (UC18).

### Kit

Se asocia directamente a los productos que lo integran; la cantidad de cada componente queda en la relación.

| Regla | Trazabilidad |
|---|---|
| Disponible solo si **todos** los componentes tienen stock, por la cantidad total requerida | RF20, UC27 |
| Al venderse descuenta el stock de cada componente | RF21, UC25 |
| Precio propio, distinto de la suma de sus partes | RF22, UC20 |

### Oferta

Porcentaje con vigencia que se activa y vence sola (RF25). El `alcance` dice a qué apunta —producto, categoría o kit— y solo una de las tres asociaciones queda cargada. Sobre un mismo ítem se aplica una sola oferta, la de mayor porcentaje; un kit toma solo las ofertas dirigidas a él (UC26).

### Carrito

Funciona sin sesión iniciada y se fusiona con el del usuario al ingresar (RF01, UC04, UC06, UC07). Los precios son los vigentes al momento de la consulta, no congelados. Agregar al carrito **no reserva stock**.

### Pedido

Donde los precios se congelan (UC08). El pago y el comprobante no son clases aparte: el identificador y el estado que devuelve Mercado Pago viven como atributos, igual que la dirección copiada al confirmar. `costoEnvio` copia el costo fijo vigente al generarse el pedido (RF32).

| Estado | Cuándo | Trazabilidad |
|---|---|---|
| `pendiente_de_pago` | Generado en el checkout | UC08 |
| `pagado` | El webhook validó y la API confirmó | RF30, UC09 |
| `pago_rechazado` | Sin descuento de stock | UC09 (3a) |
| `en_revision` | La transacción de stock se revirtió | UC25 (4a) |

No se almacenan datos de tarjeta (RNF09): solo el identificador de Mercado Pago.

### Envío

Simulado: el administrador mueve el estado a mano y cada cambio notifica al cliente (RF33, UC15, UC22).

`pendiente → en preparación → en camino → entregado`

### Devolución

La solicitud no toca el stock (UC11). El reingreso ocurre cuando el administrador aprueba y se recibe la mercadería; `recibido` habilita ese reingreso y permite la devolución parcial (UC23).

Cuelga del pedido, no del usuario: toda devolución nace de una compra, así que quién la solicitó se sabe siguiendo `Pedido → Usuario`. Una relación directa desde `Usuario` sería el mismo dato por dos caminos.

`solicitada → aprobada | rechazada → reembolsada`

### CompraProveedor

La vía por la que entra stock (RF16, UC19). Cantidades nulas o negativas se rechazan.

---

## Qué quedó afuera

| No modelado | Por qué |
|---|---|
| `CuentaOAuth`, `Sesion` | Mecanismos de autenticación; la identidad unificada se resuelve en `Usuario` |
| Costo de envío fijo | Un parámetro que el administrador edita desde el panel (RF32), no una entidad del dominio; cada pedido guarda su copia en `costoEnvio` |
| `Webhook`, `NotificacionPago` | Infraestructura de Mercado Pago; el resultado vive en `Pedido` |
| `LogAuditoria` | Requerimiento transversal (RNF10), no una entidad del dominio |
| `ItemCarrito`, `ItemPedido`, `ItemDevolucion`, `KitComponente` | Clases intermedias de relación; se omiten por no normalizar |
| `Direccion`, `ImagenProducto`, `Dimensiones`, `Pago`, `Comprobante` | Dentro de su clase contenedora |
| `Notificacion`, `Asistente` | El correo es externo; el asistente consulta el catálogo sin persistir entidades (UC03) |
| Fidelización, cupones, lista de deseos | Fuera del alcance (apartado 1.13) |
