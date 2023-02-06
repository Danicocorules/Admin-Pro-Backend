const { response } = require('express');
const Usuario = require( '../models/usuario.model' );
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    // const users = await Usuario.find( {}, 'nombre email password' );
    const users = await Usuario.find();

    res.json({
        ok: true,
        users,
        uid: req.uid
    })
}

const createUser = async (req, res = response ) => {
    const { nombre, password, email } = req.body;

     try{
        
        const emailExist = await Usuario.findOne({ email });
        
        if ( emailExist ) {

            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
        } 

        const usuario = new Usuario(req.body);

        // Encriptamos password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Generar WebToken
        const token = await generateJwt( usuario.id, usuario.nombre );

        await usuario.save();
    
        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error revisar logs'
        });
    }
}

const updateUser = async ( req, res = response ) => {

    const _id = req.params.id;

    try {

        const userDB = await Usuario.findById( _id );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no encontrado'
            })
        }

        //ToDo validar token y validar si es usuario correcto

        // Actualizar el usuario
        const {password, google, email, ...campos} = req.body;

        if ( userDB.email !== email ) {

            const emailExist = await Usuario.findOne( {email} );

            if (emailExist) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El mail ya está registrado'
                })
            }
        }

        campos.email = email;
        const userUpdated = await Usuario.findByIdAndUpdate( _id, campos, {new: true} );

        res.json({
            ok: true,
            usuario: userUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const deleteUser = async ( req, res = response ) => {

    const _id = req.params.id;

    try {

        // Vetrificamos que el usuario existe

        const userDB = await Usuario.findById( _id );

        if ( !userDB ) {
            return res.status(404).json({
                ok: 'false',
                msg: 'Este user no existe'
            })
        }

        await Usuario.findByIdAndDelete( _id );

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'El usuario  no se ha borrado'
        })

    }

}

module.exports = { getUsuarios, createUser, updateUser, deleteUser };