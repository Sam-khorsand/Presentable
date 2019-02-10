const axios = require('axios');
const Record = require("../models/Record");

var saveRecord = function(data){
  const newRec = new Record({
    date: data.date,
    sensor1: data.sensor1,
    sensor2: data.sensor2,
    sensor3: data.sensor3,
    sensor4: data.sensor4
  });
  newRec.save();
}

let loginCred = {
  password: "1q2w3e4r",
  email: "questtosignup@gmail.com"
}

module.exports = {
  token: null,
  signup: function(cb) {
    axios.post('https://opendata.hopefully.works/api/signup', loginCred, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log('singup sucess!');
      this.token = res.data.accessToken;
      cb();
    }).catch(error => {
      console.log('signup error ' + error);
    });
  },
  login: function(cb) {
    var othis = this
    axios.post('https://opendata.hopefully.works/api/login', loginCred, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log('login sucess!');
      this.token = res.data.accessToken;
      cb();
    }).catch(error => {
      console.log('login error ' + error);
      othis.signup(cb);
    });
  },
  apiCall: function() {
    axios.get('https://opendata.hopefully.works/api/events', { headers: { "Authorization": `Bearer ${this.token}` } })
        .then(res => {
          saveRecord(res.data);
    });
  },
}