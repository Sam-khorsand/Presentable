const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  sensor1: {
    type: Number,
    required: true
  },
  sensor2: {
    type: Number,
    required: true
  }, 
  sensor3: {
    type: Number,
    required: true
  }, 
  sensor4: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("record", RecordSchema);
