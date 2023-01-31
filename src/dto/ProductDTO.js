export default class ProductDTO {
    constructor(data) {
        this.id = data?._id;
        this.title = data?.title;
        this.price = data?.price;
        this.thumbnail = data?.thumbnail;
    }
}