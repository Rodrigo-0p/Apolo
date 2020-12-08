//importamos jsonwebtoken
const jwt = require('jsonwebtoken');
//Importamos el keySecretToken
const tokenConfig = require('../configToken/configToken')


const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).json({ error: true, message: "acceso denegado!" });
    
    try {
        //verificamos si el token que obtenemos es valido
        const verique = jwt.verify(token, tokenConfig.token.keySecret);
        req.usuario = verique;
        next();
        
    } catch (error) {
        res.status(400).json({error:true, message:'token no valiadmindo'});
    }
}

module.exports = verifyToken;