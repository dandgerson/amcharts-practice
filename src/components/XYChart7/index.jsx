import React, { Component } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

import shortid from 'shortid';

import './style.css'

// Creating Timeline Charts
// https://www.amcharts.com/docs/v4/tutorials/creating-timeline-charts/
class Chart extends Component {
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-unused-expressions
    this.chart && this.chart.dispose();
  }

  handleClick(event) {
    console.log('react handleClick');
  }

  renderChart() {
    am4core.useTheme(am4themesAnimated);

    const { data } = this.props;

    const chart = am4core.create(this.chartId, am4charts.XYChart);
    chart.data = data;

    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = 'x';
    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.labels.template.disabled = true;
    xAxis.tooltip.disabled = true;

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    yAxis.max = 2;
    yAxis.strictMinMax = true;
    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.labels.template.disabled = true;
    yAxis.renderer.baseGrid.disabled = true;
    yAxis.tooltip.disabled = true;

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = 'x';
    series.dataFields.valueY = 'y';

    this.chart = chart;
  }

  render() {
    this.chartId = shortid.generate();
    return (
      <div
        id={this.chartId}
        className="Chart"
      />
    )
  }
}

export default Chart;
