const express = require("express");
const router = express.Router();
const Record = require("../../models/Record");

router.get("/", (req, res) => {
  var queryDate = new Date(req.query.date); 
  var upperCutoff = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate() + 1);
  var lowerCutoff = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate());
  Record.find({
    date :{
      $lt: upperCutoff, 
      $gte : lowerCutoff
    }
  })
    .select('date sensor1 sensor2 sensor3 sensor4 -_id')
    .then(records => res.json(records)
  );
});

module.exports = router;
