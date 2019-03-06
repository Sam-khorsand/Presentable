const Record = require("../models/Record");

module.exports = { 
    saveRecord (data) {
        return new Promise(function (resolve) {
            var newRecord = new Record({
                date: data.date,
                sensor1: data.sensor1,
                sensor2: data.sensor2,
                sensor3: data.sensor3,
                sensor4: data.sensor4
            });
            resolve(newRecord.save());
        });
    },
    //Check if the record for the hour is already saved
    checkDuplicacy (data) {
        return new Promise(function (resolve, reject) {
            Record
                .find()
                .limit(1)
                .sort({ $natural: -1 })
                .then(res => {
                    var [lastRecord] = res;
                    if (lastRecord === undefined)
                        resolve();
                    else
                        if (new Date(lastRecord.date).getHours() !== new Date(data.date).getHours())
                            resolve();
                    reject("Record already saved!");
                });
        });
    }
}