import { Writable } from 'node:stream';
import { crearLogger, sanitizarUrl, serializarSolicitud } from '../../src/config/logger.js';

function capturarSalida() {
  const lineas = [];
  const destino = new Writable({
    write(fragmento, _codificacion, listo) {
      lineas.push(fragmento.toString());
      listo();
    },
  });
  return { destino, texto: () => lineas.join('') };
}

describe('registro de eventos (RNF05, RNF09)', () => {
  test('nunca escribe contrasenas, tokens ni datos de tarjeta', () => {
    const { destino, texto } = capturarSalida();
    const logger = crearLogger({ nivel: 'info' }, destino);

    logger.info(
      {
        usuario: { correo: 'ana@correo.com', contrasena: 'clave-secreta' },
        sesion: { tokenAcceso: 'tok-acceso', refreshToken: 'tok-refresco' },
        pago: { tarjeta: { numero: '4111111111111111', cvv: '123' } },
        token: 'tok-suelto',
      },
      'evento de prueba',
    );

    const salida = texto();
    for (const secreto of ['clave-secreta', 'tok-acceso', 'tok-refresco', '4111111111111111', 'tok-suelto']) {
      expect(salida).not.toContain(secreto);
    }
    expect(salida).toContain('[Oculto]');
    expect(salida).toContain('ana@correo.com');
  });

  test('oculta las claves sensibles sin importar mayusculas, guiones bajos ni profundidad', () => {
    const { destino, texto } = capturarSalida();
    const logger = crearLogger({ nivel: 'info' }, destino);

    logger.info({
      respuestaGoogle: { access_token: 'AT-google', refresh_token: 'RT-google', id_token: 'ID-google' },
      peticion: { headers: { Authorization: 'Bearer cabecera-mayuscula', 'Set-Cookie': 'sesion=galleta' } },
      a: { b: { c: { d: { e: { contrasena: 'clave-profunda' } } } } },
      usuario: { passwordHash: 'hash-de-clave' },
      lista: [{ token: 'tok-en-lista' }],
    });

    const salida = texto();
    for (const secreto of ['AT-google', 'RT-google', 'ID-google', 'cabecera-mayuscula', 'galleta', 'clave-profunda', 'hash-de-clave', 'tok-en-lista']) {
      expect(salida).not.toContain(secreto);
    }
  });

  test('un error registrado no filtra las credenciales que lleva adjuntas', () => {
    const { destino, texto } = capturarSalida();
    const logger = crearLogger({ nivel: 'info' }, destino);
    const error = new Error('fallo la llamada externa');
    error.config = { headers: { Authorization: 'Bearer token-del-cliente-http' } };

    logger.error({ err: error }, 'Error no controlado');

    const salida = texto();
    expect(salida).not.toContain('token-del-cliente-http');
    expect(salida).toContain('fallo la llamada externa');
    expect(salida).toContain('"stack"');
  });

  test('oculta los valores sensibles de la query string', () => {
    expect(sanitizarUrl('/api/auth/ingreso?password=abc&Contrasena=def')).not.toMatch(/abc|def/);
    expect(sanitizarUrl('/api/auth/restablecer?token=abc123&origen=correo')).toBe(
      '/api/auth/restablecer?token=%5BOculto%5D&origen=correo',
    );
    expect(sanitizarUrl('/api/auth/google/callback?code=xyz&state=s1')).not.toMatch(/xyz|s1/);
    expect(sanitizarUrl('/api/salud')).toBe('/api/salud');
  });

  test('las solicitudes se registran sin cabeceras ni cuerpo', () => {
    const registro = serializarSolicitud({
      id: 7,
      method: 'POST',
      url: '/api/auth/ingreso?token=abc',
      headers: { authorization: 'Bearer secreto', cookie: 'sesion=secreto' },
      remoteAddress: '127.0.0.1',
    });

    expect(registro).toEqual({
      id: 7,
      method: 'POST',
      url: '/api/auth/ingreso?token=%5BOculto%5D',
      remoteAddress: '127.0.0.1',
    });
  });
});
