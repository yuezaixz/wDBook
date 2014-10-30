var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  // 0: nomal user
  // 1: verified user
  // 2: professonal user
  // >10: admin
  // >50: super admin
  role: {
    type: Number,
    default: 0
  },
  meta: {
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
UserSchema.pre('save', function(next) {
  var user = this;

  if (this.isNew) {
    this.meta.createTime = this.meta.updateTime = Date.now();
  }
  else {
    this.meta.updateTime = Date.now();
  }
  next();
});
UserSchema.methods = {
  comparePassword: function(_password, cb) {
    cb(null, _password === this.password);
    // bcrypt.compare(_password, this.password, function(err, isMatch) {
    //   if (err) return cb(err)

    //   cb(null, isMatch)
    // })
  }
};

UserSchema.statics = {
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

module.exports = UserSchema;