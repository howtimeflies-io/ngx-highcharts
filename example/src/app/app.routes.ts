import { Routes } from '@angular/router'
import { LineChartComponent } from './charts/line-chart.component'
import { AreaChartComponent } from './charts/area-chart.component'
import { ColumnRangeChartComponent } from './charts/column-range-chart.component'
import { DrilldownChartComponent } from './charts/drilldown-chart.component'
import { WordcloudChartComponent } from './charts/wordcloud-chart.component'

export const ROUTES: Routes = [
  { path: '',                   component: LineChartComponent },
  { path: 'line-chart',         component: LineChartComponent },
  { path: 'area-chart',         component: AreaChartComponent },
  { path: 'column-range-chart', component: ColumnRangeChartComponent },
  { path: 'drilldown-chart',    component: DrilldownChartComponent },
  { path: 'wordcloud-chart',    component: WordcloudChartComponent },
]
