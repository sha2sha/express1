var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./data/users');
var usr = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/users',usr.my1);
app.get('/users/new', function(req, res) {
res.render('users/new', {title: "New User"});
});
app.get('/users/:name', function(req, res, next){
var user = users[req.params.name];
if (user) {
res.render('users/profile', {title: 'User profile', user: user});
} else {
next();
}
});
app.post('/users', function(req, res) {
if (users[req.body.username]) {
res.send('Conflict', 409);
} else {
users[req.body.username] = req.body;
res.redirect('/users');
}
});
app.del('/users/:name', function(req, res, next) {
if (users[req.params.name]) {
delete users[req.params.name];
res.redirect('/users');
} else {
next();
}
});

//app.get('/users',route.users);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
