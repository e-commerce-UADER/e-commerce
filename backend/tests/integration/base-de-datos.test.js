import { prisma } from '../../src/infrastructure/database/prisma.js';

afterAll(() => prisma.$disconnect());

describe('base de datos de pruebas', () => {
  test('el cliente unico de Prisma se conecta a la base de pruebas, separada de la de desarrollo', async () => {
    const [{ base }] = await prisma.$queryRaw`SELECT current_database() AS base`;

    expect(base).toBe('aventura360_test');
  });
});
