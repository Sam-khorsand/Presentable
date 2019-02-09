const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  date: Date,
  sensor1: Number,
  sensor2: Number,
  sensor3: Number,
  sensor4: Number
});

module.exports = mongoose.model("record", RecordSchema);
