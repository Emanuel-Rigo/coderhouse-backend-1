import express from "express";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';


import handlebars from 'express-handlebars';

import config from "./config.js";

const app = express();


//activo el motor de plantillas
app.engine('handlebars', handlebars.engine());  
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');
//////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

///vistas
app.use('/views', viewsRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`))


app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});
