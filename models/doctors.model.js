const { Schema, model} = require('mongoose');

const DoctorSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    },
})

module.exports = model('Doctor', DoctorSchema)