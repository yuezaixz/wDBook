var User = require('../app/controllers/user');
var Book = require('../app/controllers/book');
var Index = require('../app/controllers/index');
var Comment = require('../app/controllers/comment');
var markdown = require('markdown-js');

module.exports = function(app) {

	// 前置处理器，应用开始时先监测session、cookie中的用户身份
	app.use(function(req, res, next) {
		var _user = req.session.user;

		app.locals.user = _user;

		next();
	});

	//路由定义
	app.get('/',Index.index);
	app.get('/results',Index.search);
	
	app.get('/admin/book/list',Book.list);
	app.delete('/admin/book/list',Book.del);
	app.get('/book/:id',Book.detail);
	app.get('/admin/book',User.needSignin,User.needAdmin,Book.new);
	app.get('/update/:id',Book.update);
	app.post('/admin/book/new',Book.save);

	app.post('/user/comment',Comment.save);

	app.post('/user/signup',User.signup);
	app.post('/user/signin',User.signin);
	app.get('/signin',User.showSignin);
	app.get('/signup',User.showSignup);
	app.get('/logout',User.logout);

	app.get('/test',function(req,res){
		var html = markdown.makeHtml("[David's Blog](http://yuezaixz.logdown.com/ \"Click\") \n");
		res.send(html);
		res.end();
	});

	app.get('/md', function(req, res) {
		res.render('test.md', {layout: false});
	});
};