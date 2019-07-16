var express = require('express');
var router = express.Router();
var env = require('dotenv').config();
var config = require("../config/config");
var dbModel = require("../models/index");


/* GET home page. */
router.get('/', function(req, res, next) {
  dbModel.User.findOne({
    where: {email: 'sa@sulthanallaudeen.com'},
    attributes: ['id','name','email', 'password']
  }).then(userData => {
    if(userData){
      res.status(200).json({ success: 1, data: userData.dataValues });
    } else {
      res.status(200).json({ success: 2, message: 'User not found' });
    }
  })

  //res.status(200).json({ success: true, data: 'Welcome to '+env.parsed.APP_NAME });
});

router.get('/ping', function(req, res, next) {
  res.status(200).json({ success: true, message: config.app.ping_success});
});

module.exports = router;
