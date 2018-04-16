import {Component, OnInit} from '@angular/core'

// demo chart copied from https://www.highcharts.com/demo/pie-drilldown
@Component({
  selector: 'app-drilldown-chart',
  template: `
    <div class="chart-container">
      <ngx-highchart [options]="options" [modules]="['modules/drilldown', 'highcharts-more']"
                     (load)="onLoad($event)"></ngx-highchart>
    </div>
  `
})
export class DrilldownChartComponent implements OnInit {
  public options: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Browser market shares. January, 2015 to May, 2015'
    },
    subtitle: {
      text: 'Click the slices to view versions. Source: netmarketshare.com.'
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: []
    } as Highcharts.PieChartSeriesOptions],
    drilldown: {
      series: []
    }
  }
  public chart: Highcharts.ChartObject
  private data: Array<{name: string, y: number, drilldown?: string}> = []
  private drillDownData: Array<{name: string, data: any[]}> = []

  public ngOnInit(): void {
    this.data = [{
      name: 'IE',
      y: 56.33,
      drilldown: 'IE'
    }, {
      name: 'Chrome',
      y: 24.03,
      drilldown: 'Chrome'
    }, {
      name: 'Firefox',
      y: 10.38,
      drilldown: 'Firefox'
    }, {
      name: 'Safari',
      y: 4.77,
      drilldown: 'Safari'
    }, {
      name: 'Opera',
      y: 0.91,
      drilldown: 'Opera'
    }, {
      name: 'Proprietary or Undetectable',
      y: 0.2
    }]

    this.drillDownData = [{
      name: 'IE',
      data: [
        ['v11.0', 24.13],
        ['v8.0', 17.2],
        ['v9.0', 8.11],
        ['v10.0', 5.33],
        ['v6.0', 1.06],
        ['v7.0', 0.5]
      ]
    }, {
      name: 'Chrome',
      data: [
        ['v40.0', 5],
        ['v41.0', 4.32],
        ['v42.0', 3.68],
        ['v39.0', 2.96],
        ['v36.0', 2.53],
        ['v43.0', 1.45],
        ['v31.0', 1.24],
        ['v35.0', 0.85],
        ['v38.0', 0.6],
        ['v32.0', 0.55],
        ['v37.0', 0.38],
        ['v33.0', 0.19],
        ['v34.0', 0.14],
        ['v30.0', 0.14]
      ]
    }, {
      name: 'Firefox',
      data: [
        ['v35', 2.76],
        ['v36', 2.32],
        ['v37', 2.31],
        ['v34', 1.27],
        ['v38', 1.02],
        ['v31', 0.33],
        ['v33', 0.22],
        ['v32', 0.15]
      ]
    }, {
      name: 'Safari',
      data: [
        ['v8.0', 2.56],
        ['v7.1', 0.77],
        ['v5.1', 0.42],
        ['v5.0', 0.3],
        ['v6.1', 0.29],
        ['v7.0', 0.26],
        ['v6.2', 0.17]
      ]
    }, {
      name: 'Opera',
      data: [
        ['v12.x', 0.34],
        ['v28', 0.24],
        ['v27', 0.17],
        ['v29', 0.16]
      ]
    }]

  }

  public onLoad(evt: {chart: Highcharts.ChartObject, highcharts: Highcharts.Static}) {
    this.chart = evt.chart

    evt.chart.series[0].setData(this.data)
    evt.highcharts.addEvent(evt.chart, 'drilldown', it => this.onDrillDown(it))
  }

  private onDrillDown(evt) {
    const browser = this.drillDownData.find(it => it.name === evt.point.name)
    if (browser) {
      this.chart.addSeriesAsDrilldown(evt.point, browser)
    }
  }
}
