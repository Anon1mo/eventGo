var User = require("../models/user");
var Message = require("../models/message");
var auth = require("../auth");

module.exports = function(app) {
  app.get("/messages/:id/user", auth.requiresLogin, function(req, res) {
    var id = req.params.id;
    console.log(req.params.id);
    Message.find({ user1: id })
      .sort({ updated_at: -1 })
      .populate("user1")
      .populate("user2")
      .exec(function(err, msgs) {
        if (err) {
          res.status(400);
          return res.send({ reason: err.toString() });
        } else {
          res.send(msgs);
        }
      });
  });

  app.get("/messages/:id/:id2", auth.requiresLogin, function(req, res) {
    var id1 = req.params.id1;
    var id2 = req.params.id2;
    Message.findOne({ user1: id1, user2: id2 })
      .populate("user1")
      .populate("user2")
      .exec(function(err, messages) {
        if (err) {
          res.status(400);
          return res.send({ reason: err.toString() });
        } else {
          res.json(messages);
        }
      });
  });

  app.post("/messages", auth.requiresLogin, function(req, res) {
    var msg = req.body;
    var oneMessage = { msg: msg.msg, date: new Date(), sender: msg.sender };

    Message.update(
      { user1: msg.user1, user2: msg.user2 },
      {
        $set: {
          user1: msg.user1,
          user2: msg.user2
        }
      },
      { upsert: true },
      function(err, message) {
        if (err) {
          res.status(400);
          return res.send({ reason: err.toString() });
        }

        // Message.findOne({user1: msg.user1, user2: msg.user2}, function (err, message) {
        //   message.msgs.push(oneMessage);
        //   message.save(function (err) {
        //     if (err) {
        //       res.status(500);
        //       return res.send({reason: err.toString()});
        //     }
        //   });
        // });

        Message.update(
          { user1: msg.user1, user2: msg.user2 },
          { $push: { msgs: oneMessage } },
          function(error, success) {
            if (error) {
              res.status(500);
              return res.send({ reason: err.toString() });
            } else {
              console.log(success);
            }
          }
        );
      }
    );

    Message.update(
      { user1: msg.user2, user2: msg.user1 },
      {
        $set: {
          user1: msg.user2,
          user2: msg.user1
        }
      },
      { upsert: true },
      function(err, message) {
        if (err) {
          res.status(400);
          return res.send({ reason: err.toString() });
        }
        // Message.findOne({user1: msg.user2, user2: msg.user1}, function (err, message) {
        //   message.msgs.push(oneMessage);
        //   message.save(function (err) {
        //     if (err) {
        //       res.status(500);
        //       return res.send({reason: err.toString()});
        //     } else {
        //       res.json(oneMessage);
        //     }
        //   });
        // });

        Message.update(
          { user1: msg.user2, user2: msg.user1 },
          { $push: { msgs: oneMessage } },
          function(error, success) {
            if (error) {
              res.status(500);
              return res.send({ reason: err.toString() });
            } else {
              console.log(success);
            }
          }
        );
      }
    );
  });
};
