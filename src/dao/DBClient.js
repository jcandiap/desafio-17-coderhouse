class DBClient {

    async connect() {
        throw new Error("falta implementar 'conect' en subclase");
    }

    async disconnect() {
        throw new Error("falta implementar 'disconect' en subclase");
    }

}

export default DBClient;