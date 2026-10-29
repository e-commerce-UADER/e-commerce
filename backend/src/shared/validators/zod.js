// Zod configurado en español. Todo el backend importa `z` desde acá, así los mensajes de
// validación salen en español sin importar qué módulo se cargue primero.
import { z } from 'zod';

z.config(z.locales.es());

export { z };
