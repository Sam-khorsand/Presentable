const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const fetchDataHelper = require("./fetchDataHelper");
const serverResponse = require("./serverResponseHelper");
const User = require('../models/User');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

module.exports = Object.assign(Object.create(fetchDataHelper), {
    saveUser(newUser) {
        return new Promise(function (resolve, reject) {
            new User(newUser)
            .save()
            .then(user => resolve(user))
            .catch(err => reject(err));
        })
    },
    createNewUSer(reqBody) {
        return Promise.resolve({
            name: reqBody.name,
            email: reqBody.email
        });
        //this.hashPassword(reqBody);
    },
    hashPassword(reqBody) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(reqBody.password, salt, (err, hash) => {
                    if (err) reject(err);
                    //this.newUser.password = hash;
                    resolve(hash);
                    //this.getUserApiCallToken();
                });
            });
        });
    },
    checkUserRegister(reqBody) {
        return new Promise(function (resolve, reject) {
            User.findOne({ email: reqBody.email }).then(user => {
                if (user) {
                    errors.email = 'Email already exists';
                    reject(errors);
                    //return serverResponse.res400(errors);
                } else
                    resolve(reqBody);
                    //runGen(usersGen.register(reqBody));
                    //usersHelper.createNewUSer(req.body);
                
            });
        });
    },
    checkUserLogin(reqBody) {
        return new Promise(function (resolve, reject) {
            const email = reqBody.email;
            User.findOne({ email }).then(user => {
                if (!user) {
                    errors.email = 'User not found';
                    reject(errors);
                    //return serverResponse.res400(errors);
                }
                resolve(user);
            });
        });
    },
    compareLoginPassword(user, reqBody) {
        return new Promise(function (resolve, reject) {
            const password = reqBody.password;
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    resolve(user.accessToken);

                    //usersHelper.apiCall(user.accessToken)

                } else {
                    errors.password = 'Password incorrect';
                    reject(errors);
                    //return serverResponse.res400(errors);
                }
            });
        });
    },
    signLoginWebToken(user) {
        return new Promise(function (resolve, reject) {
            const payload = { id: user.id, name: user.name };

            jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                function(err, token) {
                    if (err)
                        reject(err);
                    resolve({
                        success: true,
                        token: 'Bearer ' + token
                    })
                }
            );
        });
    },
    checkRegisterValidity(reqBody) {
        const { errors, isValid } = validateRegisterInput(reqBody);

        if (!isValid) {
            return serverResponse.res400(errors);
        }
    },
    checkLoginValidity(reqBody) {
        const { errors, isValid } = validateLoginInput(reqBody);

        if (!isValid) {
            return serverResponse.res400(errors);
        }
    }
});