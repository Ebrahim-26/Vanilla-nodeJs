const http = require("http");
const products = require("./data/products.json"); //getting the data from the json file
const server = http.createServer((req, res) => { //Creates a new web server object.
  // ## 1st COMMENT

  // res.statusCode = 200
  // res.setHeader('Content-Type','text/html')
  // res.write('<h1>Hello</h1>')
  // res.end()

  // ^^^ Instead of doing all the above lines, we can simply shorten up with writeHead and end
  if (req.url === "/api/products" && req.method === "GET") {
    // This is the api point that gets hit.
    res.writeHead(200, { "Content-Type": "application/json" });
    // ^^^ writeHead gets the status code and  type
    res.end(JSON.stringify(products)); //No need to stringy while using express
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`server is running on the port ${PORT}`));
