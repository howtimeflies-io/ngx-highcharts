import { fakeAsync, tick } from '@angular/core/testing'
import { LazyAssetLoader } from '../helper/lazy-asset-loader'
import { HighchartsService } from './highcharts.service'

describe(`Highcharts Service`, () => {
  let service: HighchartsService

  beforeEach(() => {
    service = new HighchartsService({delayToExecuteModulesCode: 1})
    spyOn(LazyAssetLoader, 'loadScript').and.returnValue(Promise.resolve(true))
    window['Highcharts'] = {}
  })

  it(`should load the highcharts library`, fakeAsync(() => {
    let highcharts = null
    service.load().then(it => highcharts = it)

    tick()
    expect(highcharts).not.toBeNull()
  }))

  it(`should load the highcharts library with modules`, fakeAsync(() => {
    let highcharts = null
    service.loadModules(['module/drilldown', 'highcharts-more']).then(it => highcharts = it)

    tick(999999)
    expect(highcharts).not.toBeNull()
  }))
})
