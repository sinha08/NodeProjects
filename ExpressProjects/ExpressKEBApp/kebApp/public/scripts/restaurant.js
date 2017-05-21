$(function() {
$('#addRestaurantBtn').click(function() {
	var data = { 'restaurant_name': $('#restaurantName').val(),
				 'restaurant_url': $('#restaurantUrl').val() };
	$.ajax({
        type:"POST",
        cache:false,
        dataType: "json",
        url:'/restaurant/create',
        data:data,    // multiple data sent using ajax
        success: function () {
        }
      });

});
});