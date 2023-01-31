import BaseDAO from "./BaseDAO";

class UserDAO extends BaseDAO {

    constructor() {
        super();
        this.collection = 'user';
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

    async getAll() {
        let objects = [];
        try {
            const collection = await this.connect();
            objects = await collection.find({}).toArray();
            await this.disconnect();
        } catch (error) {
            throw new Error('Error al obtener todos los registros');
        }
        return objects;
    }

    async login(data) {
        try {
            const collection = await this.connect();
            const user = await collection.findOne({ id: data.id });
            await this.disconnect();
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario');
        }
    }

    _getTimestamp() {
        return Date.now();
    }

}

export default UserDAO;