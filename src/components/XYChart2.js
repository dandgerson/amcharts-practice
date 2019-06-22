import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';

class XYChart2 extends React.Component {
  createSeries({ chart, field, name, stacked }) {
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'year';
    series.sequencedInterpolation = true;

    series.stacked = stacked;

    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = '[bold]{name}[/]\n[font-size: 14px]{categoryX}: {valueY}';
    
    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY}';
    labelBullet.label.fill = am4core.color('#fff');
    labelBullet.locationY = 0.5;
    
    return series;
  }
  
  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_dataviz);

    const chart = am4core.create('chartdiv2', am4charts.XYChart);
    chart.maskBullets = false;
    chart.numberFormatter.numberFormat = "#.#";
    chart.data = this.props.data;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.location = 0;
    
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    valueAxis.calculateTotals = true;


    // Create series

    const stacked = true;

    this.createSeries({
      chart,
      name: 'Europe',
      field: 'europe',
      stacked,
    });
    this.createSeries({
      chart,
      name: 'North America',
      field: 'namerica',
      stacked,
    });
    this.createSeries({
      chart,
      name: 'Asia-Pacific',
      field: 'asia',
      stacked,
    });
    this.createSeries({
      chart,
      name: 'Latin America',
      field: 'lamerica',
      stacked,
    });
    this.createSeries({
      chart,
      name: 'Middle-East',
      field: 'meast',
      stacked,
    });
    this.createSeries({
      chart,
      name: 'Africa',
      field: 'africa',
      stacked,
    });

    const totalSeries = chart.series.push(new am4charts.ColumnSeries());
    totalSeries.dataFields.valueY = 'none';
    totalSeries.dataFields.categoryX = 'year';
    totalSeries.stacked = true;
    totalSeries.hiddenInLegend = true;
    totalSeries.columns.template.strokeOpacity = 0;

    const totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
    totalBullet.dy = -20;
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

  componentWillMount() {
    this.chart && this.chart.dispose();
  }
  
  render() {
    return (
      <div className= 'chart-container'>
        <div id= 'chartdiv2' className="chart"></div>
      </div>
    );
  }
}

export default XYChart2;
