const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersController')
const { check } = require('express-validator')

// Route /api/users

router.post('/',
                [
                    check('name', 'El nombre es obligatorio').not().isEmpty(),
                    check('email', 'Agrega un email valido').isEmail(),
                    check('password', 'el password debe ser minimo de 6 caracteres').isLength({ min: 6})
                ],
                userController.createUser
)

module.exports = router