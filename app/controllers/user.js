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
exports.showSignin = function(req,res){
	res.render('signin',{
		title:'登录页面'
	});
};
exports.showSignup = function(req,res){
	res.render('signup',{
		title:'注册页面'
	});
};

exports.signin = function(req,res){
	var _user = req.body.user;
	var username = _user.name;
	var pwd = _user.password;
	User.findOne({name:username},function(err,user){
		if(!user){
			return res.redirect('/signin');
		}
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
exports.needSignin = function(req,res,next){
	var user = req.session.user;
	if(!user){
		res.redirect('/signin');
	}
	next();
};
exports.needAdmin = function(req,res,next){
	var user = req.session.user;
	if(!user || user.role <= 50){
		res.redirect('/signin');
	}
	next();
};