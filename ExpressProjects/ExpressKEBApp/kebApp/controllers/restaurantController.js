var Restaurant = require('../models/restaurant');

exports.restaurant_create_post = function(req, res, next){
    console.log('Entering restaurant_create_post');
    /*
      req.body contains the json for restaurant details. 
    */
    var restaurant_data = req.body;
    var restaurant = new Restaurant({
      restaurant_name: req.body.restaurant_name,
      restaurant_menu: req.body.restaurant_menu,
      restaurant_url: req.body.restaurant_url
    });

    Restaurant.findOne({ 'restaurant_name': req.body.restaurant_name})
        .exec(function(err, found_restaurant){
          console.log('found restaurant: ' + found_restaurant);
          if(err){ return next(err);}

          if(found_restaurant){
            res.redirect('/dashboard');
          }else{
            restaurant.save(function(err){
              if(err){ return next(err)}
              res.redirect('/dashboard');
            });

          }
        })
    console.log('Exiting restaurant-create-post');
}

exports.restaurant_get = function(req, res, next){
    console.log('Entering restaurant_get');
    /*
      req.body contains the json for restaurant details.
    */
    Restaurant.find({}, 'restaurant_name restaurant_menu restaurant_url')
        .exec(function(err, restaurants){
          if(err){
            return next(err);
          }
          res.render('dashboard', { title: 'KEB Dashboard' ,
                                    blacklist_names:'Nahi khana yaha se',
                                    restaurant_list: restaurants
                                  });
        });
    console.log('Exiting restaurant_get');
}
