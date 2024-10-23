import mongoose from "mongoose";

//Anulamos comportamiento de renombre por defecto de colleciones
mongoose.pluralize(null);

//coleccion
const collection = "products";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], default: [] },
  },
  { timestamps: true }
);

//generamos modelo
const productModel = mongoose.model(collection, schema);

export default productModel;
