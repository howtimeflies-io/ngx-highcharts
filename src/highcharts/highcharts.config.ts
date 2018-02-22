export class HighchartsConfig {
  public static defaultConfig: HighchartsConfig = {
    cdnBaseUrl: 'https://unpkg.com/highcharts',
    scriptName: 'highcharts.js',
    delayToExecuteModulesCode: 500,
    maxDelayToResizeContainer: 10000,
    globalOptions: {}
  }

  public cdnBaseUrl?: string
  public scriptName?: string
  public delayToExecuteModulesCode?: number
  public maxDelayToResizeContainer?: number
  public globalOptions?: Highcharts.GlobalOptions
}
