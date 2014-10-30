var User = require('../app/controllers/user');
var Book = require('../app/controllers/book');
var Index = require('../app/controllers/index');

module.exports = function(app) {

	// pre handle user
	/*app.use(function(req, res, next) {
		var _user = req.session.user;

		app.locals.user = _user;

		next();
	});*/

	//路由定义
	app.get('/',Index.index);
	app.get('/results',Index.search);
	app.get('/admin/list',Book.list);
	app.delete('/admin/movie/list',Book.list);
	app.get('/book/:id',Book.detail);
	app.get('/admin/book',Book.new);
	app.get('/update/:id',Book.update);
	app.post('/admin/book/new',Book.list);

	app.post('/user/signup',User.signup);
	app.post('/user/signin',User.signin);
	app.get('/logout',User.logout);
};