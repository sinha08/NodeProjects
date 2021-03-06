var User = require('../models/user');

exports.user_create_post = function(req, res, next){
    console.log('Entering user-create-post');
    /*
      req.body contains the json for user details. we need to create a function which will validate this user data
    */
    var user_data = req.body;
    var user = new User({
      login_name: req.body.login_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    });

    User.findOne({ 'login_name': req.body.login_name})
        .exec(function(err, found_user){
          console.log('found user: ' + found_user);
          if(err){ return next(err);}

          if(found_user){
            res.redirect('/');
          }else{
            user.save(function(err){
              if(err){ return next(err)}
              res.redirect('/');
            });

          }
        })
    console.log('Exiting user-create-post');
}

exports.users_get = function(req, res, next){
    console.log('Entering users_get');
    /*
      req.body contains the json for user details. we need to create a function which will validate this user data
    */
    User.find({}, 'login_name first_name last_name')
        .exec(function(err, users){
          if(err){
            return next(err);
          }
          res.render('dashboard', { title: 'KEB Dashboard' ,
                                    blacklist_names:'Nahi khana yaha se',
                                    users: users
                                  });
        });
    console.log('Exiting users_get');
}
