var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UploadSchema = new Schema({
  upload_id: String,
  video_path: [{type:String}],
  image_path: [{type:String}],
  receipt_path:[{type:String}],
  log_path: [{type:String}],
  feedback_id: String // to relate with feedback
});

module.exports = mongoose.model('Upload', UploadSchema);
