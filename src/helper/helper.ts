import {Observable} from 'rxjs/Observable'
import {ErrorObservable} from 'rxjs/observable/ErrorObservable'
import {of} from 'rxjs/observable/of'
import {delay, mergeMap} from 'rxjs/operators'

export function safeChainedProperty<T>(chain: () => T): T {
  try {
    return chain()
  } catch (e) {
    if (e instanceof ReferenceError || e instanceof TypeError) {
      return null
    }
    throw e
  }
}

export function waitUntilObjectAvailable<T>(fn: () => T, timeout: number = 9000, interval: number = 50): Observable<T> {
  const result = safeChainedProperty(fn)
  if (result) {
    return of(result)
  }
  if (timeout < 0) {
    return ErrorObservable.create('Timed-out before the object is available')
  }
  return of(null).pipe(
    delay(interval),
    mergeMap(() => waitUntilObjectAvailable(fn, timeout - interval, interval))
  )
}

