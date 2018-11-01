var User = require('../models/user');
var Event = require('../models/event');
var auth = require('../auth');
var security = require('../security');

module.exports = function(app){

  app.get('/users', auth.requiresRole('admin'), function(req, res){
    User.find({}, function(err, users) {
      if (err) {
        res.status(400);
        res.send({reason: err.toString()});
      } else {
        res.json(users);
      }
    });
  });

  //auth
  app.post('/login', auth.authenticate);
  app.post('/logout', auth.requiresLogin, function(req,res) {
    req.logout();
    res.end();
  });

  app.get('/users/:id', auth.requiresLogin, function(req, res){
    var userId = req.params.id;
    User.findOne({ _id: userId})
        .populate('events')
        .populate({
            path: 'offers',
            populate: {
              path: 'event_id'
            }
          }
        )
        .exec(function(err, user) {
          if (err) {
            res.status(400);
            res.send({reason: err.toString()});
          } else {
            res.json(user);
          }
        });
  });
  app.put('/users', auth.requiresLogin, function(req, res) {
    var userUpdate = req.body;

    if(req.user._id != userUpdate._id && !req.user.hasRole('admin')) {
      res.status(403);
      return res.end();
    }

    req.user.username = userUpdate.username;
    req.user.email = userUpdate.email;
    req.user.name = userUpdate.name;
    req.user.age = userUpdate.age;
    req.user.location = userUpdate.location;
    req.user.tel = userUpdate.tel;
    req.user.car =  userUpdate.car;
    req.user.bio = userUpdate.bio;
    if(userUpdate.password && userUpdate.password.length > 0) {
      req.user.salt = security.createSalt();
      req.user.password = security.hashPwd(req.user.salt, userUpdate.password);
    }

    req.user.save(function(err) {
      if(err) {
        res.status(400);
        return res.send({reason: err.toString()});
      } else {
        res.send(req.user);
      }
    });
  });
  app.post('/users', function(req, res) {
    var newUser = req.body;
    console.log(newUser);
    newUser.username = newUser.username.toLowerCase(); //zabezpieczenie
    newUser.email = newUser.email.toLowerCase(); //zabezpieczenie
    newUser.salt = security.createSalt();
    newUser.password = security.hashPwd(newUser.salt, newUser.password);


    User.create(newUser, function(err, user) {
      if(err) {
        if(err.toString().indexOf('E11000') > -1) {
          err = new Error('Duplicate Username');
        }
        res.status(400);
        res.send({reason:err.toString()});
      }
      console.log(user);
      req.logIn(user, function(err) {
        if(err) {return next(err);}
        res.send(user);
      });
    });
  });

  app.delete('/users/:id', auth.requiresRole('admin'), function(req, res) {
    var id = req.params.id;
    User.findOneAndRemove({_id: id}, function (err, user) {
      if (err) {
        res.status(400);
        return res.send({reason: err.toString()});
      } else {
        user.remove();
        res.send(200);
      }
    });
  });
};
