const express = require('express');
const dbConnection = require('./config/db')
const usersRoutes = require('./routes/usersRoutes')
const authRoutes = require('./routes/authRoutes')
const notesRoutes = require('./routes/notesRoutes')
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
const PORT = process.env.PORT || 3001;

// App escucha el puerto 
app.listen(PORT,() => {
    console.log(`Server running in port ${PORT}`)
})