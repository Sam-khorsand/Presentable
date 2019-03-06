const express = require('express');
const router = express.Router();

const usersGen = require("../../generators/userGenerator");
const runGen = require("../../generators/runGenerator");
const serverResponse = require("../../herlpers/serverResponseHelper");

router.post('/register', (req, res) => {
    serverResponse.init(res);
    runGen(usersGen.registerReq, req.body);
});

router.post('/login', (req, res) => {
    serverResponse.init(res);
    runGen(usersGen.loginReq, req.body);
});

module.exports = router;