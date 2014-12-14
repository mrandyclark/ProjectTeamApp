var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.locals._ = require("underscore");
app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
var routeTeamMembers = require('./routes/team-members');
var routeCodeReviews = require('./routes/code-reviews');
var routeProjects = require('./routes/projects');
var routeSchedule = require('./routes/schedule');
var routeClients = require('./routes/clients');

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/projectsteam');

var Datastore = require('nedb');
var db = {};
db.reviewRooms = new Datastore({ filename: './database/review-rooms.db', autoload: true });
db.positions = new Datastore({ filename: './database/positions.db', autoload: true });
db.clients = new Datastore({ filename: './database/clients.db', autoload: true });
db.members = new Datastore({ filename: './database/team-members.db', autoload: true });
db.projects = new Datastore({ filename: './database/projects.db', autoload: true });
db.schedules = new Datastore({ filename: './database/schedules.db', autoload: true });

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/code-reviews', routeCodeReviews);
app.use('/members', routeTeamMembers);
app.use('/projects', routeProjects);
app.use('/schedule', routeSchedule);
app.use('/clients', routeClients);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
});