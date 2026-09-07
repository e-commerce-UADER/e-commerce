# Aventura 360 — Diagrama de clases (entidades)

Modelo de entidades del dominio, derivado de [Aventura360-Requerimientos-v1.0.pdf](Aventura360-Requerimientos-v1.0.pdf).

Criterio: sin separar por responsabilidades, sin normalizar y solo con entidades del negocio. Los atributos compuestos quedan dentro de su clase y no se modelan clases intermedias ni de infraestructura.

---

## Diagrama

```mermaid
classDiagram
    class Usuario {
        +int id
        +string nombre
        +string apellido
        +string email
        +boolean emailVerificado
        +string passwordHash
        +string telefono
        +string rol
        +boolean activo
        +string direccionCalle
        +string direccionNumero
        +string direccionPiso
        +string direccionDepartamento
        +string direccionCiudad
        +string direccionProvincia
        +string direccionCodigoPostal
        +Date fechaRegistro
        +registrarse()
        +iniciarSesion()
        +cerrarSesion()
        +cambiarPassword()
        +recuperarPassword()
        +actualizarPerfil()
        +actualizarDireccion()
    }

    class Producto {
        +int id
        +string sku
        +string nombre
        +string descripcion
        +string marca
        +decimal precio
        +int stock
        +int stockMinimo
        +string garantia
        +string estado
        +string ocasion
        +decimal alto
        +decimal ancho
        +decimal profundidad
        +decimal peso
        +string imagenes
        +boolean activo
        +Date fechaAlta
        +darDeAlta()
        +modificar()
        +darDeBaja()
        +hayStock()
        +descontarStock()
        +reingresarStock()
        +precioConDescuento()
    }

    class Categoria {
        +int id
        +string nombre
        +string descripcion
        +boolean activa
        +crear()
        +renombrar()
        +darDeBaja()
    }

    class Kit {
        +int id
        +string nombre
        +string descripcion
        +decimal precio
        +decimal descuento
        +string imagen
        +boolean disponible
        +boolean activo
        +Date fechaAlta
        +armar()
        +modificar()
        +validarDisponibilidad()
        +calcularPrecio()
        +descontarStockComponentes()
    }

    class Oferta {
        +int id
        +string nombre
        +decimal porcentaje
        +string alcance
        +Date fechaInicio
        +Date fechaFin
        +boolean activa
        +crear()
        +modificar()
        +estaVigente()
        +aplicarDescuento()
    }

    class Carrito {
        +int id
        +string sesionNavegador
        +int cantidad
        +decimal subtotal
        +decimal descuentos
        +decimal total
        +Date fechaCreacion
        +Date fechaActualizacion
        +agregarItem()
        +quitarItem()
        +modificarCantidad()
        +calcularTotales()
        +aplicarOfertas()
        +fusionarConCarritoUsuario()
        +vaciar()
    }

    class Pedido {
        +int id
        +string numero
        +Date fecha
        +string estado
        +int cantidad
        +decimal precioUnitario
        +decimal subtotal
        +decimal descuentos
        +decimal costoEnvio
        +decimal total
        +string envioCalle
        +string envioNumero
        +string envioPiso
        +string envioDepartamento
        +string envioCiudad
        +string envioProvincia
        +string envioCodigoPostal
        +string pagoIdMercadoPago
        +string pagoEstado
        +string pagoMetodo
        +Date pagoFecha
        +string comprobanteNumero
        +string comprobanteUrl
        +generar()
        +confirmarPago()
        +rechazarPago()
        +calcularTotales()
        +congelarPrecios()
        +descontarStock()
        +generarComprobante()
        +notificarCliente()
    }

    class Envio {
        +int id
        +string estado
        +Date fechaPendiente
        +Date fechaEnPreparacion
        +Date fechaEnCamino
        +Date fechaEntregado
        +string observaciones
        +actualizarEstado()
        +notificarCambio()
    }

    class Devolucion {
        +int id
        +Date fechaSolicitud
        +string estado
        +string motivo
        +int cantidad
        +boolean recibido
        +string motivoRechazo
        +Date fechaResolucion
        +decimal montoReembolso
        +solicitar()
        +aprobar()
        +rechazar()
        +reembolsar()
        +reingresarStock()
    }

    class CompraProveedor {
        +int id
        +string proveedor
        +Date fecha
        +string comprobante
        +int cantidad
        +decimal costoUnitario
        +decimal total
        +registrar()
        +incrementarStock()
    }

    Usuario "1" --> "0..*" Pedido : realiza
    Usuario "1" --> "0..1" Carrito : posee
    Usuario "1" --> "0..*" Devolucion : solicita

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

---

## Las clases

### Usuario

Un único registro para los dos métodos de acceso (RF08, UC30): `passwordHash` queda vacío cuando la cuenta se creó con Google, y el correo verificado unifica la identidad.

| Atributo | Descripción | Trazabilidad |
|---|---|---|
| `email`, `emailVerificado` | La cuenta no confirma compras sin verificar | RF05, UC09 |
| `passwordHash` | Hash con salt, nunca texto plano | RNF05 |
| `rol` | Cliente o Administrador | RF10 |
| `direccion*` | Dirección de envío, dentro del usuario | RF11, UC14 |

### Producto

Los atributos que exige RF14 —ID, SKU, nombre, descripción, marca, categoría, precio, garantía, estado, ocasión y dimensiones— más el stock, que gobierna la disponibilidad. Las dimensiones y las imágenes quedan como atributos, no como clases aparte.

| Atributo | Descripción | Trazabilidad |
|---|---|---|
| `sku` | Código unívoco, validado al alta | RF14, UC19 |
| `stock` | Nunca puede quedar negativo | RF19, RF20 |
| `estado`, `ocasion` | Criterios de filtro y de recomendación | RF17, RF45 |
| `activo` | Baja lógica: conserva el historial | UC19 (6b) |

### Categoría

Carpas, mochilas y accesorios como mínimo (RF16). El nombre no se repite y una categoría con productos asociados no se da de baja sin reasignarlos (UC20).

### Kit

Se asocia directamente a los productos que lo integran; la cantidad de cada componente queda en la relación.

| Regla | Trazabilidad |
|---|---|
| Disponible solo si **todos** los componentes tienen stock, por la cantidad total requerida | RF22, UC29 |
| Al venderse descuenta el stock de cada componente | RF23, UC27 |
| Precio propio, distinto de la suma de sus partes | RF24, UC22 |

### Oferta

Porcentaje con vigencia que se activa y vence sola (RF27). El `alcance` dice a qué apunta —producto, categoría o kit— y solo una de las tres asociaciones queda cargada. Sobre un mismo ítem se aplica una sola oferta (UC28).

### Carrito

`sesionNavegador` lo ata al navegador del visitante y `Usuario` queda nulo hasta que inicia sesión, momento en que ambos carritos se fusionan (RF01, UC04, UC06, UC07).

Los precios son los vigentes al momento de la consulta, no congelados. Agregar al carrito **no reserva stock**.

### Pedido

Donde los precios se congelan (UC10). Ni el pago ni el comprobante son clases aparte: los datos que devuelve Mercado Pago y los del comprobante de la operación (RF37) viven como atributos, igual que la dirección de envío copiada al confirmar.

| Estado | Cuándo | Trazabilidad |
|---|---|---|
| `pendiente_de_pago` | Generado en el checkout | UC10 |
| `pagado` | El webhook validó y la API confirmó | RF32, UC11 |
| `pago_rechazado` | Sin descuento de stock | UC11 (3a) |
| `en_revision` | La transacción de stock se revirtió | UC27 (4a) |

No se almacenan datos de tarjeta (RNF09): solo el identificador de Mercado Pago.

### Envío

Simulado: el administrador mueve el estado a mano y cada cambio notifica al cliente (RF35, UC17, UC24). El historial es una fecha por estado dentro de la clase.

`pendiente → en preparación → en camino → entregado`

### Devolución

La solicitud no toca el stock (UC13). El reingreso ocurre cuando el administrador aprueba y se recibe la mercadería; `recibido` habilita ese reingreso y permite la devolución parcial (UC25).

`solicitada → aprobada | rechazada → reembolsada`

### CompraProveedor

La vía por la que entra stock (RF18, UC21). Cantidades nulas o negativas se rechazan.

---

## Qué quedó afuera

| No modelado | Por qué |
|---|---|
| `CuentaOAuth`, `Token`, `Sesion` | Mecanismos de autenticación; la identidad unificada se resuelve en `Usuario` |
| `Webhook`, `NotificacionPago` | Infraestructura de Mercado Pago; el resultado vive en `Pedido` |
| `LogAuditoria` | Requerimiento transversal (RNF10), no una entidad del dominio |
| `ItemCarrito`, `ItemPedido`, `ItemDevolucion`, `KitComponente` | Clases intermedias de relación; se omiten por no normalizar |
| `Direccion`, `ImagenProducto`, `Dimensiones`, `Pago`, `Comprobante` | Dentro de su clase contenedora |
| `Notificacion`, `Asistente` | El correo es externo; el asistente consulta el catálogo sin persistir entidades (UC03) |
| Fidelización, cupones, lista de deseos | Fuera del alcance (apartado 2.13) |
