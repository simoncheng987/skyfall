import { Router } from 'express';
import { createGameCode } from '../controllers/game.controller';

const routes = Router();

routes.post('/', createGameCode);

export default routes;
