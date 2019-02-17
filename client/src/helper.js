const axios = require('axios');

module.exports = {
  queryRec: function (selectedDate, cb) {
    axios.get('/records', {
      params: {
        date: selectedDate
      }
    })
      .then(res => {
        let records = ['date', 'sensor1', 'sensor2', 'sensor3', 'sensor4'], dailyRecs = []
        dailyRecs.push(records)
        res.data.map(rec => {
          let hourlyRecs = []
          for (let key of records)
            hourlyRecs.push((key === 'date') ? '' + new Date(rec[key]).getHours() : rec[key])
          dailyRecs.push(hourlyRecs)
        });
        cb(dailyRecs);
      })
  },
}