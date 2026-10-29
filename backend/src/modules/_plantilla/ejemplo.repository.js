// Único punto de acceso a Prisma del módulo. Sin reglas de negocio: solo consultas.
// `prisma.ejemplo` es ilustrativo: al copiar la plantilla se cambia por el modelo real del dominio.
import { prisma } from '../../infrastructure/database/prisma.js';

export function buscarPorId(id) {
  return prisma.ejemplo.findUnique({ where: { id } });
}

export function crear(datos) {
  return prisma.ejemplo.create({ data: datos });
}
