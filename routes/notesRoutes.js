const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const { check } = require('express-validator')
const notesController = require('../controllers/notesController')

// Ruta /api/notes

router.post('/',
            auth,
            [
                check('name','el nombre de la nota es obligatorio').not().isEmpty()
            ],
            notesController.createNote
)

router.get( '/',
            auth,
            notesController.getAll
)


router.delete( '/:id',
            auth,
            notesController.deleteNote
);

module.exports = router