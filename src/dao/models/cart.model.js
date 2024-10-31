import mongoose from "mongoose";
import config from "../../config";

//Anulamos comportamiento de renombre por defecto de colleciones
mongoose.pluralize(null);

//coleccion
const collection = config.CART_COLLECTION;

const schema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: config.CART_COLLECTION,
  },
  products: {
    type: [{ _id: mongoose.Schema.Types.ObjectId, qty: Number }],
    required: true,
  },
});

//generamos modelo
const cartModel = mongoose.model(collection, schema);

export default cartModel;
