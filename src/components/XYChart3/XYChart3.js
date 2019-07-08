import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';

class XYChart3 extends React.Component {
  createSeries({ chart, field, name, stacked = false }) {
    const series = chart.series.push(new am4charts.ColumnSeries());

    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'year';

    series.stacked = stacked;

    series.columns.template.tooltipText = '[bold]{name}[/]\n[font-size: 14px]{categoryX}: {valueY}';
    series.columns.template.width = am4core.percent(95);
    
    return series;
  }
  
  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    // am4core.useTheme(am4themes_dataviz);

    const chart = am4core.create('chartdiv3', am4charts.XYChart);
    chart.data = this.props.data;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.title.text = 'Local country offices';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = 'Expenditure (M)';

    // Create series

    this.createSeries({
      chart,
      field: 'europe',
      name: 'Europe',
    });
    this.createSeries({
      chart,
      field: 'namerica',
      name: 'North America',
      stacked: true,
    });
    this.createSeries({
      chart,
      field: 'asia',
      name: 'Asia-Pacific',
    });
    this.createSeries({
      chart,
      field: 'lamerica',
      name: 'Latin America',
      stacked: true,
    });
    this.createSeries({
      chart,
      field: 'meast',
      name: 'Middle-East',
      stacked: true,
    });
    this.createSeries({
      chart,
      field: 'africa',
      name: 'Africa',
      stacked: true,
    });

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
        <div id= 'chartdiv3' className="chart"></div>
      </div>
    );
  }
}

export default XYChart3;
