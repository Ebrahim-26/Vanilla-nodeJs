const http = require("http");
const { getProducts, getProduct, createProduct } = require("./controllers/productController");
const server = http.createServer((req, res) => {
  //Creates a new web server object.
  // ## 1st COMMENT

  // res.statusCode = 200
  // res.setHeader('Content-Type','text/html')
  // res.write('<h1>Hello</h1>')
  // res.end()

  // ^^^ Instead of doing all the above lines, we can simply shorten up with writeHead and end
  if (req.url === "/api/products" && req.method === "GET") {
    // This is the api point that gets hit.
    getProducts(req, res);

  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
    // this url expects 'api/product/*number* and it should be a GET call
    const id = req.url.split("/")[3]; //splitting the url with slash, Since we only want the Id, we are targetting the Id 3rd index
    getProduct(req, res, id); //passing the id in to the controller function

  } 
  else if(req.url === '/api/products' && req.method === 'POST'){
    createProduct(req,res)
  } else { 
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`server is running on the port ${PORT}`));
