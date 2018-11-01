var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./config')[env];

// Load Express Configuration
require('./expressConfig')(app, express, config);

require('./db/mongoose')(config);

require('./passport')();

// Root route
app.get('/', function (req, res) {
  res.sendfile('index.html', {root: app.settings.views});
});

// Load routes
require('./routes/user')(app); //user routes
require('./routes/event')(app); // event routes
require('./routes/offer')(app); // event routes
require('./routes/report')(app); // event routes
require('./routes/message')(app); // event routes


module.exports = app;
