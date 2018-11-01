var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  user1: [{type: Schema.Types.ObjectId, ref: 'User'}],
  user2: {type: Schema.Types.ObjectId, ref: 'User'},
  msgs: [{
    sender: String,
    msg: String,
    date: Date
  }],
  created_at: Date,
  updated_at: Date
});

messageSchema.pre('save', function (next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;