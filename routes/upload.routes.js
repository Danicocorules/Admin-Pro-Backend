/*
    Route: /api/upload
*/

const { Router } = require('express');
const { uploadFile, getImg } = require('./../controllers/upload.controllers');

const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload());

router.put( '/:type/:id', validarJWT, uploadFile );
router.get( '/:type/:img', getImg );

module.exports = router;