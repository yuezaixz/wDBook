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
app.get('/results',function(req,res){
	var q = req.param('q');
	var cond = {};
	if (q) {
		//如果有搜索请求就增加查询条件
		//用正则表达式得到的pattern对title属性进行模糊查询
		//这里是搜集合里title属性包含str串的所有结果
		var pattern = new RegExp("^.*"+q+".*$");
		cond.title = pattern;
	}
	Book.find(cond,function(err,books){
		if(err){
			console.log(err);
		}
		res.render('list',{
			title:'wDBook ---列表页',
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
app.delete('/admin/movie/list',function(req,res){
	//拿路径中的参数 比如/admin/movie/:id
	// var id = req.params.id;
	//拿POST提交表单中的id
	// var id = req.body.id;
	//拿路径中的问号后的参数
	// var id = req.query.id

	//express封装的id，先路径，后POST数据，最后再问号后
	var id =  req.param('id');
	if(id){
		Book.remove({_id:id},function(err,book){
			if(err){
				console.log(err);
			}else{
				res.json({success:1});
			}
		});
	}
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
app.get('/update/:id',function(req,res){
	var id = req.param('id');
	Book.findById(id,function(err,book){
		res.render('admin',{
			title:'wDBook ---后台修改页面',
			book:book
		});
	});
});
app.post('/admin/book/new',function(req,res){
	var id = req.body.book._id;
	var bookObj = req.body.book;
	var _book;
	console.log(typeof(id) !== 'undefined');
	if(typeof(id) !== 'undefined'){
		Book.findById(id,function(err,book){
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
