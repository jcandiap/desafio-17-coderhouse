class BaseAPI {

    async add(objectToAdd) {
        throw new Error('no se ha implementado el metodo agregar');
    }

    async find(objectToFind) {
        throw new Error('no se ha implementado el metodo buscar')
    }

    async findAll() {
        throw new Error('no se ha implementado el metodo buscar todos')
    }

    async delete(objectToFind) {
        throw new Error('no se ha implementado el metodo eliminar')
    }

    async update(objectToFind) {
        throw new Error('no se ha implementado el metodo actualizar')
    }

}

export default BaseAPI;