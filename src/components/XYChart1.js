import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';

class XYChart1 extends React.Component {

  formatData(data) {
    return  data.flat();
  }

  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_kelly);

    const options = {
      colors: {
        done: '#FFBF00',
        inProgress: '#A5A5A5',
        open: '#ED7D31',
      },
      stacked: true,
    };

    options.stacked = false;

    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = this.formatData(this.props.data);

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'Team name';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.name = 'Done';
    series1.dataFields.categoryX = 'Team name';
    series1.dataFields.valueY = 'Issue ID';
    series1.columns.template.tooltipText = '{name}: [bold]{valueY}[/]';
    series1.columns.template.fill = am4core.color(options.colors.done);
    series1.stacked = options.stacked;
    
    const series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.name = 'In progress';
    series2.dataFields.categoryX = 'Team name';
    series2.dataFields.valueY = 'Issue ID';
    series2.columns.template.tooltipText = '{name}: [bold]{valueY}[/]';
    series2.columns.template.fill = am4core.color(options.colors.inProgress);
    series2.stacked = options.stacked;
    
    const series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.name = 'Open';
    series3.dataFields.categoryX = 'Team name';
    series3.dataFields.valueY = 'Issue ID';
    series3.columns.template.tooltipText = '{name}: [bold]{valueY}[/]';
    series3.columns.template.fill = am4core.color(options.colors.open);
    series3.stacked = options.stacked;

    chart.cursor = new am4charts.XYCursor();
    chart.legend = new am4charts.Legend();

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
