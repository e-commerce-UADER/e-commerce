// Configuración de la CLI de Prisma. La CLI no lee el .env por su cuenta.
import { defineConfig } from 'prisma/config';

try {
  process.loadEnvFile();
} catch {
  // Sin .env: las variables llegan del entorno (CI, producción).
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  // Sin env(): 'prisma generate' no necesita la base y así corre en CI sin DATABASE_URL.
  datasource: { url: process.env.DATABASE_URL },
});
