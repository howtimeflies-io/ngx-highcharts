import { NgModule } from '@angular/core'
import { HighchartComponent } from './highchart.component'
import { HighchartsService } from './highcharts.service'

@NgModule({
  declarations: [HighchartComponent],
  exports: [HighchartComponent],
  providers: [HighchartsService]
})
export class HighchartsModule {
}
