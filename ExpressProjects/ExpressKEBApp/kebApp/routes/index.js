var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'KEB Dashboard' ,blacklist_names:'Nahi khana yaha se'});
});

module.exports = router;
