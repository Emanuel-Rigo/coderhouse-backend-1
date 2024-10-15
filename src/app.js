import express from "express";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import config from "./config.js";

const app = express();

// Configuración del motor de plantillas
app.engine('handlebars', handlebars.engine());  
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));

const httpServer = app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});

const socketServer = new Server(httpServer);
const messages = [];

socketServer.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    socket.on('new_user_data', data => {
        socket.emit('current_messages', messages);
        socket.broadcast.emit('new_user', data);
    });

    socket.emit('welcome', 'Bienvenido al chat');

    socket.on('new_own_msg', data => {
        messages.push(data);
        console.log(data);
        console.log(messages);
        socketServer.emit('new_general_msg', data);
    });

    socket.on('new_product', data => {
        console.log(data);
        socketServer.emit('new_product_general', data);
    });
});

export default app;
