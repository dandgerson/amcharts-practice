import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';

// Using adapters to modify legend item appearance

class XYChart5 extends React.Component {
  seriesCornerRadiusAdapter(chart, raduis, item) {
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

  legendCornerRadiusAdapter(radius, target) {
    if (!target.dataItem) {
      return radius;
    }
    const settings = target.dataItem.dataContext.dummyData;
    return settings && settings.radius !== undefined ? settings.radius : radius;
  }

  createSeries({ chart, field, name, stacked = false, dummyData = {radius: 0}}) {
    const series = chart.series.push(new am4charts.ColumnSeries());

    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'category';

    series.stacked = stacked;

    series.columns.template.width = am4core.percent(80);
    series.columns.template.tooltipText = '{name}: [bold]{valueY.value}[/]';
    
    series.columns.template.column.adapter.add(
      'cornerRadiusTopLeft',
      this.seriesCornerRadiusAdapter.bind(null, chart), // partial function
    );
    series.columns.template.column.adapter.add(
      'cornerRadiusTopRight',
      this.seriesCornerRadiusAdapter.bind(null, chart), // partial function
      );
    
    series.dummyData = dummyData;

    return series;
  }

  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    // am4core.useTheme(am4themes_dataviz);

    const chart = am4core.create('chartdiv5', am4charts.XYChart);
    chart.data = this.props.data;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.minWidth = 35;

    chart.cursor = new am4charts.XYCursor();

    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;

    const marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color('#ccc');

    marker.adapter.add('cornerRadiusTopLeft', this.legendCornerRadiusAdapter)
    marker.adapter.add('cornerRadiusTopRight', this.legendCornerRadiusAdapter)
    marker.adapter.add('cornerRadiusBottomLeft', this.legendCornerRadiusAdapter)
    marker.adapter.add('cornerRadiusBottomRight', this.legendCornerRadiusAdapter)

    chart.colors.step = 2;
    // Create series

    this.createSeries({
      chart,
      field: 'value1',
      name: 'Series 1',
      stacked: true,
      dummyData: {
        radius: 10
      },
    });
    this.createSeries({
      chart,
      field: 'value2',
      name: 'Series 2',
      stacked: true,
      dummyData: {
        radius: 6
      },
    });
    this.createSeries({
      chart,
      field: 'value3',
      name: 'Series 3',
      stacked: true,
      dummyData: {
        radius: 2
      },
    });
    this.createSeries({
      chart,
      field: 'value4',
      name: 'Series 4',
      stacked: true,
    });

    this.chart = chart;
  }

  componentWillUnmount() {
    this.chart && this.chart.dispose();
  }
  
  render() {
    return (
      <div className= 'chart-container'>
        <div id= 'chartdiv5' className="chart"></div>
      </div>
    );
  }
}

export default XYChart5;
