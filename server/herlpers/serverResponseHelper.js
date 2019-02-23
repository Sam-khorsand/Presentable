module.exports = {
    init(resp) {
        this.res = resp;
    },
    res200(data) {
        this.res.status(200).json(data);
    },
    res400(errors) {
        console.log('errors', errors);
        this.res.status(400).json(errors);
    }
};