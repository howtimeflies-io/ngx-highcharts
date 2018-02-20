import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {AreaChartComponent} from './area-chart.component'
import {HighchartsTestingModule} from 'ngx-highcharts-lazy'

describe(`Area Chart Component`, () => {
  let comp: AreaChartComponent
  let fixture: ComponentFixture<AreaChartComponent>

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [AreaChartComponent],
      imports: [HighchartsTestingModule]
    }).createComponent(AreaChartComponent)

    fixture.detectChanges()
    comp = fixture.componentInstance
  }))

  it(`should add data to the chart series`, () => {
    // verify the series name
    expect(comp.chart.series[0].name).toEqual('John')
    expect(comp.chart.series[1].name).toEqual('Jane')

    // verify the series data values
    expect(comp.chart.series[0].data.map(it => it.y)).toEqual([0, 1, 4, 4, 5, 2, 3, 7])
    expect(comp.chart.series[1].data.map(it => it.y)).toEqual([1, 0, 3, null, 3, 1, 2, 1])
  })

  it(`should format the data point tooltip`, () => {
    const point = {
      series: {name: 'series-name'},
      x: 1,
      y: 123,
      ...comp.options.tooltip
    }
    expect(point.formatter()).toEqual('<b>series-name</b><br/>1: 123')
  })
})
