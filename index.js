const express = require('express');
const dbConnection = require('./config/db')
const usersRoutes = require('../server/routes/usersRoutes')
const authRoutes = require('../server/routes/authRoutes')
const notesRoutes = require('../server/routes/notesRoutes')
const cors = require('cors')

const app = express()

// Habilitar express.json
app.use( express.json({ extended: true }))


// conectar db
dbConnection()

// habilitar cors
app.use(cors())

// Rutas
app.use('/api/users',usersRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/notes',notesRoutes)

//puerto de la app
const PORT = process.env.PORT || 4000;

// App escucha el puerto 
app.listen(PORT,() => {
    console.log(`Server running in port ${PORT}`)
})