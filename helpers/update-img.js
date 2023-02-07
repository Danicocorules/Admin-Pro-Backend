const fs = require('fs');

const Doctor = require('./../models/doctors.model');
const Hospital = require('./../models/hospitals.model');
const Usuario = require('./../models/usuario.model');

const deleteImg = (path) => {
    if ( fs.existsSync(path) ) {

        //Delete img
        fs.unlinkSync(path);
    }
}

const updateImgs = async ( type, id, fileName ) => {
    console.log(type, id, fileName);

    switch (type) {
        case 'doctors':

            const doctor = await Doctor.findById(id);

            if ( !doctor ) {
                return false;
            }

            // Evaluate if this Dr has any img assigned and if it has, we have to delete.
            const oldPath = `./uploads/doctors/${doctor.img}`;
            deleteImg(oldPath);

            doctor.img = fileName;
            await doctor.save();
            return true;

        break;
    
        case 'hospitals':
            const hospital = await Hospital.findById(id);

            if ( !hospital ) {
                return false;
            }

            // Evaluate if this Hospital has any img assigned and if it has, we have to delete.
            const oldPathHosp = `./uploads/hospitals/${hospital.img}`;
            deleteImg(oldPathHosp);

            hospital.img = fileName;
            await hospital.save();
            return true;
        
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);

            if ( !usuario ) {
                return false;
            }

            // Evaluate if this Dr has any img assigned and if it has, we have to delete.
            const oldPathUser = `./uploads/usuarios/${usuario.img}`;
            deleteImg(oldPathUser);

            usuario.img = fileName;
            await usuario.save();
            return true;
            
        break;
        
        default:
            break;
    }

}

module.exports = updateImgs;