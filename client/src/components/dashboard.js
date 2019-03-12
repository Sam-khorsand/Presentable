import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRecords, datePickerChange, sliderChange, stopRecords } from '../actions/recordActions'
import SensorsChart from "./sensorsDataChart";
import PickDate from "./pickDate";
import Slider from './Slider';

class Dashboard extends Component {

    componentDidMount() {
        this.datePickerHandler(this.props.selectedDate);
        this.props.history.listen(() => {
            this.props.stopRecords();
        });
    }

    datePickerHandler = (datePickerDate) => {
        this.props.datePickerChange(datePickerDate)
        this.props.getRecords(datePickerDate)
    }

    sliderHandler = (type) => {
        return (value) => {
            this.selectedDate[type] = value;
            var sliderDate = new Date(this.selectedDate['Year'], this.selectedDate['Month'] - 1, this.selectedDate['Day']);
            this.props.sliderChange(sliderDate);
        }
    }

    render() {
        let display = (this.props.dataAvailable) ? 
            <SensorsChart data={this.props.chartData} /> : 
            <div className="no-data"><h5>No data available!</h5></div>    
        this.selectedDate = {
            ['Day']: this.props.selectedDate.getDate(),
            ['Month']: this.props.selectedDate.getMonth() + 1,
            ['Year']: this.props.selectedDate.getFullYear(),
        };
        return (
            <div className="dashboard-wrapper">
                <h2>Please select a date to monitor hourly collections either through sliders or date-picker :</h2>
                <div className="date-selection">
                    <div className="slider">
                        {Object.keys(this.selectedDate).map(select =>
                            <div key={select}>
                                <Slider valueUpdate={this.sliderHandler(select)} selection={select} value={this.selectedDate[select]} />
                            </div>
                        )}
                    </div>
                    <div className="date-picker">
                        <PickDate
                            date={this.props.selectedDate}
                                handleChange={newDate => this.datePickerHandler(newDate)}
                        />
                    </div>

                </div>
                {display}
            </div>
        )
    }
}

Dashboard.propTypes = {
    getRecords: PropTypes.func.isRequired,
    datePickerChange: PropTypes.func.isRequired,
    sliderChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    dataAvailable: PropTypes.bool.isRequired,
    chartData: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    selectedDate: state.records.selectedDate,
    dataAvailable: state.records.dataAvailable,
    chartData: state.records.chartData
});

export default connect(mapStateToProps, { datePickerChange, sliderChange, getRecords, stopRecords })(Dashboard);