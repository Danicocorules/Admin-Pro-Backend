const { response } = require("express");

const Doctor = require('../models/doctors.model');

const getDoctors = async ( req, res = response ) => {
    
    try {

        const show = Number(req.query.show) || 0;

        const [ doctorsDB , totalDoctorsDB ] = await Promise.all([
            
            Doctor.find()
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre'),
                //.skip(show)
                //.limit( 5 ),

            Doctor.count()
        
        ]);

        res.status(200).json({
            ok: true,
            totalDoctorsDB,
            doctors: doctorsDB,
        });

    } catch (error) {
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
        res.status(500).json({
            ok: false,
            msg: 'doctor NO create'
        })
    }
    
}

const editDoctors = async ( req, res = response ) => {
    
    const drId = req.params.id;
    const userUpdating = req.uid;
        
    try {
        
        const drBd = await Doctor.findById( drId );

        if ( drBd ) {
            const drChanges = {
                ...req.body,
                userUpdating
            }
            await Doctor.findByIdAndUpdate( drId, drChanges, {new: true}  );    
        } 

    } catch (error) {
        res.status(404).json({
            ok: true,
            msg: 'Impossible edit this Doctor.'
        })
    }

    res.status(200).json({
        ok: true,
        msg: 'edit D'
    })
}

const deleteDoctors = async ( req, res = response ) => {
    
    const drDelete = req.params.id;

    try {
        
        const drBd = await Doctor.findById( drDelete );

        if ( drBd ) {
            await Doctor.findByIdAndDelete( drDelete );
        }

    } catch (error) {
        res.status(404).json({
            ok: true,
            msg: 'Impossible delete this Doctor.'
        })
    }
    
    res.status(200).json({
        ok: true,
        msg: 'delete D'
    })
}

module.exports = { getDoctors, createDoctors, editDoctors, deleteDoctors  };
