import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HighchartsConfig, HighchartsModule } from '@howtimeflies/ngx-highcharts'

import { AppComponent } from './app.component'
import { LineChartComponent } from './charts/line-chart.component'
import { AreaChartComponent } from './charts/area-chart.component'
import { ColumnRangeChartComponent } from './charts/column-range-chart.component'
import { DrilldownChartComponent } from './charts/drilldown-chart.component'
import { WordcloudChartComponent } from './charts/wordcloud-chart.component'
import { RouterModule } from '@angular/router'
import { ROUTES } from './app.routes'

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    AreaChartComponent,
    ColumnRangeChartComponent,
    DrilldownChartComponent,
    WordcloudChartComponent,
  ],
  imports: [
    BrowserModule,
    HighchartsModule,
    RouterModule.forRoot(ROUTES, { useHash: Boolean(history.pushState) === false }),
  ],
  providers: [
    { provide: HighchartsConfig, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
