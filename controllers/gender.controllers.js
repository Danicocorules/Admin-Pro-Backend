const { response } = require('express');
const Usuario = require('../models/usuario.model');

const setGender = async ( req, res = response ) => {

    const _id = req.params.id;

    try{
        
        const userDB = await Usuario.findById( _id );
        
        // Verificar si el User existe
        if ( !userDB ) {
            return res.status(404).json( {
                ok: true,
                msg: 'El usuario no existe'
            } );
        }

        // Lo actualizas
        const { nombre, gender } = req.body;
        const data = { nombre, gender };
        const genderSet = await Usuario.findByIdAndUpdate( _id, data, { new: true } );



        res.status(200).json( {
            ok: true,
            usuario: genderSet,
            msg: 'Genero'
        } );

    } catch(error) {
        res.status(404).json( {
            ok: false,
            msg: 'Genero Mal ve al medio'
        } );
    }

}

module.exports = { setGender };