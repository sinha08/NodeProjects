var express = require('express');
var router = express.Router();
var Report = require('../models/reports');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var report = new Report({report_name:'Test2',
                      report_date:'12_08',
                      report_files:'abcd'});

router.post('/test',function(req, res, next) {
  report.save(function (err, report) {
    if (err) return console.error(err);
    console.log("successfully saved");
  });
  res.redirect('/');
});

router.get('/heatmap', function(req, res, next) {
  res.render('heatmap');
});

module.exports = router;
