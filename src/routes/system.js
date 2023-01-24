import express from 'express';
import { getActiveSession, getInfo, showCockies } from '../controllers/SystemController.js';

const systemRouter = express.Router();

systemRouter.get('/info', getInfo);
systemRouter.get('/activeSession', getActiveSession);
systemRouter.get('/show-cookie', showCockies);

export default systemRouter