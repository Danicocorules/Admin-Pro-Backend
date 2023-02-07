require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConection } = require('./database/config');

const app = express();

// configurar CORS
app.use(cors());

// Public folder
app.use( express.static('public') );

// Lectura y parseo del front
app.use(express.json());

//Llamamos la bd
dbConection();

// Crear  Rutas
app.use( '/api/usuarios', require('./routes/usuarios.routes') );
app.use( '/api/login', require('./routes/auth.routes') );
app.use( '/api/gender', require( './routes/gender.routes') );
app.use( '/api/hospitals', require( './routes/hospitals.routes') );
app.use( '/api/doctors', require( './routes/doctors.routes') );
app.use( '/api/insurances', require( './routes/insurances.routes') );
app.use( '/api/search', require( './routes/search.routes') );
app.use( '/api/upload', require( './routes/upload.routes') );

// Crear el server
app.listen( process.env.PORT , () => {
    console.log('Server running in port ' + process.env.PORT);
});

//mean_user
//hRWnWMCtkFSox5CB