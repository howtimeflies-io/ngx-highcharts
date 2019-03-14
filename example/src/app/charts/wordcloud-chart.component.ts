import {Component} from '@angular/core'
import { Chart, Options } from 'highcharts'

interface Word {name: string, weight: number}

// demo chart copied from https://www.highcharts.com/demo/wordcloud
@Component({
  selector: 'app-wordcloud-chart',
  template: `
    <div class="chart-container">
      <ngx-highchart [options]="options" [modules]="['modules/wordcloud']"
                     (load)="onLoad($event)"></ngx-highchart>
    </div>
  `
})
export class WordcloudChartComponent {
  public chart: Chart

  public options: Options = {
    series: [{
      type: 'wordcloud',
      data: [],
      rotation: {
        to: 0
      },
      tooltip: {
        headerFormat: null,
        pointFormatter() {
          return `<strong>${this.name}</strong>: Occurrence ${this.weight}`
        }
      }
    }],
    title: {
      text: 'Wordcloud of Lorem Ipsum'
    }
  }

  public onLoad(evt) {
    this.chart = evt.chart
    this.chart.series[0].setData(this.getWords())
  }

  private getWords(): Word[] {
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia
      ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi
      lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus
      sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque
      tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur
      placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue,
      sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et
      eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.`

    return text.split(/[,.\s]+/g).reduce((ret: Word[], it: string) => {
      const found = ret.find(x => x.name === it)
      if (found) {
        ++found.weight
      } else {
        ret.push({name: it, weight: 1})
      }
      return ret
    }, [] as Word[])
  }
}
