// Validación de entrada del módulo (Zod). Un esquema por cada parte de la solicitud que se valida.
import { z } from '../../shared/validators/zod.js';

export const esquemaParamsId = z.object({
  id: z.coerce.number().int().positive(),
});

export const esquemaCrearEjemplo = z.object({
  nombre: z.string().trim().min(3).max(120),
});
