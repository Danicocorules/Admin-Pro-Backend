const { Schema, model } = require('mongoose');

// const HospitalSchema = require('./doctors.model');
// const DoctorSchema = require('./hospitals.model');

const InsuranceSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    hospitals: {
        type: String,
        required: true
    },
    doctors: {
        type: String,
        required: true
    }
});

module.exports = model('Insurance', InsuranceSchema);

