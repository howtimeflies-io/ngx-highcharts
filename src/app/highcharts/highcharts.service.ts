import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { forkJoin } from 'rxjs/observable/forkJoin'
import { of } from 'rxjs/observable/of'
import { delay, mergeMap, tap } from 'rxjs/operators'
import { LazyAssetLoader, waitUntilObjectAvailable } from '../helper'
import { HighchartsConfig } from './highcharts.config'

@Injectable()
export class HighchartsService {

  private observable: Observable<Highcharts.Static> = null
  private highcharts: Highcharts.Static = null
  private config: HighchartsConfig

  constructor(customConfig: HighchartsConfig) {
    this.config = {...HighchartsConfig.defaultConfig, ...customConfig}
  }

  public load(url?: string): Observable<Highcharts.Static> {
    if (this.highcharts) {
      return of(this.highcharts)
    }

    if (!this.observable) {
      const defaultUrl = `${this.config.cdnBaseUrl}/${this.config.scriptName}`
      this.observable = LazyAssetLoader.loadScript(url || defaultUrl).pipe(
        mergeMap(() => waitUntilObjectAvailable(() => window['Highcharts'] as Highcharts.Static, 1000, 20))
      )
    }
    return this.observable
  }

  public loadModules(modules: string[]): Observable<Highcharts.Static>  {
    let highcharts: Highcharts.Static
    const millis = this.config.delayToExecuteModulesCode
    return this.load().pipe(
      tap(it => highcharts = it),
      mergeMap(() => forkJoin(modules.map(module => LazyAssetLoader.loadScript(this.resolveModuleUrl(module))))),
      // delay a few ms to have the modules' javascript code executed
      // otherwise it would throw the errors like https://www.highcharts.com/errors/17
      // Is there any reliable solution to check if the code inside the new added <script> tag is executed?
      mergeMap(arr => arr.some(it => it) ? of(highcharts).pipe(delay(millis)) : of(highcharts))
    )
  }

  // 'highcharts-more' -> 'https://unpkg.com/highcharts@6.0.4/highcharts-more.js'
  // 'module/drilldown' -> 'https://unpkg.com/highcharts@6.0.4/module/drilldown.js'
  private resolveModuleUrl(module: string): string {
    let url = module
    if (!/^https?:.+/.test(url)) {
      url = this.config.cdnBaseUrl + '/' + url
    }
    if (!/.+?\.js$/.test(url)) {
      url += '.js'
    }
    return url
  }
}
