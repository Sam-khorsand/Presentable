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
    chart = (helper.dataAvailable) ? <SensorsChart data={this.state.chartData}/> : chart = <div>No data available!</div>    
    return (
      <div className="App">
        <PickDate
          date={this.state.selectedDate}
          handleChange={newDate => this.handleChange(newDate)}
        />
        {chart}
      </div>
    );
  }
}

export default App;