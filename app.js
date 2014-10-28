var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3022;
var app = express();

app.set('views','./views/pages');
app.set('view engine','jade');
//会进行表单数据格式化
app.use(bodyParser());
//静态资源的获取目录
app.use(express.static(path.join(__dirname,'public')));

app.listen(port);
app.locals.moment = require('moment');

console.log('wDBook started on port ' + port);

//路由定义
app.get('/',function(req,res){
	res.render('index',{
		title:'wDBook ---首页',
		books:[{
			_id:1,
			title:'干法',
			cover:'http://epaper.bjnews.com.cn/images/2010-06/26/C09/c09626cb002.jpg'
		},{
			_id:1,
			title:'干法',
			cover:'http://epaper.bjnews.com.cn/images/2010-06/26/C09/c09626cb002.jpg'
		},{
			_id:1,
			title:'干法',
			cover:'http://epaper.bjnews.com.cn/images/2010-06/26/C09/c09626cb002.jpg'
		},{
			_id:1,
			title:'干法',
			cover:'http://epaper.bjnews.com.cn/images/2010-06/26/C09/c09626cb002.jpg'
		}
		]
	});
});
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'wDBook ---列表页',
		books:[{
			_id:1,
			title:'干法',
			author:'稻盛和夫',
			country:'日本',
			language:'汉语',
			year:'2010',
			meta:{
				createTime:'20141028'
			},
			summary:'介绍稻盛和夫老先生所理解的人生的意义及通过努力工作改变人生的看法',
			cover:'http://epaper.bjnews.com.cn/images/2010-06/26/C09/c09626cb002.jpg'
		},{
			_id:2,
			title:'干法',
			author:'稻盛和夫',
			country:'日本',
			language:'汉语',
			year:'2010',
			meta:{
				createTime:'20141028'
			},
			summary:'介绍稻盛和夫老先生所理解的人生的意义及通过努力工作改变人生的看法',
			cover:'http://epaper.bjnews.com.cn/images/2010-06/26/C09/c09626cb002.jpg'
		},{
			_id:3,
			title:'干法',
			author:'稻盛和夫',
			country:'日本',
			language:'汉语',
			year:'2010',
			meta:{
				createTime:'20141028'
			},
			summary:'介绍稻盛和夫老先生所理解的人生的意义及通过努力工作改变人生的看法',
			cover:'http://epaper.bjnews.com.cn/images/2010-06/26/C09/c09626cb002.jpg'
		},{
			_id:4,
			title:'干法',
			author:'稻盛和夫',
			country:'日本',
			language:'汉语',
			year:'2010',
			meta:{
				createTime:'20141028'
			},
			summary:'介绍稻盛和夫老先生所理解的人生的意义及通过努力工作改变人生的看法',
			cover:'http://epaper.bjnews.com.cn/images/2010-06/26/C09/c09626cb002.jpg'
		}
		]
	});
});
app.get('/book/:id',function(req,res){
	res.render('detail',{
		title:'wDBook ---详情页',
		book:{
			_id:1,
			title:'干法',
			author:'稻盛和夫',
			country:'日本',
			language:'汉语',
			year:'2010',
			summary:'介绍稻盛和夫老先生所理解的人生的意义及通过努力工作改变人生的看法',
			cover:'http://epaper.bjnews.com.cn/images/2010-06/26/C09/c09626cb002.jpg'
		}
	});
});
app.get('/admin/book',function(req,res){
	res.render('admin',{
		title:'wDBook ---后台录入页面',
		book:{
			_id:1,
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
