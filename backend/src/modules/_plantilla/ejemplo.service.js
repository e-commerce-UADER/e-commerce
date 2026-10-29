// Reglas de negocio y transacciones. No conoce HTTP: recibe datos y lanza errores de dominio.
import { ErrorNoEncontrado } from '../../shared/errors/errores.js';
import * as repositorio from './ejemplo.repository.js';

export async function obtenerEjemplo(id) {
  const ejemplo = await repositorio.buscarPorId(id);
  if (!ejemplo) throw new ErrorNoEncontrado('No encontramos el ejemplo solicitado.');
  return ejemplo;
}

export function crearEjemplo(datos) {
  return repositorio.crear(datos);
}
