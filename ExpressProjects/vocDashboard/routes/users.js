var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Feedback = require('../models/feedback');
var Upload = require('../models/upload');
var path = require('path');
/* GET users listing. */
router.get('/reports', function(req, res, next){
    console.log('Entering reports');
    /*
      req.body contains the json for user details. we need to create a function which will validate this user data
    */
    Feedback.aggregate([
    { "$match": {
      // "category":{$exists:false},
      //     "card_type":{$exists:false},
          "feedback_id":{$exists:true}} },
    {
        "$lookup": {
            "from": "uploads", /* underlying collection for jobSchema */
            "localField": "feedback_id",
            "foreignField": "feedback_id",
            "as": "files"
        }
    }
    ]).exec(function(err, reports){
          if(err){
            return next(err);
          }
          res.render('reports', { title: 'BUG Reports' ,
                                report: reports
                              });
        });
    console.log('Exiting reports');
});

router.get('/feedback', function(req, res, next){
    console.log('Entering feedback');
    /*
      req.body contains the json for user details. we need to create a function which will validate this user data
    */
    Feedback.find({"category":{$exists:true},
                    "card_type":{$exists:true}})
    .exec(function(err, feedbacks){
          if(err){
            return next(err);
          }
          res.render('feedback', { title: 'Feedback' ,
                                feedback: feedbacks
                              });
        });
    console.log('Exiting feedback');
});

router.post('/create',function(req, res, next){
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
});

router.get('/users',function(req, res, next){
    console.log('Entering users_get');
    /*
      req.body contains the json for user details. we need to create a function which will validate this user data
    */
    User.find({}, 'login_name first_name last_name')
        .exec(function(err, users){
          if(err){
            return next(err);
          }
          // res.render('dashboard', { title: 'KEB Dashboard' ,
          //                           blacklist_names:'Nahi khana yaha se',
          //                           users: users
          //                         });
        });
    console.log('Exiting users_get');
});

router.get('/upload/:files', function(req, res, next) {
  console.log(path.join(__dirname,'../uploads'));
  res.sendFile(path.join(__dirname,'../uploads',req.params.files));
});
module.exports = router;
