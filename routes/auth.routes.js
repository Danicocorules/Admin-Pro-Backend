/*
    Route: /api/login
*/
const { Router } = require('express');
const { login, googleSignin, renewToken } = require('./../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'Google\s token is required').not().isEmpty(),
    validarCampos
], googleSignin);

router.get('/renew',
    validarJWT, 
    renewToken);



module.exports = router;