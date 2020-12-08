const Pool = require("pg").Pool;
var config = require('./config');

const pool = new Pool({
    user:config.db.usuario,
    password:config.db.contraseña,
    host: "localhost",
    port: 5432,
    database:config.db.bdnombre
});

module.exports = pool;