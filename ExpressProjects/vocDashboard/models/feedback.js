var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  feedback_id: String, //put this as foreignkey in reports
  account_name: String,
  category: String,
  card_type: String,
  imei: String,
  lat: String,
  long: String,
  loc_name: String,
  app_version: String,
  date: String,
  time: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
