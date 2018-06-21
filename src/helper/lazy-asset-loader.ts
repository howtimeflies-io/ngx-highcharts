export class LazyAssetLoader {

  private static assets: Array<{
    id: string,
    loaded: boolean,
    promise: Promise<any>
  }> = []

  /**
   *
   * Load a javascript asset to the application lazily by appending a <script> tag to <body> of index.html
   *
   * @param src the url of the script
   * @returns true if the script is new loaded, otherwise false.
   *   An ErrorObservable would be returned if the asset is failed to load.
   */
  public static loadScript(src: string): Promise<boolean> {
    return LazyAssetLoader.load('script', {
      type: 'text/javascript',
      src
    })
  }

  /**
   *
   * Load a css asset to the application lazily by appending a <link> tag to <body> of index.html
   *
   * @param href the url of the script
   * @returns true if the script is new loaded, otherwise false.
   *   An ErrorObservable would be returned if the asset is failed to load.
   */
  public static loadCss(href: string): Promise<boolean> {
    return LazyAssetLoader.load('link', {
      rel: 'stylesheet',
      href
    })
  }

  /**
   * Load an asset (javascript, css, ...) to the application lazily by appending tags to <body> of index.html
   *
   * @param tagName the tag name to append
   * @param props the properties of the tag
   * @returns true if the asset is new loaded, otherwise false.
   *   An ErrorObservable would be returned if the asset is failed to load.
   */
  private static load(tagName: string, props: {}): Promise<boolean> {
    const id = JSON.stringify({...props, tagName})
    if (LazyAssetLoader.assets.some(it => it.loaded && it.id === id)) {
      return Promise.resolve(false)
    }
    const loadingAsset = LazyAssetLoader.assets.find(it => !it.loaded && it.id === id && it.promise != null)
    if (loadingAsset) {
      return loadingAsset.promise.then(() => false)
    }

    const tag = document.createElement(tagName)
    Object.getOwnPropertyNames(props).forEach(key => tag[key] = props[key])
    document.body.appendChild(tag)

    const asset = {
      id,
      loaded: false,
      promise: null as Promise<boolean>
    }
    const promise = new Promise<boolean>((resolve, reject) => {
      tag.onload = () => {
        asset.loaded = true
        asset.promise = null
        resolve(true)
      }
      tag.onerror = (evt: ErrorEvent) => {
        document.body.removeChild(tag)
        LazyAssetLoader.assets = LazyAssetLoader.assets.filter(it => it.id !== id)
        reject(evt)
      }
    })
    asset.promise = promise
    LazyAssetLoader.assets.push(asset)

    return promise
  }
}
