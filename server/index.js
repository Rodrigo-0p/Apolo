const express = require('express');
const pool = require("./conexion/conexion");
const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', //con el * aprobamos que todos los dominios tenga acceso al la api 
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));app.use(express.urlencoded({ extended: false }));
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