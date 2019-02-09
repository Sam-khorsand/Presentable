import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const pickDate = props => (
  <DatePicker selected={props.date} onChange={props.handleChange} />
);

export default pickDate;