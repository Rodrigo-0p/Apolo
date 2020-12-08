//colors para pintar result por consola
const colors = require('colors');
//importamos router
const router = require('express').Router();
//importamos la conexion
const pool = require('../conexion/conexion');
//importamos jsonwebtoken
const jwt = require('jsonwebtoken');
//Importamos el keySecretToken
const tokenConfig = require('./configToken/configToken')
//validaciones requerida
const Joi = require('@hapi/joi');
//cifrar la congtraseña
const bcrypt = require('bcrypt');

//valores requerido para la insercion 
const esquemaRegistro = Joi.object({
    nombre: Joi.string().min(2).max(35).required(),
    email: Joi.string().max(35).required().email(),
    contraseña: Joi.string().min(6).max(1024).required()
});

//valores requerido para el login
const esquemaLogin = Joi.object({
    email: Joi.string().max(35).required().email(),
    contraseña: Joi.string().min(6).max(1024).required()
});

//get de Login
router.post('/login', async(req, res) => {
    //validamos el resultado obtenido
    const {error} = esquemaLogin.validate(req.body);
    if(error){
        return  res.status(400).json(
            {
                error:true,
                message:error.details[0].message
            });
    }

    //validamos si el usuario
    const existeUsuario = await pool.query(`select * from usuario where email in ('${req.body.email}')`);

    if(existeUsuario.rows.length > 0){
        
        //validamos la contraseña inscriptada
        const validacionContra = await bcrypt.compare(req.body.contraseña, existeUsuario.rows[0].contraseña);

        if(!validacionContra){
            
            return res.status(400).json({error:true, message:"contraseña mal escrita"});    
        }else{
            
            //Generamos un token
            const token = jwt.sign({
                nombre:existeUsuario.rows[0].nombre,
                id: existeUsuario.rows[0].iduser
            }, tokenConfig.token.keySecret)

            res.header('auth-token', token).json({
                    error:null,
                    data:{token}
            });
        }
    }else{
        return res.status(400).json({error:true, message:"email no Registrado"});
    }
});

//Post de registro
router.post('/registrar', async (req, res) => {

    //obtenemos la fecha y la hora del sistemas
    let fechacrea = new Date();
    
    // validacion de usuario campos vacios
    const {error} = esquemaRegistro.validate(req.body);
    if(error){
        return  res.status(400).json(
        {
            error: true,
            message: error.details[0].message
        })
    }

    //validacion del email
    const existeElEmail = await pool.query(`select email from usuario where email in ('${req.body.email}')`);
    if(existeElEmail.rows.length > 0){
        return res.status(400).json(
        {
            error:true,
            message:'ya existe una cuenta con ese Email'
        });
    }

    //has contraseña (ciframos la contraseña)
    const saltos = await bcrypt.genSalt(10);
    const contraseña = await bcrypt.hash(req.body.contraseña, saltos);
    
    //obtemos los valores
    const { nombre, email} = req.body; 

    //insert de datos en la BSD
    try {
       const newTodo = await pool.query(
            "insert into usuario(nombre, email, contraseña,fechacrea) values ($1,$2,$3,$4) RETURNING *",
            [nombre, email,contraseña, fechacrea]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error("ha ocurrido un error".red,error.message);
        res.status(400).json({ error });
    }
});

module.exports = router;