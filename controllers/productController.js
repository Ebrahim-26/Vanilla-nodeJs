// 'controller' - controller is going to controller wha the particular route is doing. like the status, header and what we are sending.
//                 It is also doing to interact with the model.

const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// Gets all products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    // ^^^ writeHead gets the status code and  type
    res.end(JSON.stringify(products)); //No need to stringy while using express
  } catch (error) {
    console.log(error);
  }
}

// get products with ID
async function getProduct(req, res, id) {
  //Sends the ID as argument in to the function
  try {
    const product = await Product.findById(id); //calling the findById function with the id, the data gets filtered in product modal.
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

//POST: create product
async function createProduct(req, res) {
  try {
    const body = await getPostData(req); //the getPostData catches the request body and resoleves (returns) it to this body

    const { title, description, price } = JSON.parse(body); // title,descp and price are destructured from the above body, which we initially got from the request

    const product = {
      // we are then assigning the destructured data to product
      title,
      description,
      price,
    };
    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Tpye": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

//PUT: update product
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));

    } else {
      const body = await getPostData(req); 
  
      const { title, description, price } = JSON.parse(body); 
  
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updatedProduct = await Product.update(id,productData);
  
      res.writeHead(200, { "Content-Tpye": "application/json" });
      return res.end(JSON.stringify(updatedProduct));

    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
};
