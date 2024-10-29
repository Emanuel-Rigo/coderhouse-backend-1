import productModel from "./models/product.model.js";


class ProductController {
  constructor() {}

  get = async () => {
    try {
      return await productModel.find().lean();
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

  delete = async (data) => {
    try {
      return await productModel.findOneAndDelete(data); 
    } catch (err) {
      return err.message;
    }
  };
}

export default ProductController;
