import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>ngx-highcharts-lazy examples</h1>
      <ul>
        <li><a href [routerLink]="['line-chart']">Line Chart</a></li>
        <li><a href [routerLink]="['area-chart']">Area Chart</a></li>
        <li><a href [routerLink]="['column-range-chart']">Column Range Chart</a></li>
        <li><a href [routerLink]="['drilldown-chart']">Drilldown Chart</a></li>
        <li><a href [routerLink]="['wordcloud-chart']">Wordcloud Chart</a></li>
      </ul>
    
      <router-outlet class="router-outlet"></router-outlet>
    </div>
  `,
  styles: [
    `ul li { display: inline; margin-right: 8px; }`,
    `h1 { text-align: center }`
  ]
})
export class AppComponent {}
