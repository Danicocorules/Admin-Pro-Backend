/*
    Route: /api/insurances
*/

const { Router } = require('express');
const { getInsurance } = require('../controllers/insurance.controllers');

const router = Router();

router.get('/', getInsurance);

module.exports = router;