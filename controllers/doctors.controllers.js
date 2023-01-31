const { response } = require("express");

const Doctor = require('../models/doctors.model');

const getDoctors = async ( req, res = response ) => {
    
    try {

        const show = Number(req.query.show) || 0;

        const [ doctorsDB , totalDoctorsDB ] = await Promise.all([
            
            Doctor.find()
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre')
                .skip(show)
                .limit( 5 ),

            Doctor.count()
        
        ]);

        res.status(200).json({
            ok: true,
            totalDoctorsDB,
            doctors: doctorsDB,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'NO se han traído los doctores'
        })
    }
}

const createDoctors = async ( req, res = response ) => {
    
    // Obtenemos el UID del token
    const uid = req.uid;
    
    const doctor = new Doctor({
        usuario: uid,
        ...req.body    
    })

    try {
    
        
        const drDB = await doctor.save();

        res.status(200).json({
            ok: true,
            msg: 'create D',
            doctor: drDB,
        })

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'doctor NO create'
        })
    }
    
}

const editDoctors = async ( req, res = response ) => {
    res.status(200).json({
        ok: true,
        msg: 'edit D'
    })
}

const deleteDoctors = async ( req, res = response ) => {
    res.status(200).json({
        ok: true,
        msg: 'delete D'
    })
}

module.exports = { getDoctors, createDoctors, editDoctors, deleteDoctors  };
