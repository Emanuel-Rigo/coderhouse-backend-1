import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

// Anulamos comportamiento de renombre por defecto de colecciones
mongoose.pluralize(null);
import config from "../../config.js";

// Colección
const collection = config.CART_COLLECTION;

const schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: config.CART_COLLECTION,
    },
    products: {
      type: [{ _id: mongoose.Schema.Types.ObjectId, quantity: Number }]
    },
  },
  { timestamps: true }
);
schema.plugin(mongoosePaginate);

// Generamos modelo
const cartModel = mongoose.model(collection, schema);

export default cartModel;
