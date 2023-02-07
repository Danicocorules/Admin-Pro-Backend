const { response } = require('express');

const Hospital = require('../models/hospitals.model');

const getHospitals = async ( req, res = response ) => {

    try {
    
        const hospitalsDB = await Hospital.find().populate('usuario', 'nombre img');

        res.status(200).json({
            ok: true,
            msg: 'Hospitals traídos',
            hospitals: hospitalsDB
        });

    } catch (error) {
    
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'no se han traído los hospitales'
        });    
    }
};

const createHospitals = async ( req, res = response ) => {

    // Obtenemos el UID del token
    const uid = req.uid;

    const hospital = new Hospital({ 
        usuario: uid, 
        ...req.body 
    });
    
    try {
        
        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            msg: 'Hospital Creado',
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hospital no creado'
        })
    }

};

const editHospitals = async ( req, res = response ) => {
    
    const hid = req.params.id;
    const userUpdating = req.uid;

    try {
        
        const hospitalDB = await Hospital.findById( hid );

        if ( hospitalDB ) {

 
           const hospitalChanges = {
               ...req.body,
               usuario: userUpdating
           }
         
           const updateHospital = await Hospital.findByIdAndUpdate( hid, hospitalChanges, {new: true} );

        } else {
            return res.status(404).json({
                ok: false,
                msg: 'This hosopital doesn\'t exist',
                hospital: updateHospital
            })

        }

        res.status(200).json({
            ok: true,
            msg: 'Hospital was updated'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hospital didn\'t updated'
        })
    }

};

const deleteHospitals = async ( req, res = response ) => {

    const hIdDeleted = req.params.id;

    try {
        const hospitalDB = await Hospital.findById( hIdDeleted );

        if ( hospitalDB ) {
            await Hospital.findByIdAndDelete( hospitalDB );

        } else {
            res.status(200).json({
                ok: true,
                msg: 'Impossible delete this Hospital'
            })
        }
    } catch (error) {   
        res.status(200).json({
            ok: true,
            msg: 'delete H'
        })
    }
};

module.exports = { getHospitals, createHospitals, editHospitals, deleteHospitals  }