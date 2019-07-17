var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var util = require("./routes/util");
var cors = require('cors')
var config = require("./config/config");

var app = express();
app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(function (req, res, next) {
  var url = ['/','/ping','/user/login','/favicon.ico'];
  if(url.indexOf(req.originalUrl)==-1){ // with array
    // Validating methods
    // if(req.method=='POST') {
    //   if(req.body.token==undefined){
    //     res.status(401).json({ success: false, message: 'Unauthorized' });
    //   } else {
    //     util.authCheck(req.headers.token, function(data){
    //       if(data){
    //         next();
    //       } else {
    //         res.status(401).json({ success: false, message: 'Token expired' });
    //       }
    //     });
    //   }
    // } else 
    if (req.method == 'GET' || req.method =='POST') {
      if(req.headers.token==undefined){
        res.status(401).json({ success: false, message: config.app.msg_unauthorized });
      } else {
        util.authCheck(req.headers.token, function(data){
          if(data){
            next();
          } else {
            res.status(401).json({ success: false, message: config.app.msg_token_expired });
          }
        });
      }
    } else {
      res.status(401).json({ success: false, message: config.app.msg_unauthorized });
    }
  } else {
    // Accessing general url
    console.log('Accessing general url',req.originalUrl);
    next();
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', users);
app.use('/dashboard', dashboard);

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/sb-admin-2', express.static(__dirname + '/node_modules/sb-admin-2'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
