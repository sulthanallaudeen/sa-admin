var express = require('express');
var router = express.Router();
var dbModel = require("../models/index");
const bcrypt = require('bcrypt');
var util = require("./util");

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
          res.status(200).json({ success: 0, message: 'Wrong Password' });
        }
      });
    } else {
      res.status(200).json({ success: 2, message: 'User not found' });
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
