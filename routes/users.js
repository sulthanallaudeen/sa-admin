var express = require('express');
var router = express.Router();
var dbModel = require("../models/index");
const bcrypt = require('bcrypt');
var util = require("./util");
var config = require("../config/config");

/* User Login */
router.post('/login', function(req, res, next) {
  dbModel.User.findOne({
    where: {email: req.body.email},
    attributes: ['id','name','email', 'password']
  }).then(userData => {
    if(userData){
      bcrypt.compare(req.body.password, userData.dataValues.password).then(function(matched) {
        if(matched){
          var token = util.generateToken();
          delete userData.dataValues.password;
          userData.dataValues.token = token;
          updateUserToken(userData.id,token);
          res.status(200).json({ success: 1, data: userData.dataValues });
        } else {
          res.status(200).json({ success: 0, message: config.app.msg_wrong_pwd });
        }
      });
    } else {
      res.status(200).json({ success: 2, message: config.app.msg_usr_not_found });
    }
  })
});

/* Get User Profile */
router.get('/', function(req, res, next) {
  dbModel.User.findOne({
    where: {api_token: req.headers.token},
    attributes: ['id','name','email','api_token']
  }).then(userData => {
    if(userData){
      res.status(200).json({ success: 1, data: userData.dataValues });
    } else {
      res.status(200).json({ success: 2, message: config.app.msg_usr_not_found });
    }
  })
});

/* Update Profile */
router.post('/', function(req, res, next) {
  dbModel.User.update(
    { name: req.body.name }, 
    { where: { api_token : req.headers.token }}
    ).then(function(done) {
      res.status(200).json({ success: 1, message: config.app.msg_usr_profile_updated});
  })
});

/* User Logout */
router.post('/logout', function(req, res, next) {
  dbModel.User.findOne({
    where: {api_token: req.headers.token},
    attributes: ['id','name','email','password']
  }).then(userData => {
    if(userData){
      updateUserToken(userData.id,'');
      res.status(200).json({ success: 1, message: 'User logged out' });
    } else {
      res.status(200).json({ success: 2, message: config.app.msg_usr_not_found });
    }
  })  
});

// Util Function

function updateUserToken(userid,token){
  dbModel.User.update(
    { api_token: token }, 
    { where: { id : userid }}
    ).then(function(done) {
      // Done
    })
}

module.exports = router;
