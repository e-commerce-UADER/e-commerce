import { crearApp } from './app.js';
import { entorno } from './config/env.js';
import { logger } from './config/logger.js';
import { prisma } from './infrastructure/database/prisma.js';

// Express 5 pasa al callback el error de listen (puerto ocupado o sin permiso): sin este control,
// la API anunciaría que escucha y terminaría en silencio.
const servidor = crearApp().listen(entorno.PORT, (error) => {
  if (error) {
    logger.fatal({ err: error }, `No se pudo abrir el puerto ${entorno.PORT} (${error.code}). Cambia PORT en el .env.`);
    process.exitCode = 1;
    return;
  }
  logger.info(`API escuchando en http://localhost:${entorno.PORT}/api`);
});

function apagar(senal) {
  logger.info(`${senal} recibida: cerrando la API`);
  servidor.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', apagar);
process.on('SIGTERM', apagar);
