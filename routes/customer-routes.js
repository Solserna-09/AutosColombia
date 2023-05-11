const router = require('express').Router();
const { check } = require("express-validator");
const  { jwtValidate } = require("../middlewares/jwt-validator");
const customerController = require('../controllers/customer-controller');

router.route('/customer')
    .get([ jwtValidate ], customerController.getAll)
    .post([ 
        check("document","Document is required").not().isEmpty(),  
        check("name","Name is required").not().isEmpty(),  
        check("phone","Phone is required").not().isEmpty(), 
        jwtValidate ], customerController.createCustomer)

router.route('/customer/:id')
    .get([ jwtValidate ], customerController.getById)
    .put([   
        check("phone","Phone is required").not().isEmpty(), jwtValidate 
        ], customerController.updateCustomer)
    .patch([ jwtValidate ], customerController.updateCustomer)
    .delete([ jwtValidate ], customerController.deleteCustomer)

module.exports = router;