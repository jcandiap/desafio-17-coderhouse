import express from 'express';
import randomRouter from './randoms.js';
import { getProduct } from '../controllers/ProductController.js';

const productRouter = express.Router();

productRouter.post('/producto', getProduct);

productRouter.use('/randoms', randomRouter);

export default productRouter;