import { Component } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { HighchartComponent } from './highchart.component'
import { HighchartsConfig } from './highcharts.config'
import { HighchartsService } from './highcharts.service'

@Component({
  template: `
    <div class="container" style="width: 100px; height: 200px;">
      <ngx-highchart [options]="options" [modules]="modules" (load)="chart = $event.chart"></ngx-highchart>
    </div>
    <div class="container" style="width: 100px; height: 200px;" *ngIf="visible">
      <ngx-highchart [options]="options" [modules]="['highcharts-more']" (load)="chart2 = $event.chart"></ngx-highchart>
    </div>
  `
})
class ConsumerComponent {
  public options: Highcharts.Options = {}
  public chart: Highcharts.ChartObject
  public modules: string[]

  public chart2: Highcharts.ChartObject
  public visible = false
}

describe(`Highchart-Component Consumer`, () => {
  let comp: ConsumerComponent
  let fixture: ComponentFixture<ConsumerComponent>
  let service
  let theChart
  let width = 0
  let height = 0

  const highcharts = require('highcharts')

  beforeEach(async(() => {
    service = {
      load: () => null,
      loadModules: () => null
    }
    spyOn(service, 'load').and.returnValue(Promise.resolve(highcharts))
    spyOn(service, 'loadModules').and.returnValue(Promise.resolve(highcharts))

    width = 0
    height = 0
    highcharts.wrap(highcharts, 'chart', (proceed, el, opts, callback) =>  {
      proceed(el, opts, chart => {
        if (theChart !== chart) { // avoid "Error: <spyOn> : setSize has already been spied upon"
          theChart = chart
          spyOn(chart, 'setSize').and.callFake((w, h) => {
            width = w
            height = h
          })
        }
        callback(chart)
      })
    })

    fixture = TestBed.configureTestingModule({
      declarations: [HighchartComponent, ConsumerComponent ],
      providers: [
        { provide: HighchartsConfig, useValue: HighchartsConfig.defaultConfig },
        { provide: HighchartsService, useValue: service },
      ]
    }).createComponent(ConsumerComponent)

    fixture.detectChanges()
    comp = fixture.componentInstance
  }))

  it(`should fill the container on init`, () => {
    expect(width).toEqual(100)
    expect(height).toEqual(200)
  })

  it(`should fill the container on window resizing`, fakeAsync(() => {
    const container = fixture.nativeElement.querySelector('.container')
    container.setAttribute('style', 'width: 123px; height: 345px')

    expect(width).toEqual(100)
    expect(height).toEqual(200)

    window.dispatchEvent(new Event('resize'))
    tick(999999)

    expect(width).toEqual(123)
    expect(height).toEqual(345)
  }))

  it(`should load the modules on demand`, fakeAsync(() => {
    expect(service.loadModules).not.toHaveBeenCalled()

    comp.modules = ['highcharts-more', 'module/drilldown']
    fixture.detectChanges()
    tick(999999)
    expect(service.loadModules).toHaveBeenCalledTimes(1)
  }))

  it(`should load the modules on chart init`, fakeAsync(() => {
    expect(service.loadModules).not.toHaveBeenCalled()

    comp.visible = true
    fixture.detectChanges()
    tick(999999)
    expect(service.loadModules).toHaveBeenCalled()
  }))
})
