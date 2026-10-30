// Configuración por entorno. Se valida al arrancar: si falta una variable obligatoria, la API no levanta.
// Cada sprint suma al esquema las variables que empieza a usar (JWT, Google, Mercado Pago, correo).
import { z } from '../shared/validators/zod.js';

const esquemaEntorno = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  API_URL: z.url(),
  WEB_URL: z.url(),
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  // Cantidad de proxies delante de la API (balanceador, CDN). Hace falta para detectar HTTPS (RNF03).
  TRUST_PROXY: z.coerce.number().int().min(0).default(0),
});

export function cargarEntorno(variables) {
  const resultado = esquemaEntorno.safeParse(variables);
  if (!resultado.success) {
    const problemas = resultado.error.issues.map((problema) => `  - ${problema.path.join('.')}: ${problema.message}`);
    throw new Error(`Configuración inválida. Revisa el archivo .env:\n${problemas.join('\n')}`);
  }
  const entorno = resultado.data;
  // Sin barra final, para comparar con la cabecera Origin tal como la manda el navegador.
  entorno.WEB_URL = new URL(entorno.WEB_URL).origin;
  return Object.freeze(entorno);
}

export const entorno = cargarEntorno(process.env);
