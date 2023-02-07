/*
    Route: /api/gender
*/
const { Router } = require('express');
const { setGender } = require('../controllers/gender.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.put( '/:id', 
    [
        check('nombre', 'Nombre invalido').not().isEmpty(),
        check('gender', 'Has de poner un genero').not().isEmpty(),
        validarCampos
    ], 
    setGender );

module.exports = router;