const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const register = require('./routes/registerRoutes')
const login = require('./routes/loginRoutes')
const product = require('./routes/productRoutes')



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/register", register);

app.use("/api/login", login);

app.use("/api/product", product); 



module.exports = app;