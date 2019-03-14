const userHelper = require("../herlpers/userHelper");
const serverResponse = require("../herlpers/serverResponseHelper");

module.exports = { 
    
    registerReq: function* (userData) {
        var registerationPipe = [
            userHelper.checkRegisterValidity,
            userHelper.checkUserRegister,
            userHelper.createNewUser,
            userHelper.apiSignup,
            userHelper.saveUser
        ];
        var result = userData;
        for (let i = 0; i < registerationPipe.length; i++) {
            try {
                result = (yield registerationPipe[i](result)) || result;
            }
            catch (err) {
                return serverResponse.res400(err);
            }
        }
        return serverResponse.res200(result);
    },

    loginReq: function* (userData) {
        var loginPipe = [
            userHelper.checkLoginValidity,
            userHelper.checkUserCreds,
            userHelper.signLoginWebToken
        ];
        var result = userData;
        for (let i = 0; i < loginPipe.length; i++) {
            try {
                result = (yield loginPipe[i](result)) || result;
            }
            catch (err) {
                return serverResponse.res400(err);
            }
        }
        // run the data queries every hour
        while (true) {
            var record;
            try {
                record = yield userHelper.apiCall(result);
                yield userHelper.checkDuplicacy(record);
                yield userHelper.saveRecord(record);
            }
            catch (err) {
                console.error(err);
            }
            yield userHelper.waitFetchInterval();
        }
    }
};