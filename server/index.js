const express = require('express');
const bodyparser = require('body-parser');
const pool = require("./conexion/conexion");

const app = express();

// capturar body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// import routes
const router = require('./routes/router');
const validateToken = require('./routes/middleware/validateToken');
const admin = require('./routes/admin');

// route middlewares
app.use('/api/user', router);
app.use('/api/admin',validateToken,admin);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor en: ${PORT}`)
});