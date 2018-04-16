[![CircleCI](https://img.shields.io/circleci/project/github/howtimeflies-io/ngx-highcharts.svg)](https://circleci.com/gh/howtimeflies-io/ngx-highcharts/tree/master)
[![Codecov](https://img.shields.io/codecov/c/github/howtimeflies-io/ngx-highcharts.svg)](https://codecov.io/gh/howtimeflies-io/ngx-highcharts)
[![dependencies](https://img.shields.io/david/howtimeflies-io/ngx-highcharts.svg)](https://david-dm.org/howtimeflies-io/ngx-highcharts)
[![devDependencies](https://img.shields.io/david/dev/howtimeflies-io/ngx-highcharts.svg)](https://david-dm.org/howtimeflies-io/ngx-highcharts?type=dev)
[![peerDependencies](https://img.shields.io/david/peer/howtimeflies-io/ngx-highcharts.svg)](https://david-dm.org/howtimeflies-io/ngx-highcharts?type=peer)

[![npm](https://img.shields.io/npm/v/@howtimeflies/ngx-highcharts.svg)](https://www.npmjs.com/package/@howtimeflies/ngx-highcharts)
[![downloads](https://img.shields.io/npm/dm/@howtimeflies/ngx-highcharts.svg)](https://www.npmjs.com/package/@howtimeflies/ngx-highcharts)

# ngx-highcharts
A Highcharts wrapper for Angular (version 4 and newer)

* lazily-load the Highcharts library (60+ KB gzipped) and any additional modules from CDN or your own distribution
* strong typed (thanks to [@types/highcharts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/highcharts))
* automatically resize the charts to fulfill its container
* easy installation, configuration, usage and testing, with [examples](https://github.com/howtimeflies-io/ngx-highcharts/tree/master/example)

## Installation

```bash
yarn add @howtimeflies/ngx-highcharts
yarn add @types/highcharts --dev
```
or
```bash
npm install --save @howtimeflies/ngx-highcharts
npm install --save-dev @types/highcharts
```

## Configuration

Import the module and set the configuration options in app.module.ts

```typescript
import { HighchartsConfig, HighchartsModule } from '@howtimeflies/ngx-highcharts'

const config: HighchartsConfig = {
  cdnBaseUrl: 'https://code.highcharts.com',
  scriptName: 'highcharts.js',
  delayToExecuteModulesCode: 200,
  maxDelayToResizeContainer: 10000,
  globalOptions: {
    lang: {
      drillUpText: 'Drill-Up'
    }
  }
}

@NgModule({
  imports: [
    ...,
    HighchartsModule
  ],
  providers: [
    { provide: HighchartsConfig, useValue: config }
  ],
  bootstrap: [...]
})
export class AppModule { }
```

The default configuration options are
```typescript
public static defaultConfig: HighchartsConfig = {
  // The base url of the Highcharts library on CDN
  cdnBaseUrl: 'https://unpkg.com/highcharts',
  // The javascript file name of the Highcharts library. We could set it to 'highcharts.src.js' in debugging.
  scriptName: 'highcharts.js',
  // The delay in milliseconds to execute the additional Highcharts modules.
  delayToExecuteModulesCode: 500,
  // The max delay in milliseconds to wait the browser to draw the chart. 
  // Only after the chart element is available on DOM, we could resize it to fulfill its container
  maxDelayToResizeContainer: 10000,
  // The global options of Highcharts as listed in https://api.highcharts.com/highcharts/lang
  globalOptions: {}
}
```

If you would like to use the default configuration options, simply provide an empty object to `HighchartsConfig`
```typescript
   { provide: HighchartsConfig, useValue: {} }
```

The missing options in your custom config would be set with the ones from the default config.

## Usage

Add a `<ngx-highchart>` element to the HTML template. **It must be wrapped in a parent container.**

```angular2html
<div class="chart-container">
  <ngx-highchart [options]="options" (load)="chart = $event.chart"></ngx-highchart>
</div>
```

Set the chart options in the typescript code, and get the chart object in the `load` event handler.

```typescript
export class ChartComponent {
  public options: Highcharts.Options = {
    chart: { type: 'area' },
    series:[
      {
        name: 'name',
        data: []
      }
    ],
    ...
  }

  public chart: Highcharts.ChartObject
}
```

Update the chart data dynamically.

```typescript
this.chart.series[0].setData([1, 0, 3, null, 3, 1, 2, 1])

this.chart.addSeries({
  name: 'John',
  data: [0, 1, 4, 4, 5, 2, 3, 7]
})
```

If some additional highcharts modules are required, set them in the `modules` attribute.

```angular2html
<div class="chart-container">
  <ngx-highchart [options]="options" [modules]="['modules/drilldown', 'highcharts-more']"
                 (load)="onLoad($event)"></ngx-highchart>
</div>
```

Set event handlers to the chart

```typescript
public onLoad(evt: {chart: Highcharts.ChartObject, highcharts: Highcharts.Static}) {
  this.chart = evt.chart

  evt.chart.series[0].setData(this.data)
  evt.highcharts.addEvent(evt.chart, 'drilldown', it => this.onDrillDown(it))
}

private onDrillDown(evt) {
  const data = this.drillDownData.find(it => it.name === evt.point.name)
  this.chart.addSeriesAsDrilldown(evt.point, data)
}
```

## Test

Install the Highcharts library as a dev dependency: `yarn add highcharts --dev` or `npm install --save-dev highcharts`

Verify the chart data and event handler
```typescript
describe(`Drill-down Chart Component`, () => {
  let comp: DrilldownChartComponent
  let fixture: ComponentFixture<DrilldownChartComponent>

  // add the required modules if needed
  const highcharts = require('highcharts/highcharts.src')
  require('highcharts/modules/drilldown.src')(highcharts)
  window['Highcharts'] = highcharts
  
  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DrilldownChartComponent],
      // import the module for testing
      imports: [HighchartsTestingModule]
    }).createComponent(DrilldownChartComponent)

    fixture.detectChanges()
    comp = fixture.componentInstance
  }))

  it(`should display the data on chart`, () => {
    // retrieve the data from the chart object
    const data = comp.chart.series[0].data.map((it: Highcharts.DataPoint) => [it.name, it.y])

    // verify the data
    expect(data).toContainEqual(['IE', 56.33])
    expect(data).toContainEqual(['Chrome', 24.03])
  })

  it(`should drill down to a pie`, () => {
    let data = null
    // spy on the expecting behavior
    spyOn(comp.chart, 'addSeriesAsDrilldown').and.callFake((x, drillDownData) => data = drillDownData)
    const point = comp.chart.series[0].data[0]
    // simulate an event on the chart object
    highcharts.fireEvent(comp.chart, 'drilldown', {point})

    // verify the data
    expect(data.name).toEqual('IE')
    expect(data.data).toContainEqual(['v11.0', 24.13])
  })
})
```
