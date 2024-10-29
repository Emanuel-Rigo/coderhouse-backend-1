import { Router } from "express";
import { nanoid } from "nanoid";
import fs from "fs";

import ProductController from "../dao/product.controller.js";

import productModel from "../dao/models/product.model.js";

const router = Router();
const controller = new ProductController()


let storeProducts = [];

const midd1 = (req, res, next) => {
  console.log("se recibio una solicitud GET");
  next();
};

router.get("/", midd1, async (req, res) => {
  const data = await controller.get()

  const limit = parseInt(req.query.limit) || data.length;
  const limitedProducts = data.slice(0, limit);
  res.status(200).send({ error: null, data: limitedProducts });
});

// async function fetchProducts(filePath) {
//   try {
//     const data = await fs.promises.readFile(filePath, "utf-8");
//     storeProducts = JSON.parse(data);
//   } catch (error) {
//     console.error("Error reading JSON file:", error);
//   }
// }

// fetchProducts("./src/products.json");


router.get("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const filter = { _id: productId };

  try {
    const product = await productModel.findOne(filter);

    if (!product) {
      return res.status(404).send({ error: "Product not found", data: null });
    }
    res.status(200).send({ error: null, data: product });
  } catch (error) {
    console.error("Error al buscar el producto:", error);
    res.status(500).send({ error: "Error al buscar el producto", data: null });
  }
});

router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  const status = req.body.status === undefined ? true : req.body.status;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    status === undefined ||
    !stock ||
    !category
  ) {
    return res
      .status(400)
      .send({ error: "Faltan campos obligatorios", data: [] });
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
    thumbnails: thumbnails || [],
  };

  /////cambiar a mongo a partir de aqui
  //   storeProducts.push(newProduct);
  //   await fs.promises.writeFile(
  //     "./src/products.json",
  //     JSON.stringify(storeProducts, null, 2)
  //   );

  const process = await controller.add(newProduct)

  res.status(200).send({ error: null, data: process });
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const filter = { _id: productId };
  const updated = req.body;
  const options = { new: true };

  const process = await controller.update(filter, updated, options)

  //   const index = storeProducts.findIndex((element) => element.id == id);

  //   if (index !== -1) {
  //     let updatedProduct = { ...storeProducts[index], ...req.body };
  //     storeProducts[index] = updatedProduct;
  //     await fs.promises.writeFile(
  //       "./src/products.json",
  //       JSON.stringify(storeProducts, null, 2)
  //     );
  if (process) {
    res.status(200).send({ error: null, data: process });
  } else {
    res.status(404).send({ error: "No se encuentra el producto", data: [] });
  }
});

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   const index = storeProducts.findIndex((element) => element.id == id);
//   if (index !== -1) {
//     storeProducts.splice(index, 1);
//     await fs.promises.writeFile(
//       "./src/products.json",
//       JSON.stringify(storeProducts, null, 2)
//     );
//     res.status(200).send({ error: null, data: "producto borrado" });
//   } else {
//     res.status(404).send({ error: "no se encuentra el producto", data: [] });
//   }
// });

router.delete("/:pid", async (req, res) => { 
  const productId = req.params.pid; 
  const filter = { _id: productId }; 
  const options = {}

  try {
    const product = await controller.delete(filter, options)

    if (!product) {
      return res.status(404).send({ error: "Product not found", data: null }); 
    }
    res.status(200).send({ error: null, data: product }); 
  } catch (error) {
    console.error("Error al borrar el producto:", error); 
    res.status(500).send({ error: "Error al borrar el producto", data: null });
  }
});

export default router;
