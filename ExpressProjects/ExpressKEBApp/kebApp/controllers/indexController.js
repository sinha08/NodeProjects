exports.get_signup_page = function(req, res, next){
  // render sign up page here
}

exports.get_login_page = function(req, res, next){
  // render login page here
}

exports.authenticate_login = function(req, res, next){
  // authenticate logged in user here
}
exports.get_dashboard = function(req, res, next) {
  res.render('dashboard', { title: 'KEB Dashboard' ,blacklist_names:'Nahi khana yaha se'});
}
