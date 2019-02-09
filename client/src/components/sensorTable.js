import React, { Component } from 'react';
import { Chart } from "react-google-charts";

function sensorTable(props) {
    return (
      <Chart 
        width='100%'
        height= '500px'
        chartType ='ComboChart'
        data = {props.data}
        options = {{
          title : 'Collected sensor data',
          vAxis: {title: 'Measurements'},
          hAxis: {title: 'Hours'},
          seriesType: 'bars'
        }}
      />
    )
};

export default sensorTable;