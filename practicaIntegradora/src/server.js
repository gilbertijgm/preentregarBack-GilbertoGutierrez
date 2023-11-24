import './daos/mongodb/connection.js';
import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js';
import {errorHandler} from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => console.log(`server ok en el puerto ${PORT}`));