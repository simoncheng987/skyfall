import { Router } from 'express';
import { createWordList, getWordLists } from '../controllers/word-list.controller';

const routes = Router();

routes.post('/', createWordList);
routes.get('/', getWordLists);

export default routes;
