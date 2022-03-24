import { createGameCode } from './../controllers/game.controller';
import { Router } from 'express';

const routes = Router();

routes.post('/', createGameCode);

export default routes;