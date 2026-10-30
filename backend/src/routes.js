// Rutas de la API. Cada módulo de dominio se monta acá con su prefijo.
import { Router } from 'express';

export const rutasApi = Router();

rutasApi.get('/salud', (_req, res) => {
  res.json({ estado: 'ok' });
});
