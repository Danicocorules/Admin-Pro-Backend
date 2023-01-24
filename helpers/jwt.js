const jwt = require('jsonwebtoken');

const generateJwt = ( uid, nombre ) => {

    return new Promise ( (resolve, reject) => {

        const payload = {
            uid,
            nombre
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
    
            if (err) {
                console.log(err);
                reject(err);
            } else {
               resolve( token ); 
            }
        });
    })
}

module.exports = { generateJwt };