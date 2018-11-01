var Report = require('../models/report');
var auth = require('../auth');

module.exports = function (app) {
  app.get('/reports', auth.requiresLogin, function (req, res) {
    Report.find()
      .populate('user_id')
      .populate('event_id')
      .exec(function (err, report) {
        if (err) {
          res.status(400);
          res.send({reason: err.toString()});
        } else {
          res.json(report);
        }
      });
  });

  app.post('/reports', auth.requiresLogin, function (req, res) {
    var report = req.body;

    Report.create(report, function (err, report) {
      if (err) {
        res.status(400);
        res.send({reason: err.toString()});
      } else {
        res.json(report);
      }
    });
  });

  app.put('/reports/:id', auth.requiresRole('admin'), function (req, res) {
    var id = req.params.id;
    Report.findOne({_id: id}, function (err, report) {
      if (err) throw err;
      report.done = true;
      report.save(function (err) {
        if (err) {
          res.status(500);
          res.send({reason: err.toString()});
        } else {
          res.send(204);
        }
      });
    });
  });
};
