var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next){
  /*
    req.body contains the json for user details. we need to create a function which will validate this user data
  */
  var user = req.body;
  userModel.createUser(user);

  /*
    invocation of createUser may not be the correct way. In fact user should be created when init it from req.body
    So we will need a class and the user will be create as new User(req.body.name, req.body.age);
  */
  res.send('reponse with user created coming soon');
});

module.exports = router;
