import { Injectable } from '@angular/core'
import { delay, waitUntilObjectAvailable } from '../helper/helper'
import { LazyAssetLoader } from '../helper/lazy-asset-loader'
import { HighchartsConfig } from './highcharts.config'

@Injectable()
export class HighchartsService {

  private promise: Promise<Highcharts.Static> = null
  private config: HighchartsConfig

  constructor(customConfig: HighchartsConfig) {
    this.config = {...HighchartsConfig.defaultConfig, ...customConfig}
  }

  public load(url?: string): Promise<Highcharts.Static> {
    if (this.highcharts) {
      return Promise.resolve(this.highcharts)
    }

    if (!this.promise) {
      const defaultUrl = `${this.config.cdnBaseUrl}/${this.config.scriptName}`
      this.promise = LazyAssetLoader.loadScript(url || defaultUrl).then(() => waitUntilObjectAvailable(() => this.highcharts, 1000, 20))
    }
    return this.promise
  }

  public async loadModules(modules: string[]): Promise<Highcharts.Static>  {
    const highcharts = await this.load()
    const arr = await Promise.all(modules.map(async module => await LazyAssetLoader.loadScript(this.resolveModuleUrl(module))))
    if (arr.some(it => it)) {
      await delay(this.config.delayToExecuteModulesCode)
    }
    return highcharts
  }

  private get highcharts(): Highcharts.Static {
    return window['Highcharts'] as Highcharts.Static
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
