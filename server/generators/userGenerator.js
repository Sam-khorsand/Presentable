const userHelper = require("../herlpers/userHelper");
const serverResponse = require("../herlpers/serverResponseHelper");

module.exports = { 
    
    registerReq: function* (userData) {

        try {
            yield userHelper.checkRegisterValidity(userData);
        }
        catch (err) {
            return serverResponse.res400(err);
        }
        try {
            yield userHelper.checkUserRegister(userData);
        }
        catch (err) {
            return serverResponse.res400(err);
        }

        var newUser;
        newUser = yield userHelper.createNewUSer(userData);
        
        try {
            newUser.password = yield userHelper.hashPassword(userData);
        }
        catch (err) {
            console.error(err);
        }
        try {
            newUser.accessToken = yield userHelper.apiSignup(newUser);
        }
        catch (err) {
            return serverResponse.res400(err);
        }
        try {
            var newUser = yield userHelper.saveUser(newUser);
            return serverResponse.res200(newUser);
        }
        catch (err) {
            return serverResponse.res400(err);
        }
    },

    loginReq: function* (userData) {

        try {
            yield userHelper.checkLoginValidity(userData);
        }
        catch (err) {
            return serverResponse.res400(err);
        }
        var user;
        try {
            user = yield userHelper.checkUserLogin(userData);
        }
        catch (err) {
            return serverResponse.res400(err);
        }
        try {
            yield userHelper.compareLoginPassword(user, userData);
        }
        catch (err) {
            return serverResponse.res400(err);
        }
        try {
            var token = yield userHelper.signLoginWebToken(user);
            serverResponse.res200(token);
        }
        catch (err) {
            return serverResponse.res400(err);
        }

        while (true) {
            var record;
            try {
                record = yield userHelper.apiCall(user.accessToken);
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