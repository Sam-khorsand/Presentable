const axios = require('axios');
const recordsHelper = require("./recordHelper");
const timeLapse = 60*60*1000; // 1 hour

module.exports = Object.assign(Object.create(recordsHelper), {
    apiSignup(newUser) {
        return new Promise(function(resolve, reject) {
            axios.post('https://opendata.hopefully.works/api/signup',
                newUser
                , {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(function(res) {
                    resolve({
                            ...newUser,
                            accessToken: res.data.accessToken
                        });    
                    
                })
                .catch(err => reject(err));
        })
            
    },
    apiCall(accessToken) {
        return new Promise(function (resolve, reject) {
            axios.get('https://opendata.hopefully.works/api/events', { headers: { "Authorization": `Bearer ${accessToken}` } })
            .then(res => resolve(res.data))
            .catch(err => reject('err', err));
        });
    },
    waitFetchInterval() {
        return new Promise(function(resolve) {
            setInterval(() => {
                resolve();
            }, timeLapse);
        })
    }
})