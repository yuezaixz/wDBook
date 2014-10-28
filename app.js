var express = require('express');
var port = process.env.PORT || 3022;
var app = express();

app.set('views','./views');
app.set('view engine','jade');
app.listen(port);

console.log('wDBook started on port ' + port);

//路由定义
app.get('/',function(req,res){
	res.render('index',{
		title:'wDBook ---首页'
	});
});
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'wDBook ---列表页'
	});
});
app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'wDBook ---详情页'
	});
});
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'wDBook ---后台录入页面'
	});
});
