var User = require('../models/user');

exports.user_create_post = function(req, res, next){
    console.log('Entering user-create-post');
    /*
      req.body contains the json for user details. we need to create a function which will validate this user data
    */
    var user = req.body;

    res.send('reponse with user created coming soon');
    console.log('Exiting user-create-post');
}

exports.users_get = function(req, res, next){
    console.log('Entering users_get');
    /*
      req.body contains the json for user details. we need to create a function which will validate this user data
    */
    var user = req.body;

    res.send('reponse with users coming soon');
    console.log('Exiting users_get');
}
