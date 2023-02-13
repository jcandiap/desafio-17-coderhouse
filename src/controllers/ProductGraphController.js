import ProductsDAO from "../dao/ProductsDAO.js";

import log4js from 'log4js';

const productContainer = new ProductsDAO();
const logger = log4js.getLogger();

export const getProduct = async (id) => {
    try {
        logger.info('inicia metodo [obtener productos]');
        const product = await productContainer.getById(id);
        return product;
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getProducts = async () => {
    try {
        logger.info('inicia metodo [obtener productos]');
        const products = await productContainer.getAll();
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createProduct = async ({ productInput }) => {
    logger.info('inicia metodo [producto]');
    const product = await productContainer.save(productInput);
    return product;
}

export const updateProduct = () => {

}

export const deleteProduct = () => {

}
