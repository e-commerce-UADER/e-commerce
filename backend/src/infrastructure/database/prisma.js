// Cliente único de Prisma. Solo lo importan los repository de cada módulo.
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { entorno } from '../../config/env.js';

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: entorno.DATABASE_URL }),
});
