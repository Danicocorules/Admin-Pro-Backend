const { response } = require("express");

const Doctors = require('../models/doctors.model');
const Hospitals = require('../models/hospitals.model');
const Usuario = require('../models/usuario.model');

const globalSearch = async ( req, res = response ) => {

    const search = req.params.term;
    const searchRegExp = new RegExp( search, "i" );
    
    const [ drBD ,hospBD ,userD ] = await Promise.all([
        Doctors.find({ nombre: searchRegExp }),
        Hospitals.find({ nombre: searchRegExp }),
        Usuario.find({ nombre: searchRegExp })
    ]);

    try {
        res.status(200).json({
            ok: true,
            msg: 'buscado',
            search,
            drBD,
            hospBD,
            userD
        });
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'HAY UN ERROR EN LA BUSQUEDA'
        })
    
    }

}

module.exports = { globalSearch };