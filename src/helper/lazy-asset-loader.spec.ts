import { fakeAsync, tick } from '@angular/core/testing'
import { LazyAssetLoader } from './lazy-asset-loader'

describe('Lazy Asset Loader', () => {
  const tag = document.createElement('script')
  const failure = () => fail('it should not fail')
  let spy: jasmine.Spy
  let isScriptNewLoaded

  beforeEach(() => {
    spy = spyOn(document, 'createElement').and.returnValue(tag)
    spyOn(document.body, 'appendChild').and.stub()
    spyOn(document.body, 'removeChild').and.stub()
    isScriptNewLoaded = null
  })

  it(`should load a css`, fakeAsync(() => {
    let isCssLoaded = null
    LazyAssetLoader.loadCss('bootstrap.min.css').subscribe(result => isCssLoaded = result, failure)

    tag.onload(new Event('load'))

    tick()
    expect(isCssLoaded).toBeTruthy()
  }))

  it(`should load a script`, fakeAsync(() => {
    LazyAssetLoader.loadScript('angular.js').subscribe(result => isScriptNewLoaded = result, failure)

    tag.onload(new Event('load'))

    tick()
    expect(isScriptNewLoaded).toBeTruthy()
  }))

  it(`should not load a duplicated script if it is still loading`, fakeAsync(() => {
    let isDuplicatedScriptNewLoaded = null
    LazyAssetLoader.loadScript('howtimeflies.js').subscribe(result => isScriptNewLoaded = result, failure)
    LazyAssetLoader.loadScript('howtimeflies.js').subscribe(result => isDuplicatedScriptNewLoaded = result, failure)

    tag.onload(new Event('load'))

    tick()
    expect(isScriptNewLoaded).toBeTruthy()
    expect(isDuplicatedScriptNewLoaded).toBeFalsy()
    expect(spy).toHaveBeenCalledTimes(1)
  }))

  it(`should not load a duplicated script if it is already loaded`, fakeAsync(() => {
    let isDuplicatedScriptNewLoaded = null
    LazyAssetLoader.loadScript('howtimeflies.js?v=2').subscribe(result => isScriptNewLoaded = result, failure)

    tag.onload(new Event('load'))
    tick()

    LazyAssetLoader.loadScript('howtimeflies.js?v=2').subscribe(result => isDuplicatedScriptNewLoaded = result, failure)
    tick()

    expect(isScriptNewLoaded).toBeTruthy()
    expect(isDuplicatedScriptNewLoaded).toBeFalsy()
    expect(spy).toHaveBeenCalledTimes(1)
  }))

  it(`should load the script again if it was failed to load`, fakeAsync(() => {
    let isFailed = null

    LazyAssetLoader.loadScript('howtimeflies.js?v=3').subscribe(failure, () => isFailed = true)
    tag.onerror(new ErrorEvent('error'))
    tick()

    LazyAssetLoader.loadScript('howtimeflies.js?v=3').subscribe(result => isScriptNewLoaded = result, failure)
    tag.onload(new Event('load'))
    tick()

    expect(isFailed).toBeTruthy()
    expect(isScriptNewLoaded).toBeTruthy()
    expect(spy).toHaveBeenCalledTimes(2)
  }))
})
