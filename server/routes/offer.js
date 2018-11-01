var Offer = require("../models/offer");
var User = require("../models/user");
var Event = require("../models/event");
var auth = require("../auth");

module.exports = function(app) {
  //get all offers
  app.get("/offers", auth.requiresRole("admin"), function(req, res) {
    Offer.find()
      .populate("user_id")
      .populate("event_id")
      .exec(function(err, offers) {
        if (err) {
          res.status(400);
          return res.send({ reason: err.toString() });
        } else {
          res.json(offers);
        }
      });
  });
  //get one offer
  app.get("/offers/:id", auth.requiresLogin, function(req, res) {
    var id = req.params.id;
    Offer.findOne({ _id: id })
      .populate("user_id")
      .populate("event_id")
      .populate("users")
      .exec(function(err, offer) {
        if (err) {
          res.status(500);
          return res.send({ reason: err.toString() });
        } else {
          res.json(offer);
        }
      });
  });
  //create offer
  app.post("/offers", auth.requiresLogin, function(req, res) {
    var newOffer = req.body;

    Offer.create(newOffer, function(err, offer) {
      if (err) {
        res.status(400);
        res.send({ reason: err.toString() });
      }
      Event.update(
        { _id: newOffer.event_id },
        { $push: { offers: offer._id } },
        function(error, success) {
          if (error) {
            res.status(500);
            return res.send({ reason: err.toString() });
          } else {
            console.log(success);
          }
        }
      );
      res.json(offer);
    });
  });

  //edit offer
  app.put("/offers", auth.requiresLogin, function(req, res) {
    var editOffer = req.body;
    Offer.findOne({ _id: editOffer._id }, function(err, offer) {
      if (err) throw err;
      offer.placesAv = editOffer.placesAv || 0;
      offer.price = editOffer.price || offer.price;
      offer.desc = editOffer.desc || "";
      offer.departure = editOffer.departure || Date();

      offer.save(function(err) {
        if (err) {
          res.status(500);
          return res.send({ reason: err.toString() });
        }
      });
      res.send(200);
    });
  });

  // join offer
  app.post("/offers/:id/join", auth.requiresLogin, function(req, res) {
    var offerId = req.body._id;
    var userId = req.params.id;

    Offer.findOne({ _id: offerId }, function(err, offer) {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      }
      offer.placesAv--;
      offer.save(function(err) {
        if (err) {
          res.status(500);
          return res.send({ reason: err.toString() });
        }
      });

      Offer.update({ _id: offerId }, { $push: { users: userId } }, function(
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

      User.update({ _id: userId }, { $push: { offers: offerId } }, function(
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
    });
  });
  //edit offer's users
  app.post("/offers/:id/leave", auth.requiresLogin, function(req, res) {
    var offerId = req.body._id;
    var userId = req.params.id;
    Offer.findOne({ _id: offerId }, function(err, offer) {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      }
      var indexUser = offer.users.indexOf(userId);
      if (indexUser !== -1) {
        offer.users.splice(indexUser, 1);
        offer.placesAv++;
        offer.save(function(err) {
          if (err) {
            res.status(500);
            return res.send({ reason: err.toString() });
          }
        });
        User.findOne({ _id: userId }, function(err, user) {
          var indexEvent = user.offers.indexOf(offerId);
          if (indexEvent !== -1) {
            user.offers.splice(indexEvent, 1);
            user.save(function(err) {
              if (err) {
                res.status(500);
                return res.send({ reason: err.toString() });
              }
            });
          }
        });
        res.send(200);
      }
    });
  });

  // get user's offers
  app.get("/offers/:id/user", auth.requiresLogin, function(req, res) {
    var userId = req.params.id;
    Offer.find({ user_id: userId })
      .populate("users")
      .populate("event_id")
      .exec(function(err, offers) {
        if (err) {
          res.status(400);
          return res.send({ reason: err.toString() });
        } else {
          res.json(offers);
        }
      });
  });
  //delete offer
  app.delete("/offers/:id", auth.requiresLogin, function(req, res) {
    var id = req.params.id;
    Offer.findOneAndRemove({ _id: id }, function(err, offer) {
      if (err) {
        res.status(400);
        return res.send({ reason: err.toString() });
      } else {
        offer.remove();
        res.send(200);
      }
    });
  });
};
