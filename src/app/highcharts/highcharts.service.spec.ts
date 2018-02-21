import { fakeAsync, tick } from '@angular/core/testing'
import { of } from 'rxjs/observable/of'
import { LazyAssetLoader } from '../helper/lazy-asset-loader'
import { HighchartsService } from './highcharts.service'

describe(`Highcharts Service`, () => {
  let service: HighchartsService

  beforeEach(() => {
    service = new HighchartsService({delayToExecuteModulesCode: 1})
    spyOn(LazyAssetLoader, 'loadScript').and.returnValue(of(true))
    window['Highcharts'] = {}
  })

  it(`should load the highcharts library`, fakeAsync(() => {
    let highcharts = null
    service.load().subscribe(it => highcharts = it)

    tick()
    expect(highcharts).not.toBeNull()
  }))

  it(`should load the highcharts library with modules`, fakeAsync(() => {
    let highcharts = null
    service.loadModules(['module/drilldown', 'highcharts-more']).subscribe(it => highcharts = it)

    tick(999999)
    expect(highcharts).not.toBeNull()
  }))
})
