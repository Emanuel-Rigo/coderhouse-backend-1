import { Router } from "express";
import { nanoid } from "nanoid";

import ProductController from "../dao/product.controller.js";

const router = Router();
const controller = new ProductController();

const midd1 = (req, res, next) => {
  console.log("se recibio una solicitud GET");
  next();
};

//let storeProducts = [];

// async function fetchProducts(filePath) {
//   try {
//     const data = await fs.promises.readFile(filePath, "utf-8");
//     storeProducts = JSON.parse(data);
//   } catch (error) {
//     console.error("Error reading JSON file:", error);
//   }
// }

// fetchProducts("./src/products.json");

// router.get("/", midd1, async (req, res) => {
//   const data = await controller.get()
//   res.status(200).send({ error: null, data});
// });+

router.get("/", async (req, res) => {
  try {

    const { limit = 10, page = 1, sort, query, available } = req.query;


    const limitNumber = parseInt(limit, 10);
    const pageNumber = parseInt(page, 10);

   
    if (isNaN(limitNumber) || limitNumber <= 0) {
      return res
        .status(400)
        .send({ error: "El parámetro 'limit' debe ser un número positivo." });
    }


    if (isNaN(pageNumber) || pageNumber <= 0) {
      return res
        .status(400)
        .send({ error: "El parámetro 'page' debe ser un número positivo." });
    }


    const filter = {};
    if (query) {
      console.log("si query", query);
      filter.category = query; 
      console.log("filter::", filter);
    }


    if (available) {
      if (available === 'true') {
        filter.status = true; 
      } else if (available === 'false') {
        filter.status = false; 
      }
      console.log("filter con disponibilidad:", filter);
    }

    let sortOptions;
    if (sort) {
      sortOptions = sort; 
      console.log('sort:', sortOptions); 
    }

  
    const options = {
      limit: limitNumber, 
      page: pageNumber,
      sort: sortOptions,
      filter: filter, 
    };

    const data = await controller.get(options); 

    res.status(200).send({ error: null, data });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

router.get("/paginated/:pg?", async (req, res) => {
  const pg = req.params.pg || 1;
  const data = await controller.getPaginated(pg);
  res.status(200).send({ error: null, data });
});

router.get("/all", async (req, res) => {
  const data = await controller.getAll();
  res.status(200).send({ error: null, data });
});

// router.get("/realTimeProducts/:pid?", async (req, res) => {
//   const productId = req.params.pid;
//   console.log('products:',productId)
//   const filter = { _id: productId };
//   console.log('filter:', filter)
//   console.log('hola')

//   try {
//     const product = await controller.getOne(filter);

//     if (!product) {
//       return res.status(404).send({ error: "Product not found", data: null });
//     }
//     res.status(200).send({ error: null, data: product });
//   } catch (error) {
//     console.error("Error al buscar el producto:", error);
//     res.status(500).send({ error: "Error al buscar el producto", data: null });
//   }
// });

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

  try {
    const process = await controller.add(newProduct);
    res.status(200).send({ error: null, data: process });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).send({ error: "Error al agregar el producto", data: [] });
  }
});

router.put("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const filter = { _id: productId };
  const updated = req.body;
  const options = { new: true };

  const process = await controller.update(filter, updated, options);

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

router.delete("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const filter = { _id: productId };
  const options = {};

  try {
    const product = await controller.delete(filter, options);

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
