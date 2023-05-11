const router = require('express').Router();
const { check } = require('express-validator');
const  { jwtValidate } = require("../middlewares/jwt-validator");
const vehicleController = require('../controllers/vehicle-controller');

router.route('/vehicle')
    .get([jwtValidate],vehicleController.getAll)
    .post([
        check('license_place', "License type is required").notEmpty(),
        check('vehicle_type', "Vehicle type is required").notEmpty(),
        check('vehicle_type', "Vehicle type invalid").isIn(['MOTO','CARRO']),
        check('user', "Customer is required").notEmpty(),
        jwtValidate], vehicleController.createVehicle)
    
    
router.route('/vehi-license')
    .get(vehicleController.getByLicense)
    
router.route('/vehicle/:id')
    .get([jwtValidate], vehicleController.getById)
    .put([
        check('fare', "Fare is required").notEmpty(),
        jwtValidate], vehicleController.updateVehicle)
    .patch([jwtValidate], vehicleController.updateVehicle)
    .delete([jwtValidate], vehicleController.deleteVehicle)

module.exports = router;