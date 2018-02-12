import { Component } from '@angular/core'

// demo chart copied from https://www.highcharts.com/demo/area-missing
@Component({
  selector: 'app-area-chart',
  template: `
    <div class="chart-container">
      <ngx-highchart [options]="options" (load)="onLoad($event)"></ngx-highchart>
    </div>
  `
})
export class AreaChartComponent {
  public options: Highcharts.Options = {
    chart: {
      type: 'area',
      spacingBottom: 30
    },
    title: {
      text: 'Fruit consumption *'
    },
    subtitle: {
      text: '* Jane\'s banana consumption is unknown',
      floating: true,
      align: 'right',
      verticalAlign: 'bottom',
      y: 15
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 150,
      y: 100,
      floating: true,
      borderWidth: 1,
    },
    xAxis: {
      categories: ['Apples', 'Pears', 'Oranges', 'Bananas', 'Grapes', 'Plums', 'Strawberries', 'Raspberries']
    },
    yAxis: {
      title: {
        text: 'Y-Axis'
      },
      labels: {
        formatter: function () {
          return this.value;
        }
      }
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          this.x + ': ' + this.y;
      }
    },
    plotOptions: {
      area: {
        fillOpacity: 0.5
      }
    },
    credits: {
      enabled: false
    },
    series: []
  }

  chart: Highcharts.ChartObject

  onLoad(evt: {chart: Highcharts.ChartObject, highcharts: Highcharts.Static}) {
    this.chart = evt.chart
    this.chart.addSeries({
      name: 'John',
      data: [0, 1, 4, 4, 5, 2, 3, 7]
    })
    this.chart.addSeries({
      name: 'Jane',
      data: [1, 0, 3, null, 3, 1, 2, 1]
    })
  }
}
