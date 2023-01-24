require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConection } = require('./database/config');

const app = express();

// configurar CORS
app.use(cors());

// Lectura y parseo del front
app.use(express.json());

//Llamamos la bd
dbConection();

// Crear  Rutas
app.use( '/api/usuarios', require('./routes/usuarios.routes') );
app.use( '/api/login', require('./routes/auth.routes') );
app.use( '/api/gender', require( './routes/gender.routes') );

// Crear el server
app.listen( process.env.PORT , () => {
    console.log('Server running in ports ' + process.env.PORT);
});


//mean_user
//hRWnWMCtkFSox5CB