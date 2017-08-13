var express = require('express');
var router = express.Router();
var Report = require('../models/reports');
/* GET users listing. */
router.get('/reports', function(req, res, next){
    console.log('Entering reports');
    /*
      req.body contains the json for user details. we need to create a function which will validate this user data
    */
    Report.find({}, 'report_name report_date report_files')
        .exec(function(err, reports){
          if(err){
            return next(err);
          }
          res.render('index', { title: 'VOC DashBoard' ,
                                    report: reports
                                  });
        });
    console.log('Exiting users_get');
});
module.exports = router;
