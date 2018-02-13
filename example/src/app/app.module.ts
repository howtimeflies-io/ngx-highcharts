import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HighchartsConfig, HighchartsModule } from 'ngx-highcharts-lazy'

import { AppComponent } from './app.component'
import { LineChartComponent } from './charts/line-chart.component'
import { AreaChartComponent } from './charts/area-chart.component'
import { ColumnRangeChartComponent } from './charts/column-range-chart.component'
import { DrilldownChartComponent } from './charts/drilldown-chart.component'

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    AreaChartComponent,
    ColumnRangeChartComponent,
    DrilldownChartComponent,
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
