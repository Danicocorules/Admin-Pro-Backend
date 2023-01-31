const { response } = require('express');
const Usuario = require('../models/usuario.model');

const { generateJwt } = require('../helpers/jwt');

const bcrypt = require('bcryptjs');

 
const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try{
        // verificar que el email es correcto
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {

            return res.status(404).json({
                ok: false,
                msg: 'email no valido pendejo'
            })
        }

        // verificar contraseña
        const validPass = bcrypt.compareSync(password, usuarioDB.password);

        if ( !validPass ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña NO valida'
            })
        }

        //Generar WebToken
        const token = await generateJwt( usuarioDB.id, usuarioDB.nombre );

        res.json({
            ok:true,
            msg: 'works',
            token
        })


    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el sistemas'
        })


    }
}

module.exports = { login };