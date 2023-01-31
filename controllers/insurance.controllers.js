const { response } = require("express");

const getInsurance = ( req, res = response ) => {

    res.status(400).json({
        ok: true,
        msg: 'Insurance created'
    });
    
}

module.exports = { getInsurance }