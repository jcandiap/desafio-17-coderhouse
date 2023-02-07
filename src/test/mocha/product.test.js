import { describe, it } from "mocha";
import supertest from "supertest";
import { expect } from "chai";

import { newProductExample } from "../examples.js";

const request = supertest('http://localhost:8080');

describe('Product test', () => {
    let createdProduct;

    describe('New Product', () => {
        it('Adding product to database', async () => {
            const { _body } = await request.post('/api/producto').send(newProductExample);
            createdProduct = _body?.data;
            expect(_body?.status).to.equal('ok')
        });
    })

    describe('Working with created product', () => {
        it('Getting product by ID', async () => {
            const { _body } = await request.get(`/api/producto/${ createdProduct.id }`);
            expect(_body?.status).to.equal('ok')
        });
    
        it('Updating an existing product', async () => {
            createdProduct.price = 300;
            createdProduct.title = 'Compas de oro';
            const { _body } = await request.put(`/api/producto/${ createdProduct.id }`, createdProduct);
            expect(_body?.status).to.equal('ok')
        });
    
        it('Delete created product', async () => {
            const { _body } = await request.delete(`/api/producto/${ createdProduct.id }`);
            expect(_body?.status).to.equal('ok')
        });
    })

    describe('Working with other products', () => {
        it('Getting all products', async () => {
            const { _body } = await request.get(`/api/productos`);
            expect(_body?.status).to.equal('ok')
        });
    })
})