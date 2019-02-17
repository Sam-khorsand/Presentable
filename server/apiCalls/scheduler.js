const helpers = require('./helper');
const timeLapse = 10000; //1 hour

if(!helpers.token) {
    console.log("Token not avaiable");
    helpers.login(requestLoop);
}
else {
    console.log("Token avaiable");
    requestLoop();
}
function requestLoop() {
    setInterval(function () { 
        helpers.apiCall(); 
    }, timeLapse);
}

