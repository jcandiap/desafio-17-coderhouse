import log4js from 'log4js';
import ProductsDAO from '../dao/ProductsDAO.js';

const productContainer = new ProductsDAO();

const logger = log4js.getLogger();
const warnLogger = log4js.getLogger('warn');

export const getProduct = async (req, res) => {
    logger.info('inicia metodo [producto]');
    if( !Boolean(req.session.user) ) {
        warnLogger.warn('Usuario no registrado intenta crear un producto');
        res.send({ status: 'error', message: 'No estas logueado' });
        return;
    }
    const data = req.body;
    const product = await productContainer.save(data);
    res.send({ status: 'ok', message: 'Producto creado con exito', data: product });
}