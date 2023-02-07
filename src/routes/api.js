import express from 'express';
import randomRouter from './randoms.js';
import { deleteProduct, getAll, getProductById, saveProduct, updateProduct } from '../controllers/ProductController.js';

const productRouter = express.Router();

productRouter.post('/producto', saveProduct);
productRouter.get('/productos', getAll);
productRouter.get('/producto/:id', getProductById);
productRouter.put('/producto/:id', updateProduct);
productRouter.delete('/producto/:id', deleteProduct);

productRouter.use('/randoms', randomRouter);

export default productRouter;