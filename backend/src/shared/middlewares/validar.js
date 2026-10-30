// Validación de entrada con Zod. Cada módulo define sus esquemas en <modulo>.schema.js y los
// pasa por parte de la solicitud: validar({ params, query, body }). Los datos validados reemplazan
// a los originales, así el controller solo ve lo que el esquema admite.
import { ErrorValidacion } from '../errors/errores.js';

const PARTES = ['params', 'query', 'body'];

export function validar(esquemas) {
  return (req, _res, next) => {
    const detalles = [];
    for (const parte of PARTES) {
      const esquema = esquemas[parte];
      if (!esquema) continue;
      const resultado = esquema.safeParse(req[parte] ?? {});
      if (resultado.success) {
        // En Express 5 req.query es un getter: se redefine en vez de asignarse.
        Object.defineProperty(req, parte, { value: resultado.data, writable: true, enumerable: true, configurable: true });
      } else {
        // Solo el campo y el motivo: nunca se devuelve el valor recibido.
        for (const problema of resultado.error.issues) {
          detalles.push({ campo: [parte, ...problema.path].join('.'), mensaje: problema.message });
        }
      }
    }
    if (detalles.length > 0) return next(new ErrorValidacion('Los datos enviados no son válidos.', detalles));
    next();
  };
}
