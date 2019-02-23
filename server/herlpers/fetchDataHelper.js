const axios = require('axios');
const recordsHelper = require("./recordsHelper");

const timeLapse = 3600000; // 1 hour

module.exports = {
    apiSignup() {
        axios.post('https://opendata.hopefully.works/api/signup',
            this.newUser
            , {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log('singup sucess!');
                this.newUser.accessToken = res.data.accessToken;
                this.saveUser();
            }).catch(err => console.log('err', err));
    },
    apiCall(accessToken) {
        var othis = this;
        axios.get('https://opendata.hopefully.works/api/events', { headers: { "Authorization": `Bearer ${accessToken}` } })
            .then(res => {
                recordsHelper.checkDuplicacy(res.data);
            })
            .catch(err => console.log('err', err));
        setTimeout(function () { 
            othis.apiCall(accessToken);
        }, timeLapse);
    }
}