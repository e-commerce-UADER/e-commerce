// Manejo centralizado de errores: toda respuesta de error tiene la forma
// { error: { codigo, mensaje, detalles? } }. La traza solo se devuelve en desarrollo.
import { ErrorAplicacion, ErrorNoEncontrado } from './errores.js';

// Errores que lanza el parser de JSON de Express antes de llegar a las rutas.
const ERRORES_DEL_CUERPO = {
  'entity.parse.failed': { codigo: 'CUERPO_INVALIDO', mensaje: 'El cuerpo de la solicitud no es un JSON válido.' },
  'entity.too.large': { codigo: 'CUERPO_DEMASIADO_GRANDE', mensaje: 'El cuerpo de la solicitud es demasiado grande.' },
};

function describir(error) {
  if (error instanceof ErrorAplicacion) {
    return { estado: error.estado, codigo: error.codigo, mensaje: error.message, detalles: error.detalles };
  }
  const delCuerpo = ERRORES_DEL_CUERPO[error.type];
  if (delCuerpo) return { estado: error.status, ...delCuerpo };
  if (error.expose && error.status >= 400 && error.status < 500) {
    return { estado: error.status, codigo: 'SOLICITUD_INVALIDA', mensaje: 'La solicitud no es válida.' };
  }
  return { estado: 500, codigo: 'ERROR_INTERNO', mensaje: 'Ocurrió un error inesperado. Intenta de nuevo más tarde.' };
}

export function rutaNoEncontrada(_req, _res, next) {
  next(new ErrorNoEncontrado('La ruta solicitada no existe.'));
}

export function manejarErrores(error, req, res, next) {
  if (res.headersSent) return next(error);

  const { estado, codigo, mensaje, detalles } = describir(error);
  // pino-http registra el error al cerrar la respuesta, una sola vez y con la solicitud asociada.
  if (estado >= 500) res.err = error;

  const cuerpo = { codigo, mensaje };
  if (detalles) cuerpo.detalles = detalles;
  if (estado >= 500 && req.app.get('env') === 'development') cuerpo.traza = error.stack;

  res.status(estado).json({ error: cuerpo });
}
