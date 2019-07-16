var express = require('express');
var router = express.Router();
var env = require('dotenv').config();
var config = require("../config/config");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ success: true, data: 'Welcome to '+env.parsed.app_name });
});

router.get('/ping', function(req, res, next) {
  res.status(200).json({ success: true, message: config.app.ping_success});
});

module.exports = router;
