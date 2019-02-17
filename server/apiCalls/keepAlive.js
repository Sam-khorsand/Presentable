const axios = require('axios');
// To avoid heroku ap from sleeping
setInterval(function () {
    axios.get('https://fast-brook-52751.herokuapp.com/');
}, 30000);