/*
    Route: api/search
*/
const { Router } = require('express');

const { globalSearch, getTypeCollection } = require('../controllers/search.controllers');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/:term', validarJWT, globalSearch );
router.get( '/:type/:term', validarJWT ,getTypeCollection )

module.exports = router;