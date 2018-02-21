import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {HighchartsTestingModule} from '@howtimeflies/ngx-highcharts'

import {WordcloudChartComponent} from './wordcloud-chart.component'

describe(`Word-Cloud Chart Component`, () => {
  let comp: WordcloudChartComponent
  let fixture: ComponentFixture<WordcloudChartComponent>

  // add the required module
  const highcharts = require('highcharts/highcharts.src')
  require('highcharts/modules/wordcloud.src')(highcharts)

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [WordcloudChartComponent],
      imports: [HighchartsTestingModule]
    }).createComponent(WordcloudChartComponent)

    fixture.detectChanges()
    comp = fixture.componentInstance
  }))

  it(`should display the data on chart`, () => {
    const data = comp.chart.series[0].data.map((it: any) => [it.name, it.weight])

    expect(data).toContainEqual(['pretium', 5])
    expect(data).toContainEqual(['Curabitur', 2])
    expect(data).toContainEqual(['et', 2])
    expect(data).toContainEqual(['neque', 1])
  })

  it(`should format the data point tooltip`, () => {
    const series = comp.options.series[0] as Highcharts.WordCloudChartSeriesOptions
    const point = {
      name: 'word',
      weight: 321,
      ...series.tooltip
    }
    expect(point.pointFormatter()).toEqual('<strong>word</strong>: Occurrence 321')
  })
})
