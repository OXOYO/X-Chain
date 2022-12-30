/*
* 插件：工具集合
*
* */

import * as common from './common'
import * as transfer from './transfer'
import * as validate from './validate'
import * as log from './log'

const utils = {
  ...common,
  ...transfer,
  ...validate,
  ...log
}

console.log('utils', Object.keys(utils))

export default function (BASE, config) {
  Object.entries(utils).forEach(([funcName, func]) => {
    BASE.prototype[funcName] = func
  })
}
