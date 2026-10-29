import { cargarEntorno } from '../../src/config/env.js';

const variablesCompletas = {
  NODE_ENV: 'development',
  PORT: '4000',
  API_URL: 'http://localhost:4000',
  WEB_URL: 'http://localhost:5173',
  DATABASE_URL: 'postgresql://aventura:aventura@localhost:5432/aventura360?schema=public',
};

describe('cargarEntorno', () => {
  test('devuelve la configuracion con los tipos convertidos', () => {
    const entorno = cargarEntorno(variablesCompletas);

    expect(entorno.PORT).toBe(4000);
    expect(entorno.WEB_URL).toBe('http://localhost:5173');
    expect(entorno.LOG_LEVEL).toBe('info');
    expect(entorno.TRUST_PROXY).toBe(0);
  });

  test('falla si falta una variable obligatoria y la nombra', () => {
    const { DATABASE_URL: _omitida, ...incompletas } = variablesCompletas;

    expect(() => cargarEntorno(incompletas)).toThrow(/DATABASE_URL/);
  });

  test('falla si una URL no es valida', () => {
    expect(() => cargarEntorno({ ...variablesCompletas, WEB_URL: 'no-es-una-url' })).toThrow(/WEB_URL/);
  });
});
