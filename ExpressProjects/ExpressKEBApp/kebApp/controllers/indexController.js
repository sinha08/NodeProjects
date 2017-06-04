var User = require('../models/user');
var Restaurant = require('../models/restaurant');

exports.get_login_page = function(req, res, next){
  var user_info = req.cookies.user_info;
  var remember = req.cookies.remember;
  var login_name = password = '';

  if(remember == '1'){
    login_name = user_info.login_name;
    password = user_info.password;
  }
  res.render('login', {
      login_name: login_name,
      password: password ,
      remember: remember
  });
}

exports.authenticate_login = function(req, res, next){
  // authenticate logged in user here
  var login_data = req.body;

  User.findOne({ 'login_name': req.body.login_name, 'password': req.body.password })
      .exec(function(err, found_user){
        if(found_user){
          req.session.regenerate(function(){
            req.session.login_name = req.body.login_name;
            req.session.authenticated = true;
            console.log('req body ' + JSON.stringify(req.body));
            if(req.body.remember == '1'){
              var user_info = {
                'login_name': req.body.login_name,
                'password': req.body.password,
              };
              res.cookie('user_info', user_info);
            }
            res.cookie('remember', req.body.remember);
            res.redirect('/dashboard');
          });

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
          console.log(restaurants);
          res.render('dashboard', { title: 'KEB Dashboard' ,
                                    blacklist_names:'Nahi khana yaha se',
                                    restaurants: restaurants,
                                    userLoginName: req.session.login_name
                                  });
        });
}

exports.logout_user = function(req, res, next) {
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('/');
    }
  });
}
