// @flow
const defaultStore = new Map()

// Caches a value under a given key, used to cache the results of expensive function calls
// to prevent unwanted recalculation. Calling cache with a different value for a key will
// not change the cached value in the store.
export function cache(key: String, value: Any, store: Map = defaultStore): Any {
  return store.get(key) || store.set(key, typeof value === `function` ? value() : value).get(key)
}

// Memoizes a given function, such that subsequent calls with the same arguments will be returned from a cache of previous results.
export const memoize = (fn: Function, store: Map = new Map()): Function => (...args: Any): Any =>
  cache(JSON.stringify(args), () => fn(...args), store)