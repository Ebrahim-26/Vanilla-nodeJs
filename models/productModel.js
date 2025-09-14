//Models deals with data bases
// moving the product from server.js file to productModel
const products = require("../data/products.json"); //getting the data from the json file

function findAll(){
    return new Promise((resolve, reject) => {
        console.log('Find all')
        resolve(products)
    })
}

function findById(id){
    return new Promise((resolve, reject) => {
        const product = products.find((p)=>p.id === id)
        resolve(product)
    })
}

module.exports = {
    findAll,
    findById,
} 