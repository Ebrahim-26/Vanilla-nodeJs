// 'controller' - controller is going to controller wha the particular route is doing. like the status, header and what we are sending.
//                 It is also doing to interact with the model.

const Product = require("../models/productModel");

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
async function getProduct(req, res, id) { //Sends the ID as argument in to the function
  try {
    const product = await Product.findById(id); //calling the findById function with the id, the data gets filtered in product modal.
    if (!product){
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({message:'Product not found'})); 
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
    const product = {
      title: 'test pro',
      description:'This is a test product',
      price: 100,
    }

    const newProduct = await Product.create(product)
    res.writeHead(201,{'Content-Tpye':'application/json'})
    return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
};
