const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.createUser = async (req,res) => {

    const { name, email, password, date } = req.body

    // revisar si hay errores
    const errores = validationResult(req)

    
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array() })
    }


    // comprobar que el usuario no existe
    const users = await User.findOne({ email })
    if(users){
        return res.status(400).send("El usuario ya existe")
    }


    try {
        const user = new User({
            name:name,
            email:email,
            password:password,
            date:date     
        })

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt )

        //Guardar el usuario
        await user.save()

        //Crear y firmar JWT
        const payload = {
            user:{
                id:user.id
            }
        }

        //Firmar JWT
        jwt.sign(payload,
                process.env.SECRETA,
                { expiresIn: 3600},
                (error,token)=>{
                    
                    if(error) throw error

                    //mensaje de confirmacion
                    res.json(token)
                }
            
            )

    } catch (error) {
        console.log(`error ${error}`)
        res.status(500).send("Error al ingresar usuario")
    }
}