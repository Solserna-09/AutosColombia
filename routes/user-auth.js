const router = require('express').Router();

const loginController = require('../controllers/user-auth');

router.route('/user-auth')
    .post(loginController.login);


    
module.exports = router;