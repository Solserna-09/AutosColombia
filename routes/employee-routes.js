const router = require('express').Router();
const  { jwtValidate } = require("../middlewares/jwt-validator");
const employeecontroller = require('../controllers/employee-controller');

router.route('/employee')
    .get([ jwtValidate ], employeecontroller.getAll)
    .post( employeecontroller.createEmployee);

router.route('/employee/:id')
    .get([ jwtValidate ], employeecontroller.getById)
    .put([ jwtValidate ], employeecontroller.updateEmployee)
    .patch([ jwtValidate ], employeecontroller.updateEmployee)
    .delete([ jwtValidate ], employeecontroller.deleteEmployee)

module.exports = router;