var User = require("../models/user");
var Event = require("../models/event");
var auth = require("../auth");

module.exports = function(app) {
  //get all events
  app.get("/events", function(req, res) {
    Event.find()
      .sort("date: -1")
      .exec(function(err, events) {
        if (err) {
          res.status(400);
          res.send({ reason: err.toString() });
        } else {
          res.json(events);
        }
      });
  });
  //get one event
  app.get("/events/:id", auth.requiresLogin, function(req, res) {
    var eventId = req.params.id;

    Event.findOne({ _id: eventId })
      .populate("users")
      .populate("offers")
      .exec(function(err, event) {
        if (err) {
          res.status(400);
          res.send({ reason: err.toString() });
        } else {
          res.json(event);
        }
      });
  });
  // add event
  app.post("/events", auth.requiresLogin, function(req, res) {
    var newEvent = req.body;

    Event.create(newEvent, function(err, event) {
      if (err) {
        res.status(400);
        res.send({ reason: err.toString() });
      } else {
        res.send(event);
      }
    });
  });

  //update event
  app.put("/events", auth.requiresLogin, function(req, res) {
    var editEvent = req.body;

    Event.findOne({ _id: editEvent._id }, function(err, event) {
      if (err) {
        res.status(400);
        res.send({ reason: err.toString() });
      } else {
        event.name = editEvent.name || "";
        event.location = editEvent.location || "";
        event.desc = editEvent.desc || "";

        event.save(function(err) {
          if (err) {
            res.status(500);
            return res.send({ reason: err.toString() });
          } else {
            res.json(event);
          }
        });
      }
    });
  });

  // add user to event
  app.post("/events/:id/join", auth.requiresLogin, function(req, res) {
    var eventId = req.body._id;
    var userId = req.params.id;
    Event.findOne({ _id: eventId }, function(err, event) {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      } else {
        if (event != null) {
          Event.update({ _id: eventId }, { $push: { users: userId } }, function(
            error,
            success
          ) {
            if (error) {
              res.status(500);
              return res.send({ reason: err.toString() });
            } else {
              console.log(success);
            }
          });
        }
        User.update({ _id: userId }, { $push: { events: eventId } }, function(
          error,
          success
        ) {
          if (error) {
            res.status(500);
            return res.send({ reason: err.toString() });
          } else {
            console.log(success);
          }
        });
        res.send(200);
      }
    });
  });

  // delete user from event
  app.post("/events/:id/leave", auth.requiresLogin, function(req, res) {
    var eventId = req.body._id;
    var userId = req.params.id;
    Event.findOne({ _id: eventId, users: userId }, function(err, event) {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      } else {
        var delUser = event.users.indexOf(userId);
        if (delUser !== -1) {
          event.users.splice(delUser, 1);
          event.save(function(err) {
            if (err) {
              res.status(500);
              return res.send({ reason: err.toString() });
            }
          });
        }
        User.findOne({ _id: userId, events: eventId }, function(err, user) {
          var delEvent = user.events.indexOf(eventId);
          if (delEvent !== -1) {
            user.events.splice(delEvent, 1);
            user.save(function(err) {
              if (err) {
                res.status(500);
                return res.send({ reason: err.toString() });
              }
              res.send(200);
            });
          }
        });
      }
    });
  });

  // delete event
  app.delete("/events/:id", auth.requiresRole("admin"), function(req, res) {
    var id = req.params.id;

    Event.findOneAndRemove({ _id: id }, function(err, event) {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      }
      event.remove();

      res.send(204);
    });
  });
};
