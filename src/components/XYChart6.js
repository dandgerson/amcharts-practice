import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';

// Using adapters to modify legend item appearance

class XYChart6 extends React.Component {
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

  createSeries({ chart, colors, field, name, stacked = false }) {
    const series = chart.series.push(new am4charts.ColumnSeries());

    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'Team name';

    series.sequencedInterpolation = true;

    series.stacked = stacked;

    series.columns.template.width = am4core.percent(50);
    series.columns.template.tooltipText = '{name}: [bold]{valueY.value}[/]';
    series.columns.template.fill = am4core.color(colors[name]);

    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY}';
    labelBullet.label.fill = am4core.color('#000');
    labelBullet.locationY = 0.5;
    
    series.columns.template.column.adapter.add(
      'cornerRadiusTopLeft',
      this.seriesCornerRadiusAdapter.bind(null, chart), // partial function
    );
    series.columns.template.column.adapter.add(
      'cornerRadiusTopRight',
      this.seriesCornerRadiusAdapter.bind(null, chart), // partial function
      );
    
    return series;
  }

  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    // am4core.useTheme(am4themes_dataviz);

    const colors = {
      'Done': '#FFBF00',
      'In progress': '#A5A5A5',
      'Open': '#ED7D31',
    };

    const chart = am4core.create('chartdiv6', am4charts.XYChart);
    chart.data = this.props.data;

    chart.maskBullets = false;
    chart.numberFormatter.numberFormat = '#.#';


    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'Team name';
    categoryAxis.renderer.grid.template.location = 0;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
 
    valueAxis.renderer.minWidth = 35;
 
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    valueAxis.calculateTotals = true;

  

  

    // Create series

    this.createSeries({
      chart,
      colors,
      field: 'Done',
      name: 'Done',
      stacked: true,
    });
    this.createSeries({
      chart,
      colors,
      field: 'In progress',
      name: 'In progress',
      stacked: true,
    });
    this.createSeries({
      chart,
      colors,
      field: 'Open',
      name: 'Open',
      stacked: true,
    });

    // TODO show total
    const totalSeries = chart.series.push(new am4charts.ColumnSeries());
    totalSeries.dataFields.valueY = 'none';
    totalSeries.dataFields.categoryX = 'Team name';
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

    chart.cursor = new am4charts.XYCursor();

    chart.legend = new am4charts.Legend();

    this.chart = chart;
  }

  componentWillUnmount() {
    this.chart && this.chart.dispose();
  }
  
  render() {
    return (
      <div className= 'chart-container'>
        <div id= 'chartdiv6' className="chart"></div>
      </div>
    );
  }
}

export default XYChart6;
