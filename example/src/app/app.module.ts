import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HighchartsConfig, HighchartsModule } from 'ngx-highcharts-lazy'

import { AppComponent } from './app.component'
import { LineChartComponent } from './charts/line-chart.component'
import { AreaChartComponent } from './charts/area-chart.component'

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    AreaChartComponent,
  ],
  imports: [
    BrowserModule,
    HighchartsModule,
  ],
  providers: [
    { provide: HighchartsConfig, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
