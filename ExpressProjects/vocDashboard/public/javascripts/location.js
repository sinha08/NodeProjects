$(function(){
  // $.getJSON("/users/reports",function(result){
  //   console.log(result);
  // });
  $.ajax({
  type: "GET",
  url: "/users/reports",
  cache: false,
  success: function(data){
     console.log(data);
     eqfeed_callback({'list':[{'coordinates':[12.9323792,77.6936946]},
                           {'coordinates':[12.9411696,77.6938809]},
                           {'coordinates':[12.9803668,77.693789]}]});
  }
});
});
