import productModel from "./models/product.model.js";

class ProductController {
  constructor() {}

  getAll = async () => {
    try {
      return await productModel.find().lean();
    } catch (err) {
      return err.message;
    }
  };

  get = async (options) => {
    try {
      const { limit = 10, page = 1, sort, filter } = options;

      // Construir el filtro
      
      if (filter) {
        //filter.category = { $regex: query, $options: 'i' }; // Búsqueda insensible a mayúsculas en la categoría
        console.log(filter)
      }

      // Configurar opciones de ordenamiento
      let sortOptions;
      if (sort) {
        sortOptions = { price: sort === 'asc' ? 1 : -1 }; // Ordenar por precio
      }

      // Realizar la paginación
      return await productModel.paginate(filter, {
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
        sort: sortOptions,
        lean: true
      });
    } catch (err) {
      return err.message;
    }
  };

  getOne = async (data) => {
    try {
      console.log("data:", data);
      return await productModel.findOne(data).lean();
    } catch (err) {
      console.error("Error al buscar el producto:", err);
      return null;
    }
  };

  getPaginated = async (pg) => {
    try {
      const page = pg || 1;
      return await productModel.paginate(
        {},
        { limit: 10, page: page, lean: true }
      );
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
