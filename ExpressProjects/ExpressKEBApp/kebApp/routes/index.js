var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/indexController');
var restaurant_controller = require('../controllers/restaurantController');

/* GET home page. */
router.get('/', index_controller.get_login_page);

router.post('/login', index_controller.authenticate_login);

router.get('/logout', index_controller.logout_user);

router.get('/dashboard', index_controller.get_dashboard);

router.post('/restaurant/create', restaurant_controller.restaurant_create_post);

module.exports = router;
