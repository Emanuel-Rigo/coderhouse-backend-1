import express from "express";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

import config from "./config.js";

const app = express();

const midd = (req, res, next) => {
    console.log('se recibio una solicitud')
    next()
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use('/static', express.static(`${config.DIRNAME}/public`))


app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});
