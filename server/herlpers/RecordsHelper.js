const Record = require("../models/Record");

module.exports = { 
    saveRecord (data) {
        const newRec = new Record({
            date: data.date,
            sensor1: data.sensor1,
            sensor2: data.sensor2,
            sensor3: data.sensor3,
            sensor4: data.sensor4
        });
        newRec.save();
    },
    //Check if the record for the hour is already saved
    checkDuplicacy (data) {
        Record
            .find()
            .limit(1)
            .sort({ $natural: -1 })
            .then(res => {
                if (new Date(res[0].date).getHours() !== new Date(data.date).getHours()) {
                    this.saveRecord(data);
                }
            });
    }
}