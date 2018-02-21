import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {HighchartsTestingModule} from '@howtimeflies/ngx-highcharts'

import {DrilldownChartComponent} from './drilldown-chart.component'

describe(`Drill-down Chart Component`, () => {
  let comp: DrilldownChartComponent
  let fixture: ComponentFixture<DrilldownChartComponent>

  // add the required module
  const highcharts = require('highcharts/highcharts.src')
  require('highcharts/modules/drilldown.src')(highcharts)

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DrilldownChartComponent],
      imports: [HighchartsTestingModule]
    }).createComponent(DrilldownChartComponent)

    fixture.detectChanges()
    comp = fixture.componentInstance
  }))

  it(`should display the data on chart`, () => {
    const data = comp.chart.series[0].data.map((it: Highcharts.DataPoint) => [it.name, it.y])

    expect(data).toContainEqual(['IE', 56.33])
    expect(data).toContainEqual(['Chrome', 24.03])
    expect(data).toContainEqual(['Firefox', 10.38])
    expect(data).toContainEqual(['Safari', 4.77])
    expect(data).toContainEqual(['Opera', 0.91])
    expect(data).toContainEqual(['Proprietary or Undetectable', 0.2])
  })

  it(`should drill down to a pie`, () => {
    let data = null
    spyOn(comp.chart, 'addSeriesAsDrilldown').and.callFake((x, drillDownData) => data = drillDownData)
    const point = comp.chart.series[0].data[0]
    highcharts.fireEvent(comp.chart, 'drilldown', {point})

    expect(data.name).toEqual('IE')
    expect(data.data).toContainEqual(['v11.0', 24.13])
    expect(data.data).toContainEqual(['v8.0', 17.2])
    expect(data.data).toContainEqual(['v9.0', 8.11])
    expect(data.data).toContainEqual(['v10.0', 5.33])
    expect(data.data).toContainEqual(['v6.0', 1.06])
    expect(data.data).toContainEqual(['v7.0', 0.5])
  })

  it(`should not drill down with invalid data`, () => {
    spyOn(comp.chart, 'addSeriesAsDrilldown')
    highcharts.fireEvent(comp.chart, 'drilldown', {point: {name: 'invalid'}})
    expect(comp.chart.addSeriesAsDrilldown).not.toHaveBeenCalled()
  })
})
