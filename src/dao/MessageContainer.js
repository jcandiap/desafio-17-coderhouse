import mongoose from "mongoose";
import { MongoClient } from 'mongodb';
import DBClient from "./DBClient.js";

class MongoContainer extends DBClient {

    constructor(collection) {
        super();
        this.collection = collection;
    }

    async connect() {
        try {
            const uri = `mongodb+srv://${ process.env.MONGO_USER || '' }:${ process.env.MONGO_PASS || '' }@${ process.env.MONGO_DB }.7aqz8cq.mongodb.net/?retryWrites=true&w=majority`;
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const database = client.db(process.env.MONGO_DB);
            const collection = database.collection(this.collection);
            return collection;
        } catch (error) {
            return null;
        }
    }

    async disconnect(){
        mongoose.disconnect();
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

export default MongoContainer;