var express = require('express');
var router = express.Router();
var authController = require('./controllers/authregister.js');
var authControllerlog = require('./controllers/authlogin.js');
var authControllerReport = require('./controllers/authreport-car.js');
//var authControllerupdate = require('./controllers/update.js');


router.post('/register', authController.register);
router.post('/login', authControllerlog.login);
router.post('/report', authControllerReport.home);
//router.post('/update-Profolio', authControllerupdate.updateProfile);

module.exports = router;