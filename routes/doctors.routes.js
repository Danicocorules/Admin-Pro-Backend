/*
    Route: /api/doctors
*/

const Router = require('express');
const { check } = require('express-validator');

const { getDoctors, createDoctors, editDoctors, deleteDoctors  } = require('../controllers/doctors.controllers');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getDoctors );

router.post('/', 
    [
        validarJWT,
        check('nombre', 'Es obligatirio el nombre del DR').not().isEmpty(),
        check('hospital', 'Hay que asignar un hoispital al DR').isMongoId(),
        validarCampos
    ], 
    createDoctors 
);

router.put('/:id', editDoctors );

router.delete('/:id', deleteDoctors );

module.exports = router;
