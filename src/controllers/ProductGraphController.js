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

export const updateProduct = async () => {
    logger.info('inicia metodo [editar producto]')
    let id = req.params.id;
    !Boolean(id) && res.send({ status: 'error', error: 'Debe ingresar un id de producto' });
    try {
        const product = await productContainer.update({ ...req.body, id });
        const response = new ProductDTO(product);
        !!response ? res.send({ status: 'ok', message: 'Producto modificado con exito', data: response }) : res.send({ status:'error', error: 'Error al editar producto' });
    } catch(error) {
        res.send({ status: 'error', error: 'Error en la ejecución del servicio' });
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
        res.send({ status: 'error', error: 'Error en la ejecución del servicio' });
    }
}
