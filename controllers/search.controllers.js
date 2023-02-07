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

const getTypeCollection = async ( req, res = response ) => {

    const type = req.params.type;
    const search = req.params.term;
    
    const searchRegExp = new RegExp( search, "i" );
    
    let data = [];

    switch ( type ) {
        case 'hospitals':
            data = await Hospitals.find({ nombre: searchRegExp });
        break;

        case 'doctors':
            data = await Doctors.find({ nombre: searchRegExp });
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: searchRegExp });
        break;    
        
        default:
            res.status(500).json({
                ok: false,
                msg: 'Tienes que buscar entre hospitales, usuarios o doctores'
            })
        break;
        
    }

    res.status(200).json({
        ok: true,
        msg: 'buscado'
    });

    console.log(data);
}

module.exports = { globalSearch, getTypeCollection };
