/*
    Route: api/search
*/
const { Router } = require('express');

const { globalSearch } = require('../controllers/search.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/:term',
    [
        validarJWT
    ]
    ,globalSearch 
);

module.exports = router;