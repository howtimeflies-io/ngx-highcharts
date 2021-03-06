import { Component } from '@angular/core'
import { Chart, Options } from 'highcharts'

// demo chart copied from https://www.highcharts.com/demo/area-missing
@Component({
  selector: 'app-column-range-chart',
  template: `
    <div class="chart-container">
      <ngx-highchart [options]="options" [modules]="['highcharts-more']" (load)="chart = $event.chart"></ngx-highchart>
    </div>
  `
})
export class ColumnRangeChartComponent {

  public chart: Chart

  public options: Options = {
    chart: {
      type: 'columnrange',
      inverted: true
    },

    title: {
      text: 'Temperature variation by month'
    },

    subtitle: {
      text: 'Observed in Vik i Sogn, Norway'
    },

    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    yAxis: {
      title: {
        text: 'Temperature ( °C )'
      }
    },

    tooltip: {
      valueSuffix: '°C'
    },

    plotOptions: {
      columnrange: {
        dataLabels: {
          enabled: true,
          format: '{y}°C'
        }
      }
    },

    legend: {
      enabled: false
    },

    series: [{
      type: 'columnrange',
      name: 'Temperatures',
      data: [
        [-9.7, 9.4],
        [-8.7, 6.5],
        [-3.5, 9.4],
        [-1.4, 19.9],
        [0.0, 22.6],
        [2.9, 29.5],
        [9.2, 30.7],
        [7.3, 26.5],
        [4.4, 18.0],
        [-3.1, 11.4],
        [-5.2, 10.4],
        [-13.5, 9.8]
      ]
    }]
  }
}
