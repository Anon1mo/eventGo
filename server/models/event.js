var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var eventSchema = new Schema({
  name: {type: String, required: true, unique: true},
  date: {type: Date, required: true},
  location: String,
  desc: String,
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  offers: [{type: Schema.Types.ObjectId, ref: 'Offer'}],
  created_at: Date,
  updated_at: Date
});

eventSchema.pre('save', function (next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

eventSchema.pre('remove', function (next) {

  var id = this._id;

  User.find({events: id}, function (err, users) {
    console.log(users);
    if (err) throw console.log(error.toString());
    for (var i = 0; i < users.length; i++) {
      User.findOne({events: id})
        .exec(function (err, user) {
          var delEvent = user.events.indexOf(id);
          if (delEvent !== -1) {
            user.events.splice(delEvent, 1);
            console.log(user);
            user.save(function (err) {
              if (err) throw err;
            });
          }
        });
    }
  });
  next();
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;