/*
* 校验工具 部分摘自lodash 并适度改造
* */

import { isObjectLike, getTag } from './common'

export const isNumber = function (value) {
  const ret = typeof value === 'number' ||
      (isObjectLike(value) && getTag(value) == '[object Number]')
  if (!ret) {
    this.log('Wrong data type, it should be a numeric value!', 'warn')
  }
  return ret
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 */
export const isString = function (value) {
  const type = typeof value
  const ret = type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getTag(value) == '[object String]')
  if (!ret) {
    this.log('Wrong data type, it should be a numeric value!', 'warn')
  }
  return ret
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
export const isObject = function (value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
export const isSymbol = function (value) {
  const type = typeof value
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}
