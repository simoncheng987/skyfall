import { Router } from 'express';
import { getTopPlayers } from '../controllers/players.controller';

const routes = Router();

routes.get('/', getTopPlayers);

export default routes;
