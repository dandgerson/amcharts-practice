import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

class XYChart1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.chart = am4core.create("chartdiv", am4charts.XYChart);
    this.chart.data = this.props.data;
  }
  
  render() {
    return (
      <div className="chart-container">
        <div id="chartdiv"></div>
      </div>
    );
  }
}

export default XYChart1;
