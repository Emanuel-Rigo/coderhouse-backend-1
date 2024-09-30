import express from "express"

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const storeProducts = [
    {
      id: 1,
      title: "Laptop",
      description: "High-performance laptop for all your needs.",
      code: "LP1001",
      price: 1200,
      status: true,
      stock: 10,
      category: "Electronics",
      thumbnails: [
        "/images/laptop1.jpg",
        "/images/laptop2.jpg"
      ]
    },
    {
      id: 2,
      title: "Smartphone",
      description: "Latest model smartphone with powerful features.",
      code: "SP2002",
      price: 800,
      status: true,
      stock: 15,
      category: "Electronics",
      thumbnails: [
        "/images/smartphone1.jpg",
        "/images/smartphone2.jpg"
      ]
    },
    {
      id: 3,
      title: "Headphones",
      description: "Noise-cancelling headphones with superior sound.",
      code: "HD3003",
      price: 150,
      status: true,
      stock: 30,
      category: "Accessories",
      thumbnails: [
        "/images/headphones1.jpg",
        "/images/headphones2.jpg"
      ]
    },
    {
      id: 4,
      title: "Gaming Chair",
      description: "Ergonomic gaming chair for long hours of play.",
      code: "GC4004",
      price: 300,
      status: true,
      stock: 5,
      category: "Furniture",
      thumbnails: [
        "/images/gamingchair1.jpg",
        "/images/gamingchair2.jpg"
      ]
    },
    {
      id: 5,
      title: "Coffee Maker",
      description: "Brew the perfect cup of coffee every time.",
      code: "CM5005",
      price: 100,
      status: true,
      stock: 8,
      category: "Home Appliances",
      thumbnails: [
        "/images/coffeemaker1.jpg",
        "/images/coffeemaker2.jpg"
      ]
    },
    {
      id: 6,
      title: "Bluetooth Speaker",
      description: "Portable speaker with high-quality sound.",
      code: "BS6006",
      price: 50,
      status: true,
      stock: 20,
      category: "Electronics",
      thumbnails: [
        "/images/speaker1.jpg",
        "/images/speaker2.jpg"
      ]
    },
    {
      id: 7,
      title: "Washing Machine",
      description: "Energy-efficient washing machine with large capacity.",
      code: "WM7007",
      price: 500,
      status: true,
      stock: 4,
      category: "Home Appliances",
      thumbnails: [
        "/images/washingmachine1.jpg",
        "/images/washingmachine2.jpg"
      ]
    },
    {
      id: 8,
      title: "Refrigerator",
      description: "Spacious refrigerator with freezer compartment.",
      code: "RF8008",
      price: 1200,
      status: true,
      stock: 3,
      category: "Home Appliances",
      thumbnails: [
        "/images/fridge1.jpg",
        "/images/fridge2.jpg"
      ]
    },
    {
      id: 9,
      title: "Desk Lamp",
      description: "Adjustable desk lamp with LED lighting.",
      code: "DL9009",
      price: 25,
      status: true,
      stock: 40,
      category: "Furniture",
      thumbnails: [
        "/images/desklamp1.jpg",
        "/images/desklamp2.jpg"
      ]
    },
    {
      id: 10,
      title: "Tablet",
      description: "Lightweight tablet with high-resolution display.",
      code: "TB1010",
      price: 400,
      status: true,
      stock: 12,
      category: "Electronics",
      thumbnails: [
        "/images/tablet1.jpg",
        "/images/tablet2.jpg"
      ]
    },
    {
      id: 11,
      title: "Electric Kettle",
      description: "Quick-boil electric kettle with automatic shut-off.",
      code: "EK1111",
      price: 40,
      status: true,
      stock: 25,
      category: "Home Appliances",
      thumbnails: [
        "/images/kettle1.jpg",
        "/images/kettle2.jpg"
      ]
    },
    {
      id: 12,
      title: "Yoga Mat",
      description: "Comfortable and durable yoga mat for all fitness levels.",
      code: "YM1212",
      price: 30,
      status: true,
      stock: 18,
      category: "Sports",
      thumbnails: [
        "/images/yogamat1.jpg",
        "/images/yogamat2.jpg"
      ]
    },
    {
      id: 13,
      title: "Smartwatch",
      description: "Fitness-focused smartwatch with heart rate monitor.",
      code: "SW1313",
      price: 200,
      status: true,
      stock: 10,
      category: "Accessories",
      thumbnails: [
        "/images/smartwatch1.jpg",
        "/images/smartwatch2.jpg"
      ]
    },
    {
      id: 14,
      title: "Running Shoes",
      description: "Lightweight and comfortable running shoes.",
      code: "RS1414",
      price: 100,
      status: true,
      stock: 22,
      category: "Sports",
      thumbnails: [
        "/images/runningshoes1.jpg",
        "/images/runningshoes2.jpg"
      ]
    },
    {
      id: 15,
      title: "Sofa",
      description: "Modern and comfortable 3-seater sofa.",
      code: "SF1515",
      price: 800,
      status: true,
      stock: 2,
      category: "Furniture",
      thumbnails: [
        "/images/sofa1.jpg",
        "/images/sofa2.jpg"
      ]
    }
  ];

const carts = []
  


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

app.post('/api/products', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category) {
        return res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }

    const newProduct = {
        id: storeProducts.length + 1, 
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


app.listen(PORT, ()=> {
    console.log(`Server activo en puerto ${PORT}`)
})