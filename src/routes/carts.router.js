import { Router } from "express";
import { nanoid } from "nanoid";
import fs from "fs";

import CartController from "../dao/cart.controller.js";

const router = Router();
const controller = new CartController();
let storeCarts = [];

async function fetchCarts(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    storeCarts = JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
}

fetchCarts("./src/carts.json");

let storeProducts = [];

async function fetchProducts(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    storeProducts = JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
}

fetchProducts("./src/products.json");

router.get('/', async (req, res)=> {
    const process = await controller.get()
    res.status(200).send({error: null, data: process})
})

router.get("/:cid", async(req, res) => {
  const cartID = req.params.cid;
  try {
    const cart = await controller.getOne({_id:cartID});
    res.send({cart});
} catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).render('error', { message: 'Error al cargar los productos' });
}
});


router.post("/", async (req, res) => {
  const process = await controller.add({products: []});
  res.status(201).send({ error: null, data: process });
});

// router.post("/:cid/products/:pid", async (req, res) => {
//   const { cid, pid } = req.params;
//   const cart = storeCarts.find((c) => c.id == cid);
//   if (!cart) {
//     return res.status(404).send({ error: "Carrito no encontrado" });
//   }
//   const productExists = storeProducts.some((p) => p.id == pid);
//   if (!productExists) {
//     return res.status(404).send({ error: "Producto no encontrado" });
//   }
//   const productInCart = cart.products.find((p) => p.product == pid);
//   if (productInCart) {
//     productInCart.quantity += 1;
//   } else {
//     cart.products.push({ product: pid, quantity: 1 });
//   }
//   await fs.promises.writeFile(
//     "./src/carts.json",
//     JSON.stringify(storeCarts, null, 2)
//   );
//   res.status(200).send({ error: null, data: cart });
// });


router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await controller.getOne({ _id: cid });
    console.log('cart:', cart);
    
    if (!cart) {
        console.log('Carrito no encontrado:', cart);
        return res.status(406).send({ error: "Carrito no encontrado" });
    }
    
    const productInCart = cart.products.find((product) => product._id.toString() === pid);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        console.log('pid""""', pid);
        cart.products.push({ _id: pid, quantity: 1 });
    }
    
    console.log('cart2:', cart);
    
    const cartToUpdate = {
        _id: cart._id.toString(),
        products: cart.products
    };
    
    const updatedCart = await controller.addProduct(cartToUpdate);
    
    res.status(200).send({ error: null, data: updatedCart });
});

export default router;
