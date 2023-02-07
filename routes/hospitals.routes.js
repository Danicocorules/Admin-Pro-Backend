/*
    Route: /api/hospitals
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitals, createHospitals, editHospitals, deleteHospitals } = require('../controllers/hospitals.controllers');

const router = Router();

router.get('/', getHospitals);

router.post('/', 
    [
        validarJWT,
        check( 'nombre', 'El nombre del HOSP es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createHospitals);

router.put('/:id',
    validarJWT,
    check( 'nombre', 'El nombre del HOSP es obligatorio').not().isEmpty(),
    validarCampos,
    editHospitals );
    
router.delete('/:id', validarJWT, deleteHospitals );

module.exports = router;