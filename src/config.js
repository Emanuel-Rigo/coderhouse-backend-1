import * as url from "url";

const config = {
  PORT: 8080,
  DIRNAME: url.fileURLToPath(new URL(".", import.meta.url)),

  // funcion tipo getter

  get UPLOADS_DIR() {
    return `${this.DIRNAME}/public/uploads`;
  },
  //MONGODB_URI: "mongodb://localhost:27017/coder70275",
  MONGODB_URI:
    "mongodb+srv://emanuelRigo:samsung055Coder@cluster-movielist-api.p9kfo.mongodb.net/cursoCoder",
  CART_COLLECTION: 'carts',
  PRODUCTS_COLLECTION: 'products'
};

export default config;
