var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./models/book');
var _ = require('underscore');
var port = process.env.PORT || 3022;
var app = express();

mongoose.connect('mongodb://localhost/wDBook');

app.set('views','./views/pages');
app.set('view engine','jade');
//会进行表单数据格式化
app.use(bodyParser());
//静态资源的获取目录
app.use(express.static(path.join(__dirname,'public')));

app.listen(port);
//设置moment为全局内置对象
app.locals.moment = require('moment');

console.log('wDBook started on port ' + port);

//路由定义
app.get('/',function(req,res){
	Book.fetch(function(err,books){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'wDBook ---首页',
			books:books
		});
	});
});
app.get('/admin/list',function(req,res){
	Book.fetch(function(err,books){
		if(err){
			console.log(err);
		}
		res.render('list',{
			title:'wDBook ---列表页',
			books:books
		});
	});
});
app.get('/book/:id',function(req,res){
	var id = req.params.id;
	Book.findById(id,function(err,book){
	console.log(book);
		res.render('detail',{
			title:'wDBook ---'+book.title+'详情页',
			book:book
		});
	});
});
app.get('/admin/book',function(req,res){
	res.render('admin',{
		title:'wDBook ---后台录入页面',
		book:{
			_id:'',
			title:'',
			author:'',
			country:'',
			language:'',
			year:'',
			summary:'',
			buyAddress:'',
			cover:''
		}
	});
});
app.post('/admin/book/new',function(req,res){
	var id = req.body.book._id;
	var bookObj = req.body.book;
	var _book;
	if(typeof(id) !== 'undefined'){
		Book.findById(function(err,book){
			if(err){
				console.log(err);
			}

			_book = _.extend(book,bookObj);
			_book.save(function(err,book){
				if (err) {
					console.log(err);
				}
				res.redirect('/book/'+book._id);
			});
		});
	} else {
		_book = new Book({
			author : bookObj.author,
			title : bookObj.title,
			language : bookObj.language,
			country : bookObj.country,
			summary : bookObj.summary,
			flash : bookObj.flash,
			cover : bookObj.cover,
			year : bookObj.year
		});
		_book.save(function(err,book){
			if (err) {
				console.log(err);
			}
			res.redirect('/book/'+book._id);
		});
	}
});
