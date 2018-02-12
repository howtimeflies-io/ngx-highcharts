import { Observable } from 'rxjs/Observable'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import { map } from 'rxjs/operators'

export class LazyAssetLoader {

  private static assets: Array<{
    id: string,
    loaded: boolean,
    observable: Observable<any>
  }> = []

  /**
   *
   * Load a javascript asset to the application lazily by appending a <script> tag to <body> of index.html
   *
   * @param {string} src the url of the script
   * @returns {Observable<boolean>} true if the script is new loaded, otherwise false.
   *   An ErrorObservable would be returned if the asset is failed to load.
   */
  public static loadScript(src: string): Observable<boolean> {
    return LazyAssetLoader.load('script', {
      type: 'text/javascript',
      src
    })
  }

  /**
   *
   * Load a css asset to the application lazily by appending a <link> tag to <body> of index.html
   *
   * @param {string} href the url of the script
   * @returns {Observable<boolean>} true if the script is new loaded, otherwise false.
   *   An ErrorObservable would be returned if the asset is failed to load.
   */
  public static loadCss(href: string): Observable<boolean> {
    return LazyAssetLoader.load('link', {
      rel: 'stylesheet',
      href
    })
  }

  /**
   * Load an asset (javascript, css, ...) to the application lazily by appending tags to <body> of index.html
   *
   * @param {string} tagName the tag name to append
   * @param {{}} props the properties of the tag
   * @returns {Observable<boolean>} true if the asset is new loaded, otherwise false.
   *   An ErrorObservable would be returned if the asset is failed to load.
   */
  private static load(tagName: string, props: {}): Observable<boolean> {
    const id = JSON.stringify({...props, tagName})
    if (LazyAssetLoader.assets.some(it => it.loaded && it.id === id)) {
      return of(false)
    }
    const loadingAsset = LazyAssetLoader.assets.find(it => !it.loaded && it.id === id && it.observable != null)
    if (loadingAsset) {
      return loadingAsset.observable.pipe(map(() => false))
    }

    const tag = document.createElement(tagName)
    Object.getOwnPropertyNames(props).forEach(key => tag[key] = props[key])
    document.body.appendChild(tag)

    const asset = {
      id,
      loaded: false,
      observable: null
    }
    const promise = new Promise<boolean>((resolve, reject) => {
      tag.onload = () => {
        asset.loaded = true
        asset.observable = null
        resolve(true)
      }
      tag.onerror = (evt: ErrorEvent) => {
        document.body.removeChild(tag)
        LazyAssetLoader.assets = LazyAssetLoader.assets.filter(it => it.id !== id)
        reject(evt)
      }
    })
    const ob = fromPromise(promise)
    asset.observable = ob
    LazyAssetLoader.assets.push(asset)

    return ob
  }
}
