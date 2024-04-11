const { Router } = require('express');
const { addItem, updateItem, deleteItem, fetchItem}= require("../controllers/productController");
const { authenticate } = require('../middleware/auth');

const router = Router();

router.post("/create",authenticate, addItem);
router.put("/update",authenticate, updateItem);
router.delete("/delete",authenticate, deleteItem);
router.get("/get",authenticate, fetchItem);
module.exports = router;
