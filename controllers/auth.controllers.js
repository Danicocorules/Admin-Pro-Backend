const { response } = require('express');
const Usuario = require('../models/usuario.model');
const { googleVerify } = require('../helpers/google-verify');

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

        //Generate WebToken
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

const googleSignin = async( req, res = response ) => {
    
    try {
        const { email, name, picture } = await googleVerify( req.body.token );

        const userDB = await Usuario.findOne({ email });
        let usuario;

        if ( !userDB ) {
            usuario = new Usuario({
                email,
                nombre: name,
                img: picture,
                password: '@@@',
                google: true
            }) 
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        //Generate WebToken
        const token = await generateJwt( usuario.id );

        res.json({
            ok: true,
            email, name, picture,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Google\'s token is invalid'
        })
    }

    res.status(200).json({
        ok: true,
        msg: req.body.token
    })
}

module.exports = { login, googleSignin };