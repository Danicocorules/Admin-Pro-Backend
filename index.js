require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor express
const app = express();

// CORS
app.use(cors());

// Base de Datos
dbConnection();

//RUTAS
app.get( '/', (req, resp) => {

    resp.json({
        ok : true,
        msg: 'Hola mundo pecho frío, pishica'
    })

});






app.listen( process.env.PORT, () => console.log(`SERVER corriendo en ${process.env.PORT}` ) );
