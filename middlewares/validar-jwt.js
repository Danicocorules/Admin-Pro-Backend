const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    // Verifar el token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET )
        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token NO valido'
        })
    }




    

}

module.exports = { validarJWT };