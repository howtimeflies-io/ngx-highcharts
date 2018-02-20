import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {WordcloudChartComponent} from './wordcloud-chart.component'
import {HighchartsTestingModule} from 'ngx-highcharts-lazy'

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
})
