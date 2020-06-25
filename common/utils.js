/**
 * Adds configurable, enumerable, mutable properties to an object.
 *
 * @param {Object} obj the object to add properties
 * @param {string} prop the property name
 * @param {Object} val the value
 * @returns {Object} returns the object, but also mutates the object in-place
 */
export function createMutableProperty(obj, prop, val) {
  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    value: val,
    writable: true
  })
}

/**
 * Return a numeric value of the string in millisecond format.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/time
 *
 * @param {string} duration provided in either '3s' or '3000ms' format
 */
export function getDuration(duration) {
  let ret = null
  let isMs = false

  if (duration[duration.length - 2] === 'm') {
    isMs = true
  }

  ret = Number.parseFloat(duration.substring(0, isMs ? duration.length - 2 : duration.length - 1))

  if (!isMs) {
    ret = ret * 1000
  }

  return ret
}