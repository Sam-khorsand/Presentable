const helpers = require('./helper');
const timeLapse = 3600000;

if(!helpers.token)
    helpers.login(requestLoop);
else
    requestLoop();

function requestLoop() {
    helpers.apiCall();
    setTimeout(requestLoop, timeLapse);
}

