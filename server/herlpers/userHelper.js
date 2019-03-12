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
    },
    hashPassword(reqBody) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(reqBody.password, salt, (err, hash) => {
                    if (err) reject(err);
                    resolve(hash);
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
                } else
                    resolve(reqBody);
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
                }
                resolve(user);
            });
        });
    },
    compareLoginPassword(user, reqBody) {
        return new Promise(function (resolve, reject) {
            const password = reqBody.password;
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch)
                    resolve(user.accessToken);
                else {
                    errors.password = 'Password incorrect';
                    reject(errors);
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
        return new Promise(function (resolve, reject) {
            const { errors, isValid } = validateRegisterInput(reqBody);
            if (!isValid) {
                reject(errors);
            }
            resolve();
        });
    },
    checkLoginValidity(reqBody) {
        return new Promise(function (resolve, reject) {
            const { errors, isValid } = validateLoginInput(reqBody);
            if (!isValid) {
                reject(errors);
            }
            resolve();
        });
    }
});