import React, { Component } from "react";
import "./App.css";
import axios from 'axios';
import SensorTable from "./components/sensorTable";
import PickDate from "./components/pickDate";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      chartData: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedDate) {
    console.log('selectedDate', selectedDate);
    this.setState({
      selectedDate: selectedDate
    });
    axios.get('/records', {
      params: {
        date: selectedDate
      }
    })
      .then(res => {
        console.log('chart res', res)
        let records = ['date', 'sensor1', 'sensor2', 'sensor3', 'sensor4'], dailyRecs = []
        dailyRecs.push(records)
        res.data.map(rec => {
          let hourlyRecs = []
          for (let key of records) 
            hourlyRecs.push((key === 'date')  ? '' + new Date(rec[key]).getHours() : rec[key])
          dailyRecs.push(hourlyRecs)
        })
        this.setState({chartData: dailyRecs})
      })
  }

  render() {
    return (
      <div className="App">
        <PickDate
          date={this.state.selectedDate}
          handleChange={newDate => this.handleChange(newDate)}
        />
        <SensorTable 
          data={this.state.chartData}
        />
      </div>
    );
  }
}

export default App;
// Have to make sure data is populated in order according to the 'records' array's keys