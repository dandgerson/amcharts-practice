import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';

class XYChart1 extends React.Component {
  createSeries({ chart, field, name, colors }) {
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'Team name';
    series.sequencedInterpolation = true;
    series.columns.template.fill = am4core.color(colors[name]);
    series.stacked = true;

    series.columns.template.width = am4core.percent(40);
    series.columns.template.tooltipText = '[bold]{name}[/]\n[font-size: 14px]{categoryX}: {valueY}';
    
    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY}';
    labelBullet.locationY = 0.06;
    
    return series;
  }
  
  formatData(data) {

    return  data.flat();
  }

  componentDidMount() {
    // am4core.useTheme(am4themes_animated);
    // am4core.useTheme(am4themes_kelly);

    const chart = am4core.create('chartdiv1', am4charts.XYChart);
    chart.maskBullets = false;
    chart.numberFormatter.numberFormat = "#.#";
    chart.data = this.formatData(this.props.data);

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'Team name';
    categoryAxis.renderer.grid.template.location = 0;
    
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    valueAxis.calculateTotals = true;


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
    });
    this.createSeries({
      chart,
      name: 'In progress',
      field: 'Issue ID',
      colors,
    });
    this.createSeries({
      chart,
      name: 'Open',
      field: 'Issue ID',
      colors,
    });

    const totalSeries = chart.series.push(new am4charts.ColumnSeries());
    totalSeries.dataFields.valueY = 'none';
    totalSeries.dataFields.categoryX = 'Team name';
    totalSeries.stacked = true;
    totalSeries.hiddenInLegend = true;
    totalSeries.columns.template.strokeOpacity = 0;

    const totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
    totalBullet.dy = 0;
    totalBullet.label.text = '{valueY.total}';
    totalBullet.label.hideOversized = false;
    totalBullet.label.fontSize = 18;
    totalBullet.label.background.fill = totalSeries.stroke;
    totalBullet.label.background.fillOpacity = 0.2;
    totalBullet.label.padding(5, 10, 5, 10);

    // chart.cursor = new am4charts.XYCursor();
    chart.legend = new am4charts.Legend();

    this.chart = chart;
  }

  componentWillUnmount() {
    this.chart && this.chart.dispose();
  }
  
  render() {
    return (
      <div className= 'chart-container'>
        <div id='chartdiv1' className="chart"></div>
      </div>
    );
  }
}

export default XYChart1;
