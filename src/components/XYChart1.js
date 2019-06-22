import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

class XYChart1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = this.props.data;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'Team name';
    categoryAxis.title.text = 'Teams';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Task Quantity";

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "Issue ID";
    series.dataFields.categoryX = "Team name";
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
