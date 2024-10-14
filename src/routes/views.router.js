import { Router } from "express";
import { promises as fs } from 'fs'

const router = Router();

async function fetchProducts(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(data);
        console.log('Productos cargados:', products); // Verifica los productos en la consola
        return products;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        return [];
    }
}

router.get('/', (req, res) => {
    const data = {  
        firstname: 'Juan',
        lastname: 'Perez',
        age: 25,
        email: 'juanperez@gmail.com',
        phone: '1234567890'
    }
    res.status(200).render('index', data)
})

router.get('/chat', (req, res) => {
    const data = {
    }
    
    res.status(200).render('chat', data)
})

router.get('/home', async (req, res) => {
    try {
        const products = await fetchProducts('./src/products.json');
        console.log('Productos a renderizar:', products); // Verifica los productos antes de renderizar
        res.render('home', { products: products }); // Asegúrate de pasar los productos explícitamente
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).render('error', { message: 'Error al cargar los productos' });
    }
});

router.get('/realTimeProducts', (req,res)=> {
    const data = {

    }

    res.status(200).render('realTimeProducts', data)
})
export default router;
