import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';

class XYChart4 extends React.Component {
  cornerRadius(chart, raduis, item) {
    const dataItem = item.dataItem;
  
    let lastSeries;
    chart.series.each(series => {
      if (dataItem.dataContext[series.dataFields.valueY]
        && !series.isHidden
        && !series.isHiding) {
        lastSeries = series;
      }
    });
    return dataItem.component === lastSeries ? 10 : raduis;
  }

  createSeries({ chart, field, name, stacked = false }) {
    const series = chart.series.push(new am4charts.ColumnSeries());

    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'country';

    series.stacked = stacked;

    series.columns.template.tooltipText = '{name}: [bold]{valueY}[/]';
    
    series.columns.template.column.adapter.add(
      'cornerRadiusTopLeft',
      this.cornerRadius.bind(null, chart), // partial function
    );
    series.columns.template.column.adapter.add(
      'cornerRadiusTopRight',
      this.cornerRadius.bind(null, chart), // partial function
      );
    
    return series;
  }

  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_dataviz);

    const chart = am4core.create('chartdiv4', am4charts.XYChart);
    chart.data = this.props.data;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'country';
    categoryAxis.title.text = 'Local country offices';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Expenditure (M)';

    // Create series

    this.createSeries({
      chart,
      field: 'research',
      name: 'Research',
      stacked: true,
    });
    this.createSeries({
      chart,
      field: 'marketing',
      name: 'Marketing',
      stacked: true,
    });
    this.createSeries({
      chart,
      field: 'sales',
      name: 'Sales',
      stacked: true,
    });

    chart.cursor = new am4charts.XYCursor();
    // chart.legend = new am4charts.Legend();

    this.chart = chart;
  }

  componentWillMount() {
    this.chart && this.chart.dispose();
  }
  
  render() {
    return (
      <div className= 'chart-container'>
        <div id= 'chartdiv4' className="chart"></div>
      </div>
    );
  }
}

export default XYChart4;
