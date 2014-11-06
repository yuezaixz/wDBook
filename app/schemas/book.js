var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var BookSchema = new Schema({
	author: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	cover: String,
	articleAddress:String,
	year: Number,
	pv: {
		type: Number,
		default: 0
	},
	tags: String,
	meta: {
		createUser:String,
		updateUser:String,
		createTime: {
			type: Date,
			default: Date.now()
		},
		updateTime: {
			type: Date,
			default: Date.now()
		}
	}
});

// var ObjectId = mongoose.Schema.Types.ObjectId
BookSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createTime = this.meta.updateTime = Date.now();
	}
	else {
		this.meta.updateTime = Date.now();
	}

	next();
});

BookSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateTime')
			.exec(cb);
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb);
	}
};

module.exports = BookSchema;