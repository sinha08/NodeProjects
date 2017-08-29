var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Feedback = require('../models/feedback');
var Upload = require('../models/upload');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file.filename);
    cb(null, file.originalname);
  }
})
var multerupload = multer({ storage: storage }).fields([{
           name: 'image', maxCount: 5
         }, {
           name: 'video', maxCount: 5
         },{
           name: 'receipt', maxCount: 5
         },{
           name: 'log', maxCount: 5
         }])
/* GET home page. */
router.get('/', function(req, res, next){
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
});

router.get('/home', function(req, res, next){
  res.render('index', { title: 'VOC DashBoard' ,
                        userLoginName: req.session.login_name,
                      });
});

router.post('/login',function(req, res, next){
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
            res.redirect('/home');
          });

        }else{
          res.redirect('/');
        }
      })
});

router.get('/logout',function(req, res, next) {
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('/');
    }
  });
});
// var report = new Report({report_name:'Test2',
//                       report_date:'12_08',
//                       report_files:'abcd'});

router.post('/send_report',function(req, res, next) {
  console.log(req.body);
  var report = new Feedback({
    feedback_id: req.body.report_id,
    account_name: req.body.account_name,
    imei: req.body.imei,
    lat: req.body.loc_coord.lat,
    long: req.body.loc_coord.long,
    loc_name: req.body.loc_name,
    app_version: req.body.app_version,
    date: req.body.date_time.date,
    time: req.body.date_time.time
  });
  report.save(function (err, report) {
    if (err) {
      console.error(err);
      res.json({
        "error":"202",
        "message": "Report not saved"
      });
    } else {
      res.json({
        "error":"200",
        "message": "OK"
      });
      console.log("successfully saved");
    }
  });
});

router.post('/send_feedback',function(req, res, next) {
  console.log(req.body);
  var feedback = new Feedback({
    feedback_id: req.body.feedback_id,
    account_name: req.body.account_name,
    category: req.body.category,
    card_type: req.body.card_type,
    imei: req.body.imei,
    lat: req.body.loc_coord.lat,
    long: req.body.loc_coord.long,
    loc_name: req.body.loc_name,
    app_version: req.body.app_version,
    date: req.body.date_time.date,
    time: req.body.date_time.time
  });
  feedback.save(function (err, feedback) {
    if (err) {
      console.error(err);
      res.json({
        "error":"203",
        "message": "Feedback not saved"
      });
    } else {
      res.json({
        "error":"200",
        "message": "OK"
      });
      console.log("successfully saved");
    }
  });
});

router.get('/heatmap', function(req, res, next) {
  res.render('heatmap');
});

router.post('/fileupload',function (req, res) {
  console.log("entered file upload");
  multerupload(req, res, function (err) {
    console.log(req.body.feedback_id);
    if (err) {
      res.send(err);
      return
    }

    var v_path = [];
    var i_path = [];
    var r_path = [];
    var l_path = [];
    console.log(req.files);
    //handle null cases of path
    if (req.files != undefined) {
      if (req.files.video != undefined) {
        for (var i in req.files.video) {
          v_path.push("upload/"+req.files.video[i].originalname);
        }
      }
      if (req.files.image != undefined){
        for (var i in req.files.image) {
          i_path.push("upload/"+req.files.image[i].originalname);
        }
      }
      if (req.files.receipt != undefined){
        for (var i in req.files.receipt) {
          r_path.push("upload/"+req.files.receipt[i].originalname);
        }
      }
      if (req.files.log != undefined){
        for (var i in req.files.log) {
          l_path.push("upload/"+req.files.log[i].originalname);
        }
      }

    }
    var upload = new Upload({
      upload_id: req.body.upload_id,
      video_path: v_path,
      image_path: i_path,
      receipt_path: r_path,
      log_path: l_path,
      feedback_id: req.body.feedback_id
    });
    upload.save(function (err, report) {
      if (err) {
        console.error(err);
        res.json({
          "error":"204",
          "message": "File not uploaded"
        });
      } else {
        res.json({
          "error":"200",
          "message": "File uploaded"
        });
        console.log("successfully saved");
      }
    });
  });
});

module.exports = router;
