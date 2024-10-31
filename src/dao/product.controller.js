import productModel from "./models/product.model.js";


class ProductController {
  constructor() {}

  get = async () => {
    try {
      return await productModel.find().limit(10).lean();
    } catch (err) {
      return err.message;
    }
  };

  getOne = async (data) => {
    try {
      console.log(data);
      return await productModel.findOne(data).lean();
    } catch (err) {
      console.error('Error al buscar el producto:', err);
      return null;
    }
  };

  getPaginated = async (page) => {
    try {
      return await productModel.find().skip(page * 10).limit(10).lean();
    } catch (err) {
      return err.message;
    }
  };

  add = async (data) => {
    try {
      return await productModel.create(data);
    } catch (err) {
      return err.message;
    }
  };

  update = async (filter, updated, options) => {
    try {
      return await productModel.findOneAndUpdate(filter, updated, options);
    } catch (err) {
      return err.message;
    }
  };

  delete = async (data, options) => {
    try {
      return await productModel.findOneAndDelete(data, options); 
    } catch (err) {
      return err.message;
    }
  };
}

export default ProductController;
