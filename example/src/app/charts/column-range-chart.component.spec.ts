import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {HighchartsTestingModule} from '@howtimeflies/ngx-highcharts/testing'

import {ColumnRangeChartComponent} from './column-range-chart.component'

describe(`Column Range Chart Component`, () => {
  let comp: ColumnRangeChartComponent
  let fixture: ComponentFixture<ColumnRangeChartComponent>

  // add the required module
  const highcharts = require('highcharts/highcharts.src')
  require('highcharts/highcharts-more.src')(highcharts)
  window['Highcharts'] = highcharts

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ColumnRangeChartComponent],
      imports: [HighchartsTestingModule]
    }).createComponent(ColumnRangeChartComponent)

    fixture.detectChanges()
    comp = fixture.componentInstance
  }))

  it(`should display the data on chart`, () => {
    const data = comp.chart.series[0].data.map((it: Highcharts.DataPoint) => [it.x, it.low, it.high])

    expect(data).toContainEqual([0,   -9.7,  9.4])
    expect(data).toContainEqual([1,   -8.7,  6.5])
    expect(data).toContainEqual([2,   -3.5,  9.4])
    expect(data).toContainEqual([3,   -1.4, 19.9])
    expect(data).toContainEqual([4,    0.0, 22.6])
    expect(data).toContainEqual([5,    2.9, 29.5])
    expect(data).toContainEqual([6,    9.2, 30.7])
    expect(data).toContainEqual([7,    7.3, 26.5])
    expect(data).toContainEqual([8,    4.4, 18.0])
    expect(data).toContainEqual([9,   -3.1, 11.4])
    expect(data).toContainEqual([10,  -5.2, 10.4])
    expect(data).toContainEqual([11, -13.5,  9.8])
  })
})
