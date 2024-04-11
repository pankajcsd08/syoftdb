
const Product = require('../models/Product');


const addItem = async (req, res) => {
    if (req.role !== "admin") {
        return res.status(401).send({
            message: "Unauthorized access",
          })
    }

    const { title, count,description,inventory } = req.body

    const product = await Product.create({
        title: title,
        count: count,
        description: description,
        inventory: inventory,
    })

    if(!product){
        return res.status(201).send({
            message: "product is not created",
          })
    }
    return res.status(200).send({
        data: product,
      })

}

const updateItem = async (req, res) => {

    if (req.role === "staff") {
        return res.status(401).send({
            message: "Unauthorized access",
          })
    }

    const { productId,title, count,description,inventory } = req.body

    if (!productId) {
        return res.status(400).send({
            message: "productId not provided",
          })
    }

    const product = await Product.findOneAndUpdate(
        {_id: productId}, // mongoose will convert string to id or we can use ObjectId()
        {
        ...(title? {title: title}:{}), // these will update only data that comes on payload otherwise it will remain same
        ...(count? {count: count}:{}),
        ...(description ? {description: description}:{}),
        ...(inventory? {inventory: inventory}:{}),
       },
       {
        new: true
       }
     )

    if(!product){
        return res.status(201).send({
            message: "product is not updated",
          })
    }
    return res.status(200).send({
        data: product,
      })

}

const deleteItem = async (req, res) => {

    if (req.role !== "admin") {
        return res.status(401).send({
            message: "Unauthorized access",
          })
    }

    const { productId } = req.body

    if (!productId) {
        return res.status(400).send({
            message: "productId not provided",
          })
    }

    const product = await Product.deleteOne({
        _id: productId, // mongoose will convert string to id or we can use ObjectId()
      })

    if(!product){
        return res.status(201).send({
            message: "product is not deleted",
          })
    }
    return res.status(200).send({
        message: "product is deleted succesfully",
      })

}

const fetchItem = async (req, res) => {
    if (req.role === "staff") {
        return res.status(401).send({
            message: "Unauthorized access",
          })
    }

    const { productId,title} = req.body

    const filter = {}

    if (productId) {
        filter._id = productId
    }

    if (title) {
        filter.title = { $regex: title, $options: "i" }
    }

    const products = await Product.find(filter)

    if(!products && products.length){
        return res.status(404).send({
            message: "No data found ",
          })
    }
    return res.status(200).send({
        data: products,
      })

}

module.exports = {
    addItem, 
    updateItem, 
    deleteItem, 
    fetchItem
  };

