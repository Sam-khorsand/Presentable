const bcrypt = require('bcryptjs');
const fetchDataHelper = require("./fetchDataHelper");
const serverResponse = require("./serverResponseHelper");

module.exports = Object.assign(Object.create(fetchDataHelper), {
    saveUser() {
        new User(this.newUser)
        .save()
        .then(user => serverResponse.res200(user))
        .catch(err => serverResponse.res400(err));
    },
    createNewUSer(data) {
        this.newUser = {
            name: data.name,
            email: data.email
        };
        this.hashPassword(data);
    },
    hashPassword(data) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, (err, hash) => {
                if (err) throw err;
                this.newUser.password = hash;
                this.getUserApiCallToken();
            });
        });
    },
    getUserApiCallToken() {
        this.apiSignup();
    }
});