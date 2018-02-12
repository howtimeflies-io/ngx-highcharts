import * as Highcharts from 'highcharts'

declare module 'Highcharts' {

  export interface Static {
    /**
     * Add an event listener.
     *
     * @see {@link https://api.highcharts.com/class-reference/Highcharts#addEvent}
     * @see {@link https://www.highcharts.com/docs/extending-highcharts/extending-highcharts}
     *
     * @param {HTMLElement | Highcharts.ElementObject | object} element - The element or object to add a listener to.
     *   It can be a HTMLDOMElement, an Highcharts.SVGElement or any other object.
     * @param {string} type - The event type.
     * @param {(evt: Event) => void} fn - The function callback to execute when the event is fired.
     * @returns {Function} - A callback function to remove the added event.
     */
    addEvent(element: HTMLElement | Highcharts.ElementObject | object,
             type: string,
             fn: (evt: Event) => void): () => void

    /**
     * Fire an event that was registered with
     *
     * @see {@link https://api.highcharts.com/class-reference/Highcharts#fireEvent}
     *
     * @param {HTMLElement | Highcharts.ElementObject | object} element - The element or object to add a listener to.
     *   It can be a HTMLDOMElement, an Highcharts.SVGElement or any other object.
     * @param {string} type - The event type.
     * @param eventArguments - Custom event arguments that are passed on as an argument to the event handler.
     * @param {Function} defaultFunction - The default function to execute if the other listeners haven't returned
     *   false.
     */
    fireEvent(element: HTMLElement | Highcharts.ElementObject | object,
              type: string,
              eventArguments?: any,
              defaultFunction?: () => void)

    /**
     * Wrap a method with extended functionality, preserving the original function.
     *
     * @see {@link https://api.highcharts.com/class-reference/Highcharts#wrap}
     * @see {@link https://www.highcharts.com/docs/extending-highcharts/extending-highcharts}
     *
     * @param {object} obj - The context object that the method belongs to. In real cases, this is often a prototype.
     * @param {string} method - The name of the method to extend.
     * @param {(func: Function) => void} fn - A wrapper function callback.
     *   This function is called with the same arguments as the original function, except that the original function
     *   is unshifted and passed as the first argument.
     */
    wrap(obj: object, method: string, fn: (func: () => void) => void)
  }

  export interface WordCloudChart extends Highcharts.BarChart {

    /**
     * For some series, there is a limit that shuts down initial animation by default when the total number of points
     * in the chart is too high. For example, for a column chart and its derivatives, animation doesn't run if there
     * is more than 250 points totally. To disable this cap, set animationLimit to Infinity.
     *
     * Defaults to undefined.
     *
     * @since 6.0.0
     */
    animationLimit?: number

    /**
     * By default, series are exposed to screen readers as regions. By enabling this option, the series element itself
     * will be exposed in the same way as the data points. This is useful if the series is not used as a grouping entity
     * in the chart, but you still want to attach a description to the series.
     *
     * Requires the Accessibility module.
     *
     * Defaults to undefined.
     *
     * @since 5.0.12
     */
    exposeElementToA11y?: boolean

    /**
     * This option decides which algorithm is used for placement, and rotation of a word. The choice of algorith is
     * therefore a crucial part of the resulting layout of the wordcloud. It is possible for users to add their own
     * custom placement strategies for use in word cloud. Read more about it in our documentation
     *
     * Defaults to center.
     * @since 6.0.0
     */
    placementStrategy?: string

    /**
     * Same as accessibility.pointDescriptionFormatter, but for an individual series. Overrides the chart wide
     * configuration.
     *
     * Defaults to undefined.
     *
     * @since 5.0.12
     */
    pointDescriptionFormatter?: () => string

    /**
     * Rotation options for the words in the wordcloud.
     *
     * @since 6.0.0
     */
    rotation?: {
      /**
       * The smallest degree of rotation for a word.
       *
       * Defaults to 0.
       *
       * @since 6.0.0
       */
      from?: number

      /**
       * The largest degree of rotation for a word.
       *
       * Defaults to 90.
       *
       * @since 6.0.0
       */
      to?: number

      /**
       * The number of possible orientations for a word, within the range of rotation.from and rotation.to.
       *
       * Defaults to 2.
       *
       * @since 6.0.0
       */
      orientations?: number
    }

    /**
     * If set to True, the accessibility module will skip past the points in this series for keyboard navigation.
     *
     * Defaults to undefined.
     *
     * @since 5.0.12
     */
    skipKeyboardNavigation?: boolean

    /**
     * Spiral used for placing a word after the inital position experienced a collision with either another word or the
     * borders. It is possible for users to add their own custom spiralling algorithms for use in word cloud. Read more
     * about it in our documentation
     *
     * Defaults to rectangular.
     *
     * @since 6.0.0
     */
    spiral?: string

    /**
     * CSS styles for the words.
     *
     * @since 6.0.0
     */
    style?: {
      /**
       * Defaults to sans-serif.
       *
       * @since 6.0.0
       */
      fontFamily?: string

      /**
       * Defaults to 900.
       *
       * @since 6.0.0
       */
      fontWeight?: number | string
    }
  }

  interface WordCloudChartSeriesOptions extends Highcharts.IndividualSeriesOptions, WordCloudChart {
  }
}

export = Highcharts
export as namespace Highcharts
