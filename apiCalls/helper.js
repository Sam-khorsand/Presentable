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
    console.log("cb", cb);
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
    console.log("accessToken", this.token);
    axios.get('https://opendata.hopefully.works/api/events', { headers: { "Authorization": `Bearer ${this.token}` } })
        .then(res => {
          console.log("res", res.data);
          saveRecord(res.data);
    });
  },
}


    /*axios.post('https://opendata.hopefully.works/api/signup', login_cred, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res =>
      console.log("res", res)
    )

    axios.post('https://opendata.hopefully.works/api/login', login_cred, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log("res", res)
      axios.get('https://opendata.hopefully.works/api/events', { headers: { "Authorization": `Bearer ${res.data.accessToken}` } })
        .then(res => {
          console.log("res", res)
          console.log("res type", typeof (res.data.sensor1))
          axios.post('/records', res.data, {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(res => {
            console.log("server res", res)
            othis.setState({
              date: res.data.date,
              sesonr1: res.data.sensor1,
              sensor2: res.data.sensor2,
              sensor3: res.data.sensor3,
              sensor4: res.data.sensor4,
            })
          })
        })
    })
  }*/