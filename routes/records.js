const express = require("express");
const router = express.Router();
const Record = require("../models/Record");

router.get("/", (req, res) => {
  console.log("req.query.foo", req.query.date);
  var queryDate = new Date(req.query.date);
  var upperCutoff = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate() + 1);
  var lowerCutoff = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate());
  console.log("lowerCutoff", lowerCutoff)
  console.log("upper", upperCutoff)
  Record.find({
    date :{
      $lt: upperCutoff, 
      $gte : lowerCutoff
    }
  }).then(records => res.json(records));
});

module.exports = router;
