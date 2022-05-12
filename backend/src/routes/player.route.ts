import { Router } from 'express';
import { getTopPlayers } from '../controllers/players.controller';

const routes = Router();

routes.post('/', getTopPlayers);

export default routes;
