const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.auth = async ( req,res )=> {

     // revisar si hay errores
     const errores = validationResult(req)
    
     if(!errores.isEmpty()) {
         return res.status(400).json({errores: errores.array() })
     }

    const { email, password } = req.body

    try {
        // Revisar el email
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send('El email ingresado no existe')
        }
        
        
        // Revisar el password
        const passCorrecto = await bcryptjs.compare(password, user.password)
        if(!passCorrecto){
            return res.status(400).send('Password incorrecto')
        }

        // Si todo es correcto
        // Crear y firmar JWT
        const payload = {
            user:{
            id: user.id
            }
        };

        //firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
                expiresIn: 3600
        }, (error,token) => {
                if(error) throw error;
                //mensaje de confirmacion
                res.json({ token })
    
                })
    
    } catch (error) {
        
        res.status(500).send('Ha ocurrido un error')
    }
}

exports.userAuth = async(req, res) => {
    try {
        const usuario = await User.findById(req.user.id).select('-password')
        res.json(usuario)
    } catch (error) {
        res.status(500).send('Ha ocurrido un error')
    }
}
