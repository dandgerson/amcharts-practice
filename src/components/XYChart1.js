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
    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.name =  'Open';
    series1.dataFields.valueY =  'Issue ID';
    series1.dataFields.categoryX =  'Team name';
    series1.columns.template.tooltipText = '{name}: [bold]{valueY}[/]';
    series1.stacked = true;
    
    const series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.name = 'In progress';
    series2.dataFields.valueY = 'Issue ID';
    series2.dataFields.categoryX = 'Team name';
    series2.columns.template.tooltipText = '{name}: [bold]{valueY}[/]';
    series2.stacked = true;

    const series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.name = 'Done';
    series3.dataFields.valueY = 'Issue ID';
    series3.dataFields.categoryX = 'Team name';
    series3.columns.template.tooltipText = '{name}: [bold]{valueY}[/]';
    series3.stacked = true;

    chart.cursor = new am4charts.XYCursor();
    chart.legeng = new am4charts.Legend();

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
