/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getUsuarios, createUser, updateUser, deleteUser } = require('../controllers/usuarios.controllers');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post('/',
    [
        check('nombre', 'Nombre invalido').not().isEmpty(),
        check('password', 'Pass invalido').not().isEmpty(),
        check('email', 'NO tiene formato mail').isEmail(),
        validarCampos
    ],
    createUser
);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'Nombre invalido').not().isEmpty(),
        check('email', 'NO tiene formato mail').isEmail(),
        //check('role', 'el Rol es obligatorio').isEmail(),
        validarCampos
    ],
    updateUser);

router.delete('/:id', validarJWT, deleteUser);


module.exports = router;