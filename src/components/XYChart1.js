import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';

class XYChart1 extends React.Component {
  createSeries({ chart, field, name, colors, stacked }) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'Team name';
    series.sequencedInterpolation = true;
    series.columns.template.fill = am4core.color(colors[name]);
    series.stacked = stacked;

    series.columns.template.width = am4core.percent(40);
    series.columns.template.tooltipText = '[bold]{name}[/]\n[font-size: 14px]{categoryX}: {valueY}';
    
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY}';
    labelBullet.locationY = 0.5;
    
    return series;
  }
  
  formatData(data) {
    return  data.flat();
  }

  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_kelly);

    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.data = this.formatData(this.props.data);

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'Team name';
    categoryAxis.renderer.grid.template.location = 0;
    
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;


    // Create series
    const colors = {
      'Done': '#FFBF00',
      'In progress': '#A5A5A5',
      'Open': '#ED7D31',
    };

    this.createSeries({
      chart,
      name: 'Done',
      field: 'Issue ID',
      colors,
      // stacked: true,
    });
    this.createSeries({
      chart,
      name: 'In progress',
      field: 'Issue ID',
      colors,
      // stacked: true,
    });
    this.createSeries({
      chart,
      name: 'Open',
      field: 'Issue ID',
      colors,
      // stacked: true,
    });

    // chart.cursor = new am4charts.XYCursor();
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
