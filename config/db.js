const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const dbConnection = async () => {
    await mongoose.connect( process.env.DB_MONGO,
        {
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        },
        (error)=>{
            error ? console.log("Error al conectarse a la db" + error)
                : console.log("conectado a mongodb")
        }
    
    )
}

module.exports = dbConnection