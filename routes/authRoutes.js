const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const auth = require('../middlewares/authMiddleware')

// Ruta /api/auth

router.post('/',
                authController.auth)

router.get('/',
          auth,
          authController.userAuth      
)
module.exports = router