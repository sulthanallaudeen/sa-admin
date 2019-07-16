var express = require('express');
var router = express.Router();
var env = require('dotenv').config();
var config = require("../config/config");




/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(config.app.name);
  res.render('index', { title: env.parsed.app_name });
});

module.exports = router;
