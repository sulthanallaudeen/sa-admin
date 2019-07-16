var dbModel = require("../models/index");

generateToken = function(){
  return Math.random().toString(36).slice(2)
}

authCheck = function(token, callback){
  dbModel.User.findOne({
    where: {api_token: token},
    attributes: ['id']
  }).then(userData => {
    if(userData){
      callback(true);
    } else {
      callback(false);
    }
  })
}

var util = {};
util.generateToken = generateToken;
util.authCheck = authCheck;
module.exports = util;