import express from 'express';
import randomRouter from './randoms.js';
import { getAll, saveProduct } from '../controllers/ProductController.js';

const productRouter = express.Router();

productRouter.post('/producto', saveProduct);
productRouter.get('/productos', getAll);

productRouter.use('/randoms', randomRouter);

export default productRouter;