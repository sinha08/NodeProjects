var User = require('../models/user');
var Restaurant = require('../models/restaurant');

exports.get_login_page = function(req, res, next){
  res.render('login');
}

exports.authenticate_login = function(req, res, next){
  // authenticate logged in user here
  var login_data = req.body;

  User.findOne({ 'login_name': req.body.login_name, 'password': req.body.password })
      .exec(function(err, found_user){
        if(found_user){
          res.redirect('/dashboard');
        }else{
          res.redirect('/');
        }
      })
}

exports.get_dashboard = function(req, res, next) {
  Restaurant.find({}, 'restaurant_name restaurant_menu restaurant_url')
        .exec(function(err, restaurants){
          if(err){
            return next(err);
          }
          res.render('dashboard', { title: 'KEB Dashboard' ,
                                    blacklist_names:'Nahi khana yaha se',
                                    restaurant_list: restaurants
                                  });
        });
}

exports.logout_user = function(req, res, next) {
  res.redirect('/');
}
