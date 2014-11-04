var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Book = mongoose.model('Book');
var _ = require('underscore');

exports.detail = function(req,res){
	var id = req.params.id;
	Book.findById(id,function(err,book){
		if(err){
			console.log(err);
		}
		Comment
			.find({'book':id})
			.populate('from', 'name')
			.populate('reply.from reply.to', 'name')
			.exec(function(err,comments){
				if(err){
					console.log(err);
				}
				res.render('detail',{
					title:'wDBook ---'+book.title+'详情页',
					book:book,
					comments: comments
				});
			});
	});
};

exports.new = function(req,res){
	res.render('admin',{
		title:'wDBook ---后台录入页面',
		book:{}
	});
};

exports.update = function(req,res){
	var id = req.param('id');
	Book.findById(id,function(err,book){
		res.render('admin',{
			title:'wDBook ---后台修改页面',
			book:book
		});
	});
};

exports.save = function(req,res){
	var id = req.body.book._id;
	var bookObj = req.body.book;
	var _book;
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
		_book = new Book(bookObj);
		_book.save(function(err,book){
			if (err) {
				console.log(err);
			}
			res.redirect('/book/'+book._id);
		});
	}
};

exports.list = function(req,res){
	Book.fetch(function(err,books){
		if(err){
			console.log(err);
		}
		res.render('list',{
			title:'wDBook ---列表页',
			books:books
		});
	});
};

exports.del = function(req,res){
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
};