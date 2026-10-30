import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { opcionesCors } from './config/cors.js';
import { entorno } from './config/env.js';
import { logger, serializarSolicitud } from './config/logger.js';
import { rutasApi } from './routes.js';
import { manejarErrores, rutaNoEncontrada } from './shared/errors/manejador-errores.js';
import { forzarHttps } from './shared/middlewares/forzar-https.js';

export function crearApp(config = entorno) {
  const app = express();
  app.set('env', config.NODE_ENV);
  app.set('trust proxy', config.TRUST_PROXY);

  app.use(
    pinoHttp({
      logger,
      serializers: { req: serializarSolicitud, res: (res) => ({ statusCode: res.statusCode }) },
      customLogLevel: (_req, res, error) => (error || res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info'),
    }),
  );
  app.use(forzarHttps(config.API_URL));
  app.use(helmet());
  app.use(cors(opcionesCors(config.WEB_URL)));
  app.use(express.json({ limit: '100kb' }));

  app.use('/api', rutasApi);

  app.use(rutaNoEncontrada);
  app.use(manejarErrores);
  return app;
}
