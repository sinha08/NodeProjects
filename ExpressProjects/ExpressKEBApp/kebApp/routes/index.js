var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res){
  //render login page here
});

router.post('/login', function(req, res){
    //authenticate the user here
});

router.get('/signup', function(req, res){
  //render sign up page here
});

router.post('/signup', function(req, res){
  // redirect to /users/create
});

router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'KEB Dashboard' ,blacklist_names:'Nahi khana yaha se'});
});

module.exports = router;
