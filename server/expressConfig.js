var bodyParser = require("body-parser"),
  morgan = require("morgan"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  passport = require("passport"),
  helmet = require("helmet"),
  compression = require("compression");

module.exports = function(app, express, config) {
  require("dotenv").config();
  // Serve static assets from the app folder. This enables things like javascript
  // and stylesheets to be loaded as expected. You would normally use something like
  // nginx for this, but this makes for a simpler demo app to just let express do it.
  app.use(express.static(config.rootPath + "/app/"));

  // Set the view directory, this enables us to use the .render method inside routes
  app.set("views", config.rootPath + "/app/views");

  // parse cookies
  app.use(cookieParser());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // create session
  app.use(session({ secret: "praca inzynierska" }));

  // use passport
  app.use(passport.initialize());
  app.use(passport.session());
  // use morgan
  app.use(morgan("dev"));

  // use helmet and compression
  app.use(helmet());
  app.use(compression());
};
