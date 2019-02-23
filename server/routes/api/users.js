const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const usersHelper = require("../../herlpers/usersHelper");
const serverResponse = require("../../herlpers/serverResponseHelper");
const User = require('../../models/User');

router.post('/register', (req, res) => {
    serverResponse.init(res);
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return serverResponse.res400(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return serverResponse.res400(errors);
        } else {
            usersHelper.createNewUSer(req.body);
        }
    });
});

router.post('/login', (req, res) => {
    serverResponse.init(res);
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return serverResponse.res400(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = 'User not found';
            return serverResponse.res400(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, name: user.name };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
                usersHelper.apiCall(user.accessToken)
                
            } else {
                errors.password = 'Password incorrect';
                return serverResponse.res400(errors);
            }
        });
    });
});

module.exports = router;