var express = require('express');
var router = express.Router();
var dbModel = require("../models/index");
var query = require("../config/query");


/* GET home page. */
router.get('/', function(req, res, next) {
  dbModel.sequelize.query(query.dashboard.getData
  ).then(([results, metadata]) => {
    res.status(200).json({ success: true, data: results[0] });
  })
});

module.exports = router;