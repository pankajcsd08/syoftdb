const { Router } = require('express');
const userLogin = require("../controllers/loginController");

const router = Router();

router.post("/user",(req, res, next)=> next(), userLogin); 
module.exports = router;
