const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){

    // Leer el token que recibe el  header
    const token = req.header('x-auth-token')

    // Revisaro si hay token 
    if(!token){
        return res.status(500).json({msg:"No hay token, permiso no valido"})
    }

    // Validar token
    try {
        const cifrado = jwt.verify(token,process.env.SECRETA)
        req.user = cifrado.user
        next()
        
    } catch (error) {
        res.status(500).send('Hubo un error al validar token')
    }
}