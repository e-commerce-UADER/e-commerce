// Lee la solicitud ya validada, delega en el service y arma la respuesta. Sin reglas de negocio.
// Express 5 pasa al manejador central los errores de las funciones async.
import * as servicio from './ejemplo.service.js';

export async function obtener(req, res) {
  res.json(await servicio.obtenerEjemplo(req.params.id));
}

export async function crear(req, res) {
  res.status(201).json(await servicio.crearEjemplo(req.body));
}
