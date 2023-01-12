require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConection } = require('./database/config');

const app = express();

// configurar CORS
app.use(cors());

//Llamamos la bd
dbConection();

// Crear  Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Todo bien'
    })

});

// Crear el server
app.listen( process.env.PORT , () => {
    console.log('Server running in portss ' + process.env.PORT);
});



//mean_user
//hRWnWMCtkFSox5CB