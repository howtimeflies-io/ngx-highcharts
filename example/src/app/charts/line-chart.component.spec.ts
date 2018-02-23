import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {HighchartsTestingModule} from '@howtimeflies/ngx-highcharts/testing'

import {LineChartComponent} from './line-chart.component'

describe(`Line Chart Component`, () => {
  let comp: LineChartComponent
  let fixture: ComponentFixture<LineChartComponent>

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [LineChartComponent],
      imports: [HighchartsTestingModule]
    }).createComponent(LineChartComponent)

    fixture.detectChanges()
    comp = fixture.componentInstance
  }))

  it(`should display the data on chart`, () => {
    const names = ['Installation', 'Manufacturing', 'Sales & Distribution', 'Project Development', 'Other']
    expect(comp.chart.series.map(it => it.name)).toEqual(names)
    expect(comp.chart.series[0].data.map(it => it.y)).toEqual([43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175])
    expect(comp.chart.series[1].data.map(it => it.y)).toEqual([24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434])
    expect(comp.chart.series[2].data.map(it => it.y)).toEqual([11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387])
    expect(comp.chart.series[3].data.map(it => it.y)).toEqual([null, null, 7988, 12169, 15112, 22452, 34400, 34227])
    expect(comp.chart.series[4].data.map(it => it.y)).toEqual([12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111])

  })
})
