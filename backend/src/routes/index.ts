import { Router } from 'express';
import game from './game.route';
import wordList from './word-list.routes';

const routes = Router();

routes.use('/game', game);
routes.use('/wordList', wordList);
routes.use('/player', wordList);

export default routes;
