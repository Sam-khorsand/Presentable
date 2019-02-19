const axios = require('axios');
const Record = require("../models/Record");

const timeLapse = 3600000; // 1 hour

var saveRecord = function (data) {
  const newRec = new Record({
    date: data.date,
    sensor1: data.sensor1,
    sensor2: data.sensor2,
    sensor3: data.sensor3,
    sensor4: data.sensor4
  });
  newRec.save();
}

//Check if the record for the hour is already saved
var checkDuplicacy = function (data) {
  Record
    .find()
    .limit(1)
    .sort({ $natural: -1 })
    .then(res => {
      if (new Date(res[0].date).getHours() !== new Date(data.date).getHours())
        saveRecord(data)
    });
}

module.exports = {
  signup: function (newUser, cb) {
    axios.post('https://opendata.hopefully.works/api/signup', 
      {
        email: newUser.email,
        password: newUser.password
      }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log('singup sucess!');
      this.apiCall(res.data.accessToken);
      cb(res.data.accessToken);
    }).catch(error => {
      console.log('signup error ' + error);
    });
  },
  apiCall: function (accessToken) {
      setInterval(function () {
        axios.get('https://opendata.hopefully.works/api/events', { headers: { "Authorization": `Bearer ${accessToken}` } })
          .then(res => {
            checkDuplicacy(res.data);
          });
      }, timeLapse);
    }
}