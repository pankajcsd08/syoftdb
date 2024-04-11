const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true,unique: true },
    count: Number,
    description: String,
    inventory: String,
});

module.exports = mongoose.model('Product', productSchema);
