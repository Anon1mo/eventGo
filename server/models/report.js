var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  event_id: {type: Schema.Types.ObjectId, ref: 'Event'},
  msg: String,
  done: Boolean
});

var Report = mongoose.model('Report', reportSchema);

module.exports = Report;