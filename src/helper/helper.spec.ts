import { safeChainedProperty, waitUntilObjectAvailable } from './helper'
import { fakeAsync, tick } from '@angular/core/testing'

interface TestClass {
  nested?: {prop?: string}
}
describe('Helper Methods', () => {

  it(`should get a valid property`, () => {
    const obj: TestClass = {
      nested: {
        prop: 'xyz'
      }
    }
    const val = safeChainedProperty(() => obj.nested.prop)
    expect(val).toEqual('xyz')
  })

  it(`should get 'null' if the property is broken`, () => {
    const obj: TestClass = {}
    const val = safeChainedProperty(() => obj.nested.prop)
    expect(val).toBeNull()
  })

  it(`should get 'null' if the obj is nil`, () => {
    const obj: TestClass = undefined
    const val = safeChainedProperty(() => obj.nested.prop)
    expect(val).toBeNull()
  })

  it(`should re-throw the unexpected exception`, () => {
    const obj: TestClass = {
      get nested() {
        throw new Error('unexpected exception')
      },
      set nested(val: {prop?: string}) {
      }
    }
    try {
      safeChainedProperty(() => obj.nested.prop)
      fail('it should catch an exception')
    } catch (e) {
      expect(e.message).toEqual('unexpected exception')
    }
  })

  it(`should return the object immediately if the object is already available`, async () => {
    const obj: TestClass = {
      nested: {
        prop: 'xyz'
      }
    }
    const val = await waitUntilObjectAvailable(() => obj.nested.prop)
    expect(val).toEqual('xyz')
  })

  it(`should return an timed-out error if the object is unavailable`, fakeAsync(() => {
    const obj: TestClass = null
    let err = null
    waitUntilObjectAvailable(() => obj.nested.prop, 10, 10).then(() => fail('it should not return error')).catch(it => err = it)
    tick(99999)
    expect(err).not.toBeNull()
  }))
})
