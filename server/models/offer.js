var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');
var Event = require('./event');

var offerSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  event_id: {type: Schema.Types.ObjectId, ref: 'Event'},
  price: {type: Number, required: true},
  desc: {type: String, required: true},
  placesAv: Number,
  placesMax: Number,
  departure: String,
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  created_at: Date,
  updated_at: Date
});

offerSchema.pre('save', function (next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

offerSchema.pre('remove', function (next) {

  var id = this._id;

  User.find({offers: id}, function (err, users) {
    if (err) throw err;
    for (var i = 0; i < users.length; i++) {
      User.findOne({offers: id}, function (err, user) {
        var delOffer = user.offers.indexOf(id);
        if (delOffer !== -1) {
          user.offers.splice(delOffer, 1);
          user.save(function (err) {
            if (err) throw err;
          });
        }
      });
    }
  });

  Event.find({offers: id}, function (err, events) {
    if (err) throw err;
    for (var i = 0; i < events.length; i++) {
      Event.findOne({offers: id}, function (err, event) {
        var delOffer = event.offers.indexOf(id);
        if (delOffer !== -1) {
          event.offers.splice(delOffer, 1);
          event.save(function (err) {
            if (err) throw err;
          });
        }
      });
    }
  });

  next();
});

var Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;