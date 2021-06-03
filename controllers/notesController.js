const Notes = require('../models/noteModel')
const { validationResult } = require('express-validator')

exports.createNote = async(req,res) => {
    // revisar si hay errores 
    const errores = validationResult(req)
    
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array() })
    }


    try {
        //crear nueva nota
        const note = new Notes({
            name:req.body.name
        })

        //guardar creador via JWT
        note.creator = req.user.id

        //guardar proyecto
        await note.save()
        res.json(note)



    } catch (error) {
        console.log("error "+ error)
        res.status(400).send("Hubo un error")
    }
}

exports.getAll = async(req,res) => {
    try {
        
        const document = await Notes.find({creator: req.user.id})
        res.json(document)
        
    } catch (error) {
        console.log('Error en el metodo GET ' + error)
        res.status(500).send('Error al traer las notes')
    }
}


exports.deleteNote = async(req,res)=> {
    try {
                // revisar el ID
        let note = await Notes.findById(req.params.id)


        // si el proyecto existe o no
        if(!note) {
            return res.status(404).json({msg: 'Nota no encontrada'})
        }

        // verificar el creador del la nota
        if(note.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        // Eliminar el proyecto
       await Notes.findOneAndRemove({_id:req.params.id})
       res.json({msg: 'nota eliminada'})


        
        
    } catch (error) {
        console.log(`error ${error}`)
        res.status(500).send('Erro en el servidor')
    }
}