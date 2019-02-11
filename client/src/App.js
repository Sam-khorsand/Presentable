import React, { Component } from "react";
import "./App.css";
import SensorsChart from "./components/sensorsDataChart";
import PickDate from "./components/pickDate";
import helper from "./helper"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      chartData: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleChange(new Date());
  }

  handleChange(selectedDate) {
    this.setState({
      selectedDate: selectedDate
    });
    helper.queryRec(selectedDate, 
      (retData) => this.setState({chartData: retData})
    )
  }

  render() {
    let chart
    chart = (helper.dataAvailable) ? <SensorsChart data={this.state.chartData}/> : chart = <div className="no-data">No data available!</div>    
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to Sensor Data Monitoring Service!</h1>
        </div>
        <div className="date-picker">
          <h5>Please select a date to monitor hourly collections:</h5>
          <PickDate
            date={this.state.selectedDate}
            handleChange={newDate => this.handleChange(newDate)}
          />
        </div>
        {chart}
      </div>
    );
  }
}

export default App;