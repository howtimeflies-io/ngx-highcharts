export const delay = time => new Promise(res => setTimeout(() => res(), time))

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

export async function waitUntilObjectAvailable<T>(fn: () => T, timeout: number = 9000, interval: number = 50): Promise<T> {
  const result = safeChainedProperty(fn)
  if (result) {
    return Promise.resolve(result)
  }
  if (timeout < 0) {
    return Promise.reject('Timed-out before the object is available')
  }

  await delay(interval)
  return waitUntilObjectAvailable(fn, timeout - interval, interval)
}

