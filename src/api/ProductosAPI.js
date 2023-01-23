import Contenedor from "../dao/Contenedor.js";
import BaseAPI from "./BaseAPI.js";

class ProductosAPI extends BaseAPI {

    constructor() {
        super();
        this.contenedor = new Contenedor('producto');
    }

    

}