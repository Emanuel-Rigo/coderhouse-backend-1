import cartModel from "./models/cart.model.js";


class CartController {
  constructor() {}

  get = async () => {
    try {
      return await cartModel.find().lean();
    } catch (err) {
      return err.message;
    }
  };

  getOne = async (data) => {
    try {
      console.log("data:", data);
      return await cartModel.findOne(data).lean();
    } catch (err) {
      console.error("Error al buscar el carrito:", err);
      return null;
    }
  };

  addProduct = async (data) => {
    try {
      console.log(data);
      
      // Define el filtro y el objeto de actualización
      const filter = { _id: data._id };
      const update = {
        $set: {
          products: data.products, // Actualiza la lista de productos
          updatedAt: new Date() // Actualiza la fecha de modificación
        }
      };

      // Realiza la actualización
      return await cartModel.findOneAndUpdate(filter, update, { new: true }).lean(); // Devuelve el carrito actualizado
    } catch (err) {
      console.error("Error al actualizar el carrito", err); // Manejo de errores
    }
  };

  add = async (data) => {
    try {
      return await cartModel.create(
        {data}
      );
    } catch (err) {
      return err.message;
    }
  };

  update = async (filter, updated, options) => {
    try {
      return await cartModel.findOneAndUpdate(filter, updated, options);
    } catch (err) {
      return err.message;
    }
  };

  delete = async (data, options) => {
    try {
      return await cartModel.findOneAndDelete(data, options); 
    } catch (err) {
      return err.message;
    }
  };
}

export default CartController;
