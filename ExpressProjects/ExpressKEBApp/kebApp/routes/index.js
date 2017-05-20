var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', index_controller.get_login_page);

router.post('/login', index_controller.authenticate_login);

router.get('/dashboard', index_controller.get_dashboard);

module.exports = router;
