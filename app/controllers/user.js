var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.signup = function(req,res){
	var _user = req.body.user;
	User.findOne({name:_user.name} , function(err,user){
		if(err){
			console.log(err);
		}
		if(user){
			return res.redirect('/signin');
		}else {
			user = new User(_user);
			user.save(function(err, user) {
				if (err) {
					console.log(err);
				}
				res.redirect('/');
			});
		}
	});
};

exports.signin = function(req,res){
	var _user = req.body.user;
	var username = _user.name;
	var pwd = _user.password;
	User.findOne({name:username},function(err,user){
		user.comparePassword(pwd,function(err,isMatch){
			if (err) {
				console.log(err);
			}
			
			if (isMatch) {
				req.session.user = user;
				return res.redirect('/');
			} else {
				return res.redirect('/signin');
			}
		});
	});
};

exports.logout = function(req,res){
	delete req.session.user;
	res.redirect('/');
};