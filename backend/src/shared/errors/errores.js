// Errores de dominio. El manejador central los traduce a una respuesta HTTP uniforme;
// los services los lanzan sin conocer HTTP. El mensaje llega tal cual al cliente, también en
// producción: nunca debe llevar detalles internos (consultas, rutas de archivos, datos de otros usuarios).

export class ErrorAplicacion extends Error {
  constructor(mensaje, { estado = 500, codigo = 'ERROR_INTERNO', detalles } = {}) {
    super(mensaje);
    this.name = new.target.name;
    this.estado = estado;
    this.codigo = codigo;
    this.detalles = detalles;
  }
}

export class ErrorValidacion extends ErrorAplicacion {
  constructor(mensaje, detalles) {
    super(mensaje, { estado: 400, codigo: 'VALIDACION', detalles });
  }
}

export class ErrorNoAutenticado extends ErrorAplicacion {
  constructor(mensaje = 'Necesitas iniciar sesión.') {
    super(mensaje, { estado: 401, codigo: 'NO_AUTENTICADO' });
  }
}

export class ErrorProhibido extends ErrorAplicacion {
  constructor(mensaje = 'No tienes permiso para esta acción.') {
    super(mensaje, { estado: 403, codigo: 'PROHIBIDO' });
  }
}

export class ErrorNoEncontrado extends ErrorAplicacion {
  constructor(mensaje = 'No encontramos lo que buscas.') {
    super(mensaje, { estado: 404, codigo: 'NO_ENCONTRADO' });
  }
}

export class ErrorConflicto extends ErrorAplicacion {
  constructor(mensaje) {
    super(mensaje, { estado: 409, codigo: 'CONFLICTO' });
  }
}
