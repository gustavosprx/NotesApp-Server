const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    created: {
        type:Date,
        default:Date.now()

    }
})

module.exports = mongoose.model('Notes',NoteSchema)