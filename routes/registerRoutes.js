const { Router } = require('express');
const userRegister = require("../controllers/registerController");


const router = Router();

router.post("/user",(req, res, next)=> next(), userRegister); 
module.exports = router;
