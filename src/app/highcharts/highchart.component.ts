import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { safeChainedProperty, waitUntilObjectAvailable } from '../helper'
import { HighchartsConfig } from './highcharts.config'
import { HighchartsService } from './highcharts.service'

interface Size {
  width: number,
  height: number
}

@Component({
  selector: 'ngx-highchart',
  template: `&nbsp;`
})
export class HighchartComponent implements AfterViewInit, OnDestroy {

  @Input() public options: Highcharts.Options = {}

  @Output() public load: EventEmitter<{chart: Highcharts.ChartObject, highcharts: Highcharts.Static}> =
    new EventEmitter<{chart: Highcharts.ChartObject, highcharts: Highcharts.Static}>()

  private _modules: string[] = []

  private chart: Highcharts.ChartObject

  private subscription: Subscription

  constructor(private highchartsService: HighchartsService,
              private config: HighchartsConfig,
              private element: ElementRef) {}

  @Input() public set modules(modules: string[]) {
    this._modules = modules || []
    if (this._modules.length > 0) {
      this.highchartsService.loadModules(this._modules).subscribe(() => null)
    }
  }

  public ngAfterViewInit() {
    const req = this._modules.length > 0 ? this.highchartsService.loadModules(this._modules)
                                         : this.highchartsService.load()
    req.subscribe((highcharts: Highcharts.Static) => {
      highcharts.setOptions(this.config.globalOptions)
      highcharts.chart(this.element.nativeElement, this.options, it => {
        this.chart = it
        window.addEventListener('resize', this.resizeHandler)
        this.fitChartToContainer()
        this.load.emit({chart: this.chart, highcharts})
      })
    })
  }
  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    window.removeEventListener('resize', this.resizeHandler)
  }

  private resizeHandler = () => this.fitChartToContainer()

  private fitChartToContainer() {
    const getSize = () => {
      const parent = safeChainedProperty(() => this.chart.container.parentElement.parentElement)
      if (parent) {
        const size = this.getElementSize(parent)
        if (size.width > 0 || size.height > 0) {
          return size
        }
      }
      return null
    }
    const maxDelay = this.config.maxDelayToResizeContainer || 10000
    this.subscription = waitUntilObjectAvailable(getSize, maxDelay).subscribe(size => {
      this.subscription = null
      this.resizeChart(size)
    }, () => null)
  }

  private resizeChart(size: Size) {
    const container = this.chart.container.parentElement.parentElement
    const style = window.getComputedStyle(container) || container.style
    const width = size.width -
      (parseInt(style['paddingLeft'], 10) || 0) -
      (parseInt(style['paddingRight'], 10) || 0)
    const height = size.height -
      (parseInt(style['paddingTop'], 10) || 0) -
      (parseInt(style['paddingBottom'], 10) || 0)
    this.chart.setSize(width, height, false)
  }

  private getElementSize(el: HTMLElement): Size {
    const style = getComputedStyle(el) || el.style
    const width = el.clientWidth || parseInt(style['width'] || '0', 10)
    const height = el.clientHeight || parseInt(style['height'] || '0', 10)
    return {width, height}
  }
}
