var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Book = mongoose.model('Book');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

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

exports.uploadCoverFile = function(req,res,next){
	var coverData = req.files.uploadCover;
	var filePath = coverData.path;
	var originalFilename = coverData.originalFilename;

	if(originalFilename){
		fs.readFile(filePath, function(err,data){
			var timestamp = Date.now();
			var type = coverData.type.split('/')[1];
			var cover = timestamp + '.' + type;
			//?
			var newPath = path.join(__dirname, '../../', '/public/upload/' + cover);
			fs.writeFile(newPath, data, function(err) {
				if(err){
					console.log(err);
				}
				req.cover = cover;
				next();
			});
		});
	}else{
		//这里坑爹的放了个错误，没有把next放到else里去。
		//导致文件读取较慢但是next已经执行了，所以直接执行了下一个路由
		next();
	}
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
	var coverName = req.cover;
	if(coverName){
		bookObj.cover = coverName;
	}
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
	var id =	req.param('id');
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