var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  restaurant_name: String,
  restaurant_menu: String,
  restaurant_url: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);