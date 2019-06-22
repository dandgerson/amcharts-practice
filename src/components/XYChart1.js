import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';

class XYChart1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_kelly);

    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = this.props.data;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'Team name';
    categoryAxis.title.text = 'Team names';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text =  'Task Quantity';
    
    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.name =  'Team names ';
    series.dataFields.valueY =  'Issue ID';
    series.dataFields.categoryX =  'Team name';
    series.tooltipText = '{name}: [bold]{valueY}[/]';
    series.stacked = true;
    
    const series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.name = 'Status';
    series2.dataFields.valueY = 'Issue status';
    series2.dataFields.categoryX = 'Team name';
    series2.tooltipText = '{name}: [bold]{valueY}[/]';
    series2.stacked = true;

    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  }

  componentWillMount() {
    this.chart && this.chart.dispose();
  }
  
  render() {
    return (
      <div className= 'chart-container'>
        <div id= 'chartdiv'></div>
      </div>
    );
  }
}

export default XYChart1;
