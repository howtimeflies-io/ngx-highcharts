import { NgModule } from '@angular/core'
import { HighchartsConfig, HighchartsModule, HighchartsService } from '@howtimeflies/ngx-highcharts'

@NgModule({
  imports: [HighchartsModule],
  exports: [HighchartsModule],
  providers: [
    { provide: HighchartsConfig, useValue: {maxDelayToResizeContainer: 10} },
    { provide: HighchartsService, useFactory: mockHighchartsService },
  ]
})
export class HighchartsTestingModule {
}

export function mockHighchartsService(): any {
  const highcharts = window['Highcharts'] || require('highcharts')
  window['Highcharts'] = highcharts
  return {
    load: () => Promise.resolve(highcharts),
    loadModules: () => Promise.resolve(highcharts)
  }
}
