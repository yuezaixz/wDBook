var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore');
var port = process.env.PORT || 3022;
var app = express();
var fs = require('fs');
var dbUrl = 'mongodb://localhost/wDBook';

mongoose.connect(dbUrl);

// models loading
var models_path = __dirname + '/app/models';
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
walk(models_path);

app.set('views','./app/views/pages');
app.set('view engine','jade');
//会进行表单数据格式化
app.use(bodyParser());
//静态资源的获取目录
app.use(express.static(path.join(__dirname,'public')));

//设置路由
require('./config/routes')(app);
//监听接口
app.listen(port);
//设置moment为全局内置对象
app.locals.moment = require('moment');

console.log('wDBook started on port ' + port);
