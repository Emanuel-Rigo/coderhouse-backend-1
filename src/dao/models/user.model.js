import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "users";

const schema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true, index: false },
  email: { type: String, required: true, unique: true },
});

const model = mongoose.model(collection, schema);

export default model;
