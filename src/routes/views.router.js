import { Router } from "express";
import { promises as fs } from 'fs'

const router = Router();

async function fetchProducts(filePath, limit) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(data);
        if (limit) {
            return products.slice(0, limit);
        } else {
            return products;
        }
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        return [];
    }
}

router.get('/', async (req, res) => {
    try {
        const products = await fetchProducts('./src/products.json', limit);
        res.render('home', { products: products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).render('error', { message: 'Error al cargar los productos' });
    }
});

router.get('/realTimeProducts', (req,res)=> {
    const params = req.query; 
    const paginated = params.limit;
        
    console.log('Límite:', limit);
    res.status(200).render('realTimeProducts', {limit})
})


router.get('/realTimeProducts/paginated/:pg?', (req,res)=> {
    const params = req.query; 
    const paginated = params.pg;
        
    console.log('Límite:', limit);
    res.status(200).render('realTimeProducts', {pg})
})

router.get('/cart', (req, res)=> {
    res.status(200).render('cart')
})

export default router;