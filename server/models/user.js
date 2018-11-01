var mongoose = require('mongoose');
var Security = require('../security');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  age: {type: Number, required: true},
  roles: [String],
  location: String,
  bio: String,
  car: String,
  tel: String,
  events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
  offers: [{type: Schema.Types.ObjectId, ref: 'Offer'}],
  created_at: Date,
  updated_at: Date,
  salt: String
});

userSchema.pre('save', function (next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

userSchema.methods = {
  authenticate: function (passwordToMatch) {
    return Security.hashPwd(this.salt, passwordToMatch) === this.password;
  },
  hasRole: function (role) {
    return this.roles.indexOf(role) > -1;
  }

};

var User = mongoose.model('User', userSchema);

module.exports = User;