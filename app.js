var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var logger = require('morgan');
var markdown = require('markdown-js');
//session持久化在mongoDb的库,express4.0、connect-mongo0.4后，
//最后的参数不再传入express了，而传入session，
var mongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3022;
var app = express();
var fs = require('fs');

var setting = {
	cookieSecret:"DAVIDLOVETY",
	sessionName:"sessions",
	dbUrl:'mongodb://localhost/wDBook',
	viewPath:'./app/views/pages',
	viewEngine:'jade',
	models_path:__dirname + '/app/models',
	static_path:'public',
	routePath:'./config/routes'

};
mongoose.connect(setting.dbUrl);

// 模型先加载到mongo中去，不加载的话控制器总会报错
var walk = function(path) {
	fs
		.readdirSync(path)
		.forEach(function(file) {
			var newPath = path + '/' + file;
			var stat = fs.statSync(newPath);

			if (stat.isFile()) {
				if (/(.*)\.(js|coffee)/.test(file)) {
					require(newPath);
				}
			}
			else if (stat.isDirectory()) {
				walk(newPath);
			}
		});
};
walk(setting.models_path);

app.set('views',setting.viewPath);
app.set('view engine',setting.viewEngine);

//markdown的解析器
app.engine('md', function(path, options, fn){
	fs.readFile(path, 'utf8', function(err, str){
		if (err) return fn(err);
		str = markdown.parse(str).toString();
		fn(null, str);
	});
});

//页面内容解析，会进行表单数据格式化
app.use(bodyParser());

//session依赖的cookie解析
app.use(cookieParser());
//app.use(express.multipart());
//开启session
app.use(session({
	//防止被篡改
	secret: setting.cookieSecret,
	//存session在mongoDB
	store: new mongoStore({
		url: setting.dbUrl,
		//存在mongoDb中的session的名字
		collection: setting.sessionName
	})
}));
//开发模式开启DEBUG
if('development' === app.get("env")){
	app.set('showStackError',true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug',true);
}

//静态资源的获取目录
app.use(express.static(path.join(__dirname,setting.static_path)));

//设置路由
require(setting.routePath)(app);
//监听接口
app.listen(port);
//设置moment为全局内置对象
app.locals.moment = require('moment');

app.locals.makeHtml = markdown.makeHtml;

console.log('wDBook started on port ' + port);
