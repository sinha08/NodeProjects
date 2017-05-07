var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_controller.users_get);

router.post('/create', user_controller.user_create_post);

module.exports = router;
