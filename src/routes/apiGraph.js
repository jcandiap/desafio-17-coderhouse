import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/ProductGraphController.js';

const productGraphRouter = express.Router();

const schema = buildSchema(`
    type Product {
        _id: ID!
        title: String,
        price: Float,
        thumbnail: String,
        timestamp: Float
    }
    input ProductInput {
        title: String,
        price: Float,
        thumbnail: String
    }
    type Query {
        getProducts: [Product]
        getProduct(id: ID!): Product
    }
    type Mutation {
        createProduct(productInput: ProductInput): Product,
        updateProduct(id: ID!, productInput: ProductInput): Product,
        deleteProduct(id: ID!): Product
    }
`);

productGraphRouter.use('/product', graphqlHTTP({
    schema,
    rootValue: {
        getProduct,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
    },
    graphiql: true
}))

export default productGraphRouter;