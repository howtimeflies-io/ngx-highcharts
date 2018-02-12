import { NgModule } from '@angular/core'
import { HighchartComponent, HighchartsService } from './index'

@NgModule({
  declarations: [HighchartComponent],
  exports: [HighchartComponent],
  providers: [HighchartsService]
})
export class HighchartsModule {
}
