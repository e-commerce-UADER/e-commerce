// CORS limitado a la URL del frontend (RNF03). Con credenciales, para las cookies de sesión.
export function opcionesCors(urlFrontend) {
  return { origin: urlFrontend, credentials: true };
}
