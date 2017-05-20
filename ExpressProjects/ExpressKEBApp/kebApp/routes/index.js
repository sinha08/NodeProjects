var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/indexController');
var restaurant_controller = require('../controllers/restaurantController');

/* GET home page. */
router.get('/', index_controller.get_login_page);

router.post('/login', index_controller.authenticate_login);

router.get('/logout', index_controller.logout_user);

router.get('/dashboard', restaurant_controller.restaurant_get);

router.post('/create/restaurant', restaurant_controller.restaurant_create_post);

module.exports = router;
