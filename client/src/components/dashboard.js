import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRecords, changeDate } from '../actions/recordActions'
import SensorsChart from "./sensorsDataChart";
import PickDate from "./pickDate";

class Dashboard extends Component {

    componentDidMount() {
        this.handleChange(new Date());
    }

    handleChange = (selectedDate) => {
        this.props.changeDate(selectedDate)
        this.props.getRecords(selectedDate)
    }

  render() {
    let display = (this.props.dataAvailable) ? 
        <SensorsChart data={this.props.chartData} /> : 
        <div className="no-data"><h5>No data available!</h5></div>    

    return (
      <div>
        <div className="date-picker">
            <h5>Please select a date to monitor hourly collections:</h5>
            <PickDate
                date={this.props.selectedDate}
                handleChange={newDate => this.handleChange(newDate)}
            />
        </div>
            {display}
      </div>
    )
  }
}

Dashboard.propTypes = {
    changeDate: PropTypes.func.isRequired,
    getRecords: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    dataAvailable: PropTypes.bool.isRequired,
    chartData: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    selectedDate: state.records.selectedDate,
    dataAvailable: state.records.dataAvailable,
    chartData: state.records.chartData
});

export default connect(mapStateToProps, { changeDate, getRecords })(Dashboard);