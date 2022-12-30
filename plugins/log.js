/*
* 日志输出公共方法
*
* */

import baseConfig from '../configs/system'

// 消息类型前缀
const MSG_PREFIX = {
  info: 'INFO:',
  warn: 'WARN:',
  error: 'ERROR:'
}

// 消息类型
const MSG_TYPES = Object.keys(MSG_PREFIX)

// 处理拼装消息内容
const handleMsg = function (msg, type = 'info') {
  return `${baseConfig.name} ${MSG_PREFIX[type]} ${msg}`
}

// log核心
export const log = function (msg, type = 'info') {
  console.log('log this', this)
  if (!this._config.logLevel || MSG_TYPES.indexOf(type) >= this._config.logLevel) {
    return
  }
  if (!MSG_TYPES.includes(type)) {
    console.warn(handleMsg('log type error'), 'warn')
  } else {
    console[type](handleMsg(msg, type))
  }
}
