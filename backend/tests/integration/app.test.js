import net from 'node:net';
import express from 'express';
import request from 'supertest';
import { crearApp } from '../../src/app.js';
import { entorno } from '../../src/config/env.js';
import { manejarErrores } from '../../src/shared/errors/manejador-errores.js';

describe('API base', () => {
  const app = crearApp();

  test('GET /api/salud responde ok', async () => {
    const respuesta = await request(app).get('/api/salud');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ estado: 'ok' });
  });

  test('una ruta inexistente devuelve 404 con el formato de error uniforme', async () => {
    const respuesta = await request(app).get('/api/no-existe');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({
      error: { codigo: 'NO_ENCONTRADO', mensaje: 'La ruta solicitada no existe.' },
    });
  });

  test('un JSON mal formado devuelve 400', async () => {
    const respuesta = await request(app)
      .post('/api/salud')
      .set('Content-Type', 'application/json')
      .send('{"roto":');

    expect(respuesta.status).toBe(400);
    expect(respuesta.body.error.codigo).toBe('CUERPO_INVALIDO');
  });

  test('envia las cabeceras de seguridad de helmet', async () => {
    const respuesta = await request(app).get('/api/salud');

    expect(respuesta.headers['x-content-type-options']).toBe('nosniff');
    expect(respuesta.headers['x-powered-by']).toBeUndefined();
  });

  test('CORS solo habilita la URL del frontend (RNF03)', async () => {
    const propia = await request(app).get('/api/salud').set('Origin', entorno.WEB_URL);
    const ajena = await request(app).get('/api/salud').set('Origin', 'https://sitio-ajeno.com');

    expect(propia.headers['access-control-allow-origin']).toBe(entorno.WEB_URL);
    expect(ajena.headers['access-control-allow-origin']).not.toBe('https://sitio-ajeno.com');
  });
});

describe('redireccion a HTTPS (RNF03)', () => {
  const produccion = crearApp({
    ...entorno,
    NODE_ENV: 'production',
    API_URL: 'https://api.aventura360.com.ar',
    TRUST_PROXY: 1,
  });

  test('en produccion redirige las solicitudes HTTP a la URL de la API', async () => {
    const respuesta = await request(produccion).get('/api/salud?x=1').set('Host', 'sitio-ajeno.com');

    expect(respuesta.status).toBe(308);
    expect(respuesta.headers.location).toBe('https://api.aventura360.com.ar/api/salud?x=1');
  });

  test('una solicitud en forma absoluta se redirige a la raiz de la API', async () => {
    const absoluta = await new Promise((resolver, rechazar) => {
      const servidor = produccion.listen(0, () => {
        const socket = net.connect(servidor.address().port, '127.0.0.1', () => {
          socket.end('GET http://sitio-ajeno.com/x HTTP/1.1\r\nHost: sitio-ajeno.com\r\nConnection: close\r\n\r\n');
        });
        let datos = '';
        socket.on('data', (fragmento) => (datos += fragmento));
        socket.on('end', () => servidor.close(() => resolver(datos)));
        socket.on('error', rechazar);
      });
    });

    expect(absoluta).toMatch(/^HTTP\/1\.1 308/);
    expect(absoluta).toMatch(/\r\nLocation: https:\/\/api\.aventura360\.com\.ar\/\r\n/i);
  });

  test('en produccion atiende las solicitudes que llegan por HTTPS', async () => {
    const respuesta = await request(produccion).get('/api/salud').set('X-Forwarded-Proto', 'https');

    expect(respuesta.status).toBe(200);
  });

  test('fuera de produccion no redirige', async () => {
    const respuesta = await request(crearApp({ ...entorno, NODE_ENV: 'development' })).get('/api/salud');

    expect(respuesta.status).toBe(200);
  });
});

describe('errores no controlados', () => {
  function appQueFalla(modo) {
    const app = express();
    app.set('env', modo);
    app.get('/falla', () => {
      throw new Error('detalle interno de la base');
    });
    app.use(manejarErrores);
    return app;
  }

  test('en produccion no filtran el mensaje interno ni la traza', async () => {
    const respuesta = await request(appQueFalla('production')).get('/falla');

    expect(respuesta.status).toBe(500);
    expect(respuesta.body.error.codigo).toBe('ERROR_INTERNO');
    expect(JSON.stringify(respuesta.body)).not.toMatch(/detalle interno|at /);
    expect(respuesta.body.error.traza).toBeUndefined();
  });

  test('en desarrollo incluyen la traza para depurar', async () => {
    const respuesta = await request(appQueFalla('development')).get('/falla');

    expect(respuesta.status).toBe(500);
    expect(respuesta.body.error.traza).toContain('detalle interno de la base');
  });
});
