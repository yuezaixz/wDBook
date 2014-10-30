var mongoose = require('mongoose');
var Book = mongoose.model('Book');

exports.index = function(req,res){
	Book.fetch(function(err,books){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'wDBook ---首页',
			books:books
		});
	});
};

exports.search = function(req,res){
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
};