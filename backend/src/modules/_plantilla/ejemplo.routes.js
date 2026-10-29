// Plantilla de módulo: routes → controller → service → repository → schema.
// Para un dominio nuevo, copiar esta carpeta a src/modules/<dominio>/, renombrar `ejemplo` por el
// dominio en archivos y nombres, y montar el router en src/routes.js. Esta carpeta no se monta.
import { Router } from 'express';
import { validar } from '../../shared/middlewares/validar.js';
import * as controlador from './ejemplo.controller.js';
import { esquemaCrearEjemplo, esquemaParamsId } from './ejemplo.schema.js';

export const rutasEjemplo = Router();

rutasEjemplo.get('/:id', validar({ params: esquemaParamsId }), controlador.obtener);
rutasEjemplo.post('/', validar({ body: esquemaCrearEjemplo }), controlador.crear);
