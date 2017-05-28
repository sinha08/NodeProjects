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
        	window.location.reload();
        }
      });

});

	$('.remove-restaurant').click(function(e) {
		var restaurant_name = e.target.getAttribute('data-value');
		var data = { 'restaurant_name': restaurant_name };
		$.ajax({
	        type:"POST",
	        cache:false,
	        dataType: "json",
	        url:'/restaurant/delete',
	        data:data,    // multiple data sent using ajax
	        success: function () {
	        	window.location.reload();
	        }
	      });
	});
});
