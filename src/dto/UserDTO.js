export default class UserDTO {
    constructor(data) {
        this.nombre = data?.nombre;
        this.apellido = data?.apellido;
        this.alias = data?.alias;
        this.email = data?.email;
        this.avatar = data?.avatar;
    }
}