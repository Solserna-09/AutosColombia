const router = require('express').Router();
const  { jwtValidate } = require("../middlewares/jwt-validator");
const { check } = require("express-validator")
const fareController = require('../controllers/fare-conttoller');

router.route('/fare')
    .get([jwtValidate], fareController.getAll)
    .post([
        check('fare_type', "Fare Type is required").notEmpty(),
        check('vehicle_type', "Vehicle type is required").notEmpty(),
        check('vehicle_type', "Vehicle type invalid").isIn(['MOTO','CARRO']),
        jwtValidate
    ], fareController.create);

router.route('/fare/:id')
    .get([jwtValidate], fareController.getById)
    .put([
        check('fare_type', "Fare Type is required").notEmpty(),
        check('vehicle_type', "Vehicle type is required").notEmpty(),
        check('vehicle_type', "Vehicle type invalid").isIn(['MOTO','CARRO']),
        jwtValidate
    ], fareController.update)
    .patch([jwtValidate], fareController.update);

module.exports = router;