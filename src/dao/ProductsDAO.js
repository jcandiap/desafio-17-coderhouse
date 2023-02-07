import BaseDAO from "./BaseDAO.js";
import mongo from 'mongodb';

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

    async getById(id) {
        let object = {};
        try {
            const collection = await this.connect();
            const o_id = new mongo.ObjectId(id);
            object = await collection.findOne({ _id: o_id });
            await this.disconnect();
        } catch (error) {
            throw new Error('Error al obtener el registro');
        }
        return object;
    }

    async update(registerUpdate) {
        try {
            const collection = await this.connect();
            const o_id = new mongo.ObjectId(registerUpdate.id);
            delete registerUpdate.id;
            registerUpdate.timestamp = this._getTimestamp();
            await collection.updateOne({ _id: o_id }, { $set: registerUpdate });
            await this.disconnect();
            return registerUpdate;
        } catch (error) {
            throw new Error('Error al actualizar el registro');
        }
    }

    async delete(registerDelete) {
        try {
            const collection = await this.connect();
            const o_id = new mongo.ObjectId(registerDelete);
            const deleted = await collection.findOneAndDelete({ _id: o_id });
            await this.disconnect();
            return deleted;
        } catch (error) {
            throw new Error('Error al eliminar el registro');
        }
    }

    _getTimestamp() {
        return new Date().getTime();
    }

}

export default ProductsDAO;