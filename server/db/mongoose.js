var mongoose = require('mongoose');

module.exports = function (config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error..'));
  db.once('open', function callback() {
    console.log('baza danych eventGo otworzona');
  });

  var User = require('../models/user');
  var Event = require('../models/event');
  var Offer = require('../models/offer');
  var Message = require('../models/message');
  var Offer = require('../models/report');
  console.log('Modele zaimportowane');

  User.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
      require('./sampledb')();
    }
  });

};
