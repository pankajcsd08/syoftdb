const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    role: { type: String, enum: ['admin', 'manager', 'staff'], default: 'staff' },
    gender: String,
    address: String, 
    password: String,
});

module.exports = mongoose.model('User', userSchema);
