var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UploadSchema = new Schema({
  upload_id: String,
  video_path: String,
  image_path: String,
  receipt_path:String,
  log_path: String,
  feedback_id: String // to relate with feedback
});

module.exports = mongoose.model('Upload', UploadSchema);
