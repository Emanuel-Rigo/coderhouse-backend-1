import { Router } from "express";
//import { promises as fs } from 'fs'

import ProductController from "../dao/product.controller.js";
const ProController = new ProductController()

const router = Router();

///ESTA FUNCION LA DEJO PARA LOS PRODUCTOS LOCALES
// async function fetchProducts(filePath, limit) {
//     try {
//         const data = await fs.readFile(filePath, 'utf-8');
//         const products = JSON.parse(data);
//         if (limit) {
//             return products.slice(0, limit);
//         } else {
//             return products;
//         }
//     } catch (error) {
//         console.error('Error al leer el archivo JSON:', error);
//         return [];
//     }
// }

router.get('/products', async (req, res) => {
    try {
        const response = await fetch('http://localhost:8080/api/products')
        const products = await response.json();
        console.log('products:',products)
        res.render('home', {products: products.data});
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).render('error', { message: 'Error al cargar los productos' });
    }
});

router.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid

    try {
        console.log(pid)
       
        const product = await ProController.getOne({_id:pid});
        res.render('product', {product});
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).render('error', { message: 'Error al cargar los productos' });
    }
});

router.get('/products/paginated/:pg',  async(req, res) => {
    const pg = req.params.pg;
    const products = await ProController.getPaginated(pg)
    console.log('Límite:', pg);
    res.status(200).render('home', { products });
});

router.get('/realTimeProducts', (req,res)=> {
    res.status(200).render('realTimeProducts')
})

router.get('/realTimeProducts/paginated/:pg', (req,res)=> {
    const pg = req.params.pg
    res.status(200).render('realTimeProducts', {pg})
})

router.get('/realTimeProducts/:pid?', async (req, res)=> {
    const pid = req.params.pid;
    try {
        const product = await ProController.getOne({_id:pid});
        console.log('pid:',pid)
        console.log(product)
        res.render('product', { product });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).render('error', { message: 'Error al cargar los productos' });
    }
})

router.get('/carts', (req, res)=> {
    res.status(200).render('carts')
})

router.get('/:cid/products', async (req, res) => {
    const cid = req.params.cid;

    try {
        const products = await ProController.get();
        res.render('home', { products, cid });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).render('error', { message: 'Error al cargar los productos' });
    }
});

export default router;