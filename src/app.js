import express from "express"
import { nanoid } from 'nanoid';
import fs from 'fs'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//////////////////// PRPDUCTS //////////////////////

let storeProducts = [];
let storeCarts = []

async function fetchJSON(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    storeProducts = JSON.parse(data);
 console.log(storeProducts)
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
}

fetchJSON('./src/products.json');


async function fetchJSON2(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    storeCarts = JSON.parse(data);
 console.log(storeCarts)
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
}

fetchJSON2('./src/carts.json')


  
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
    fetchJSON('./src/products.json');
    res.status(200).send({ error: null, data: newProduct });
});

app.put('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const index = storeProducts.findIndex(element => element.id === id);

  if (index !== -1) {
      let updatedProduct = { ...storeProducts[index], ...req.body };
      storeProducts[index] = updatedProduct;
      await fs.promises.writeFile('./src/products.json', JSON.stringify(storeProducts));
      fetchJSON('./src/products.json');
      res.status(200).send({ error: null, data: updatedProduct });
  } else {
      res.status(404).send({ error: 'No se encuentra el producto', data: [] });
  }
});

app.delete('/api/products/:id', async (req,res)=> {
    const id = parseInt(req.params.id)
    const index = storeProducts.findIndex(element => element.id === id)
    if (index !== -1) {
        storeProducts.splice(index, 1)
    await fs.promises.writeFile('./src/products.json', JSON.stringify(storeProducts));
        
        res.status(200).send({error: null, data: 'producto borrado'})
    } else {res.status(404).send({error: 'no se encuentra el producto', data: []})

    }
})



////////////////// CARTs //////////////////

app.get('/api/carts/:cid', (req, res) => {
    const cartID = parseInt(req.params.cid); 
    const cart = storeCarts.find(element => element.id === cartID);
    if (!cart) {
        return res.status(404).send({ error: "Cart not found", data: null });
    }
    
    res.status(200).send({ data: cart.products });
});

app.post('/api/carts', async(req, res)=> {
 const newCart = {id: nanoid(10),products: []}
  storeCarts.push(newCart)
  await fs.promises.writeFile('./src/carts.json', JSON.stringify(storeCarts));
fetchJSON2('./src/carts.json')

 res.status(201).send({error: null, data: newCart})
})

// app.post('/:cid/product/:pid', async (req, res) => {
//   const { cid, pid } = req.params;
//   const cart = storeCarts.find(c => c.id === cid);
//   if (!cart) {
//     return res.status(404).send({ error: 'Carrito no encontrado' });
//   }
//   const productInCart = cart.products.find(p => p.product === pid);
//   if (productInCart) {
//     productInCart.quantity += 1;
//   } else {
//     cart.products.push({ product: pid, quantity: 1 });
//   }
//   await fs.promises.writeFile('./src/carts.json', JSON.stringify(storeCarts));
// fetchJSON2('./src/carts.json')

//   res.status(200).send({ error: null, data: cart });
// });


app.post('/api/carts/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = storeCarts.find(c => c.id == cid);
  if (!cart) {
    return res.status(404).send({ error: 'Carrito no encontrado' });
  }
  const productExists = storeProducts.some(p => p.id == pid);
  if (!productExists) {
    return res.status(404).send({ error: 'Producto no encontrado' });
  }
  const productInCart = cart.products.find(p => p.product === pid);
  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }
  await fs.promises.writeFile('./src/carts.json', JSON.stringify(storeCarts, null, 2));
  fetchJSON2('./src/carts.json');

  res.status(200).send({ error: null, data: cart });
});


/////// LISTEN
app.listen(PORT, ()=> {
    console.log(`Server activo en puerto ${PORT}`)
})