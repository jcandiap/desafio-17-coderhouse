import BaseDAO from "./BaseDAO";

class ProductsDAO extends BaseDAO {

    constructor() {
        super();
        this.collection = 'products';
    }

    async getAll() {
        let products = [];
        try {
            const collection = await this.connect();
            products = await collection.find({}).toArray();
            await this.disconnect();   
        } catch (error) {
            throw new Error('Error al obtener todos los productos');
        }
        return products;
    }

    async save(newRegister) {
        try {
            const collection = await this.connect();
            newRegister.timestamp = this._getTimestamp();
            await collection.insertOne(newRegister);
            await this.disconnect();
            return newRegister;
        } catch (error) {
            throw new Error('Error al guardar el registro');
        }
    }

    _getTimestamp() {
        return new Date().getTime();
    }

}

export default ProductsDAO;