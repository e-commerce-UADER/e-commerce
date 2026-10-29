// Carga .env.test por encima de lo que traiga la terminal: las pruebas nunca apuntan a la base de desarrollo.
import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

Object.assign(process.env, parseEnv(readFileSync(new URL('../.env.test', import.meta.url), 'utf8')));

const base = new URL(process.env.DATABASE_URL).pathname.slice(1);
if (!base.endsWith('_test')) {
  throw new Error(`Las pruebas solo corren contra una base terminada en _test, no contra "${base}".`);
}
