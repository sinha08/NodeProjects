var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReportSchema = new Schema({
  report_name: String,
  report_date: String,
  report_files: String
});

module.exports = mongoose.model('Report', ReportSchema);
