/*
* 字符串类链式方法集合
* */

export const string2Number = function (value) {
  let ret = ''
  // 1.检查值合法性
  if (!this.isString(value)) {
    return ret
  }
  // 2.执行方法逻辑
  // 3.返回值
  return this.toNumber(value)
}

// 转化为大写
export const upString = function (value) {
  if (!this.isString(value)) {
    return ''
  }
  console.log()
  return value.toUpperCase()
}

// 转化为小写
export const lowerString = function (value) {
  if (!this.isString(value)) {
    return ''
  }
  return value.toLowerCase()
}
