import express from "express"
import { nanoid } from 'nanoid';
import fs from 'fs'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//////////////////// PRPDUCTS //////////////////////

let storeProducts = [];

async function fetchJSON(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    storeProducts = JSON.parse(data);
    console.log(storeProducts);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
}

fetchJSON('./src/products.json');


  
app.get('/api/products', (req, res) => {
    const limit = parseInt(req.query.limit) || storeProducts.length;
    const limitedProducts = storeProducts.slice(0, limit);
    res.status(200).send({ error: null, data: limitedProducts });
});

app.get('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid); 
    const product = storeProducts.find(product => product.id === productId);
    if (!product) {
        return res.status(404).send({ error: "Product not found", data: null });
    }
    res.status(200).send({ error: null, data: product });
});

app.post('/api/products',async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category) {
        return res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }

    const newProduct = {
        id: nanoid(10), 
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails: thumbnails || []
    };
    storeProducts.push(newProduct);
    await fs.promises.writeFile('./src/products.json', JSON.stringify(storeProducts));
    res.status(200).send({ error: null, data: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = storeProducts.findIndex(element => element.id === id);

  if (index !== -1) {
      let updatedProduct = { ...storeProducts[index], ...req.body };
      storeProducts[index] = updatedProduct;
      res.status(200).send({ error: null, data: updatedProduct });
  } else {
      res.status(404).send({ error: 'No se encuentra el producto', data: [] });
  }
});

app.delete('/api/products/:id', (req,res)=> {
    const id = parseInt(req.params.id)
    const index = storeProducts.findIndex(element => element.id === id)
    if (index !== -1) {
        storeProducts.splice(index, 1)
        res.status(200).send({error: null, data: 'producto borrado'})
    } else {res.status(404).send({error: 'no se encuentra el producto', data: []})

    }
})



////////////////// CART //////////////////

const carts = [
  {id: 1,
    products: [{id:1, quantity: 2}]
  }
  ]

app.get('/api/carts/:cid', (req, res) => {
    const cartID = parseInt(req.params.cid); 
    const cart = carts.find(element => element.id === cartID);
    if (!cart) {
        return res.status(404).send({ error: "Cart not found", data: null });
    }
    
    res.status(200).send({ data: cart.products });
});

app.post('/api/carts', (req, res)=> {
 const newCart = {id: nanoid(10),products: []}
  carts.push(newCart)

 res.status(201).send({error: null, data: newCart})
})



app.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const cart = carts.find(c => c.id === cid);
  if (!cart) {
    return res.status(404).send({ error: 'Carrito no encontrado' });
  }
  const productInCart = cart.products.find(p => p.product === pid);
  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }
  res.status(200).send({ error: null, data: cart });
});





app.listen(PORT, ()=> {
    console.log(`Server activo en puerto ${PORT}`)
})