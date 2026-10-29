// Registro de eventos. Nunca escribe contraseñas, tokens ni datos de tarjeta (RNF05, RNF09).
import pino from 'pino';
import { entorno } from './env.js';

const CENSURA = '[Oculto]';

// Una clave es sensible si, en minúsculas y sin guiones, contiene alguno de estos fragmentos.
// Así cubre contrasenaActual, passwordHash, access_token, Authorization, Set-Cookie, numeroTarjeta…
const FRAGMENTOS_SENSIBLES = [
  'contrasena',
  'password',
  'token',
  'secret',
  'secreto',
  'authorization',
  'cookie',
  'tarjeta',
  'cardnumber',
  'cvv',
  'codigoseguridad',
  'securitycode',
];
// Parámetros de la query string que llevan secretos sin que su nombre lo diga: el callback de OAuth.
const PARAMETROS_SENSIBLES = new Set(['code', 'codigo', 'state']);

function esClaveSensible(clave) {
  const normalizada = clave.toLowerCase().replace(/[-_]/g, '');
  return FRAGMENTOS_SENSIBLES.some((fragmento) => normalizada.includes(fragmento));
}

// Devuelve una copia con las claves sensibles ocultas, a cualquier profundidad.
// Los errores pasan antes por el serializador de pino, para conservar mensaje y traza.
export function ocultarSensibles(valor, vistos = new WeakSet()) {
  if (valor === null || typeof valor !== 'object') return valor;
  if (valor instanceof Error) valor = pino.stdSerializers.err(valor);
  if (vistos.has(valor)) return '[Circular]';
  vistos.add(valor);
  if (Array.isArray(valor)) return valor.map((elemento) => ocultarSensibles(elemento, vistos));

  const copia = {};
  for (const [clave, contenido] of Object.entries(valor)) {
    copia[clave] = esClaveSensible(clave) ? CENSURA : ocultarSensibles(contenido, vistos);
  }
  return copia;
}

export function sanitizarUrl(url) {
  const inicioQuery = url.indexOf('?');
  if (inicioQuery === -1) return url;
  const parametros = new URLSearchParams(url.slice(inicioQuery + 1));
  for (const nombre of [...parametros.keys()]) {
    if (esClaveSensible(nombre) || PARAMETROS_SENSIBLES.has(nombre.toLowerCase())) parametros.set(nombre, CENSURA);
  }
  return `${url.slice(0, inicioQuery)}?${parametros}`;
}

// Las solicitudes se registran sin cabeceras ni cuerpo: ahí viajan cookies, tokens y contraseñas.
export function serializarSolicitud(solicitud) {
  return {
    id: solicitud.id,
    method: solicitud.method,
    url: sanitizarUrl(solicitud.url),
    remoteAddress: solicitud.remoteAddress,
  };
}

export function crearLogger({ nivel = 'info', legible = false } = {}, destino) {
  const opciones = {
    level: nivel,
    formatters: {
      // req y res llegan crudos desde pino-http y los resuelven sus propios serializadores,
      // que ya descartan cabeceras y cuerpo; el resto se recorre completo.
      log: ({ req, res, ...resto }) => ({
        ...(req && { req }),
        ...(res && { res }),
        ...ocultarSensibles(resto),
      }),
    },
    ...(legible && !destino && { transport: { target: 'pino-pretty', options: { translateTime: 'SYS:HH:MM:ss' } } }),
  };
  return destino ? pino(opciones, destino) : pino(opciones);
}

export const logger = crearLogger({ nivel: entorno.LOG_LEVEL, legible: entorno.NODE_ENV === 'development' });
