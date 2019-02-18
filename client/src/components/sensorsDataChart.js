import React from 'react';
import { Chart } from "react-google-charts";

const sensorsDataChart = props => {
    return (
      <Chart 
        width='100%'
        height= '500px'
        chartType ='ComboChart'
        data = {props.data}
        options = {{
          title : 'Collected Data',
          vAxis: {title: 'Measurements'},
          hAxis: {title: 'Hours'},
          seriesType: 'bars'
        }}
      />
    )
};

export default sensorsDataChart;