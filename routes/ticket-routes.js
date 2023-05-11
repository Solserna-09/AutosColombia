const router = require('express').Router();
const { check } = require("express-validator");
const  { jwtValidate } = require("../middlewares/jwt-validator");
const ticketController = require('../controllers/ticket-controller');

router.route('/ticket')
    .get([jwtValidate],ticketController.getAll)
    .post([
        check("cell", "Cell is require").not().isEmpty(),
        check("fare", "Fare is require").not().isEmpty(),
        check("vehicle", "Vehicle is require").not().isEmpty(),
        jwtValidate],ticketController.createTicket)

router.route('/ticket-code')
    .get(
        check("code", "The Code is require").not().isEmpty(),
        ticketController.getByCodeTicket)

router.route('/payment')
        .get([jwtValidate],ticketController.paymentTicket);


router.route('/ticket/:id')
    .get(ticketController.getById)
    .put([
        check("cell", "Cell is require").not().isEmpty(),
        jwtValidate
        ],ticketController.updateTicket)
    .patch([jwtValidate],ticketController.updateTicket)
    .delete([jwtValidate],ticketController.deleteTicket)

module.exports = router;