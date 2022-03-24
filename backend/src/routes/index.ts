import { Router } from 'express'
import game from './game.route'

const routes = Router();

routes.use('/game', game)

export default routes;
