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
    try {
        logger.info('inicia metodo [producto]');
        const product = await productContainer.save(productInput);
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateProduct = async ({ id, productInput }) => {
    logger.info('inicia metodo [editar producto]')
    try {
        const product = await productContainer.getById(id);
        if( product ) { 
            const productUpdated = await productContainer.update({ ...product, ...productInput, id });
            return productUpdated;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteProduct = async ({ id }) => {
    logger.info('inicia metodo [eliminar producto]')
    try {
        const product = await productContainer.getById(id);
        if( product ) {
            await productContainer.delete(id);
        }
        return product;
    } catch(error) {
        throw new Error(error.message);
    }
}
