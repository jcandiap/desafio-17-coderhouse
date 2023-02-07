import log4js from 'log4js';
import ProductsDAO from '../dao/ProductsDAO.js';
import ProductDTO from '../dto/ProductDTO.js';

const productContainer = new ProductsDAO();

const logger = log4js.getLogger();
const warnLogger = log4js.getLogger('warn');

export const saveProduct = async (req, res) => {
    logger.info('inicia metodo [producto]');
    // if( !Boolean(req.session.user) ) {
    //     warnLogger.warn('Usuario no registrado intenta crear un producto');
    //     res.send({ status: 'error', message: 'No estas logueado' });
    //     return;
    // }
    const data = req.body;
    const product = await productContainer.save(data);
    const productDTO = new ProductDTO(product);
    res.send({ status: 'ok', message: 'Producto creado con exito', data: productDTO });
}

export const getAll = async (req, res) => {
    try {
        logger.info('inicia metodo [obtener productos]');
        const products = await productContainer.getAll();
        const response = products.map(product => new ProductDTO(product));
        res.send({ status: 'ok', message: 'Productos obtenidos con exito', data: response });
    } catch (error) {
        res.send({ status: 'error', message: 'Error al obtener los productos' });
    }
}

export const getProductById = async (req, res) => {
    try {
        logger.info('inicia metodo [obtener productos]');
        const id = req.params?.id || "";
        const product = await productContainer.getById(id);
        const response = new ProductDTO(product);
        res.send({ status: 'ok', message: 'Producto obtenido con exito', data: response });
    } catch(error) {
        res.send({ status: 'error', message: 'Error al obtener producto' });
    }
}

export const updateProduct = async (req, res) => {
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

export const deleteProduct = async (req, res) => {
    logger.info('inicia metodo [eliminar producto]')
    const id = req.params.id;
    !Boolean(id) && res.send({ status: 'error', error: 'Debe ingresar un id de producto' });
    try {
        const response = await productContainer.delete(id);
        !!response ? res.send({ status:'ok', message: 'Elemento eliminado con exito!' }) : res.send({ status: 'error', error: 'Error al eliminar producto' });
    } catch(error) {
        res.send({ status: 'error', error: 'Error en la ejecución del servicio' });
    }
}