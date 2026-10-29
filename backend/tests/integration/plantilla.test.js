import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';

// El repository es la única capa que toca Prisma; reemplazarlo permite probar
// routes -> controller -> service -> validación -> errores sin base de datos.
const buscarPorId = jest.fn();
const crear = jest.fn();
jest.unstable_mockModule('../../src/modules/_plantilla/ejemplo.repository.js', () => ({
  buscarPorId,
  crear,
}));

const { rutasEjemplo } = await import('../../src/modules/_plantilla/ejemplo.routes.js');
const { manejarErrores } = await import('../../src/shared/errors/manejador-errores.js');

const app = express();
app.use(express.json());
app.use('/ejemplos', rutasEjemplo);
app.use(manejarErrores);

beforeEach(() => {
  buscarPorId.mockReset();
  crear.mockReset();
});

describe('plantilla de modulo', () => {
  test('GET devuelve el recurso encontrado', async () => {
    buscarPorId.mockResolvedValue({ id: 3, nombre: 'Carpa iglú' });

    const respuesta = await request(app).get('/ejemplos/3');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ id: 3, nombre: 'Carpa iglú' });
    expect(buscarPorId).toHaveBeenCalledWith(3);
  });

  test('GET de un recurso inexistente devuelve 404', async () => {
    buscarPorId.mockResolvedValue(null);

    const respuesta = await request(app).get('/ejemplos/99');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body.error.codigo).toBe('NO_ENCONTRADO');
  });

  test('un parametro invalido se rechaza antes de llegar al servicio', async () => {
    const respuesta = await request(app).get('/ejemplos/abc');

    expect(respuesta.status).toBe(400);
    expect(respuesta.body.error.codigo).toBe('VALIDACION');
    expect(respuesta.body.error.detalles[0].campo).toBe('params.id');
    expect(buscarPorId).not.toHaveBeenCalled();
  });

  test('POST valida el cuerpo con Zod y no devuelve los valores enviados', async () => {
    const respuesta = await request(app).post('/ejemplos').send({ nombre: 'a', contrasena: 'no-debe-volver' });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body.error.detalles).toEqual([{ campo: 'body.nombre', mensaje: expect.any(String) }]);
    expect(JSON.stringify(respuesta.body)).not.toContain('no-debe-volver');
    expect(crear).not.toHaveBeenCalled();
  });

  test('POST valido crea el recurso con los datos ya validados', async () => {
    crear.mockResolvedValue({ id: 1, nombre: 'Mochila 40 L' });

    const respuesta = await request(app).post('/ejemplos').send({ nombre: '  Mochila 40 L  ', extra: 'x' });

    expect(respuesta.status).toBe(201);
    expect(crear).toHaveBeenCalledWith({ nombre: 'Mochila 40 L' });
  });
});
