import { describe, it } from "mocha";
import asserts from 'assert';
import axios from "axios";
import { newProductExample } from "../examples.js";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.xsrfCookieName = 'user';

describe('Product test', () => {
    it('Adding product to database', async () => {
        const { data } = await axios.post('/api/producto', newProductExample);
        asserts.equal(data?.status, 'ok');
    });

    it('Getting product by ID', () => {
        asserts.equal(1, 1);
    });

    it('Updating an existing product', () => {
        asserts.equal(1, 1);
    });

    it('Getting all products', () => {
        asserts.equal(1, 1);
    });

    it('Delete created product', () => {
        asserts.equal(1, 1);
    });
})