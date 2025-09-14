//Models deals with data bases
// moving the product from server.js file to productModel
const products = require("../data/products.json"); //getting the data from the json file
const  {v4: uuidv4} = require('uuid')
const {writeDataToFile} = require('../utils')

function findAll(){
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function findById(id){
    return new Promise((resolve, reject) => {
        const product = products.find((p)=>p.id === id)
        resolve(product)
    })
}

function create(product){
    return new Promise((resolve, reject) => {
        const newProduct = {id:uuidv4(), ...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    })
}

module.exports = {
    findAll,
    findById,
    create
} 