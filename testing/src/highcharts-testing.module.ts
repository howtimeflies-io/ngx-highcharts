import { NgModule } from '@angular/core'
import { HighchartsConfig, HighchartsModule, HighchartsService } from '@howtimeflies/ngx-highcharts'
import { of } from 'rxjs/observable/of'

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
  const highcharts = window['Highcharts'] || require('highcharts/highcharts.src')
  window['Highcharts'] = highcharts
  return {
    load: () => of(highcharts),
    loadModules: () => of(highcharts)
  }
}
