import { Router } from 'express';
import game from './game.route';
import wordList from './word-list.routes';
import player from './player.route';

const routes = Router();

routes.use('/game', game);
routes.use('/wordList', wordList);
routes.use('/leaderboard', player);

export default routes;
