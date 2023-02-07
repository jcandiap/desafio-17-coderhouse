import { describe, it } from "mocha";
import asserts from 'assert';
import axios from "axios";
import { newProductExample } from "../examples.js";

axios.defaults.baseURL = 'http://localhost:8080';

describe('Product test', () => {
    let createdProduct;

    describe('New Product', () => {
        it('Adding product to database', async () => {
            const { data } = await axios.post('/api/producto', newProductExample);
            createdProduct = data?.data;
            asserts.equal(data?.status, 'ok');
        });
    })

    describe('Working with created product', () => {
        it('Getting product by ID', async () => {
            const { data } = await axios.get(`/api/producto/${ createdProduct.id }`);
            asserts.equal(data?.status, 'ok');
        });
    
        it('Updating an existing product', async () => {
            createdProduct.price = 300;
            createdProduct.title = 'Compas de oro';
            const { data } = await axios.put(`/api/producto/${ createdProduct.id }`, createdProduct);
            asserts.equal(data?.status, 'ok');
        });
    
        it('Delete created product', async () => {
            const { data } = await axios.delete(`/api/producto/${ createdProduct.id }`);
            asserts.equal(data?.status, 'ok');
        });
    })

    describe('Working with other products', () => {
        it('Getting all products', async () => {
            const { data } = await axios.get(`/api/productos`);
            asserts.equal(data?.status, 'ok');
        });
    })
})