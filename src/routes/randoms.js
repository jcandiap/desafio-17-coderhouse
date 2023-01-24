import express from 'express';
import { getRandom } from '../controllers/RandomController.js';

const randomRouter = express.Router();

randomRouter.get('/cant=:cant', getRandom)

export default randomRouter;