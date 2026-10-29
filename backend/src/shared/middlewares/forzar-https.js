// Redirección a HTTPS fuera de desarrollo (RNF03). Redirige siempre al host de API_URL,
// nunca al de la cabecera Host, para no abrir una redirección hacia otro sitio.
export function forzarHttps(urlApi) {
  const host = new URL(urlApi).host;
  return (req, res, next) => {
    if (req.app.get('env') !== 'production' || req.secure) return next();
    // Una solicitud en forma absoluta (GET http://otro-sitio/x) no tiene ruta propia: va a la raíz.
    const ruta = req.originalUrl.startsWith('/') ? req.originalUrl : '/';
    res.redirect(308, `https://${host}${ruta}`);
  };
}
