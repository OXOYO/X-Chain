/*
* 数值类链式方法集合
* */

// 数值转字符串
// 示例： 15000 => '15000'
export const number2String = function (value) {
  let ret = ''
  // 1.检查值合法性
  if (!this.isNumber(value)) {
    return ret
  }
  // 2.执行方法逻辑
  // 3.返回值
  return value.toString()
}

// 数值转千分位
// 示例： 15000 => 15,000
export const number2Thousand = function (value, decimalDigits = 2) {
  let ret = ''
  if (!this.isNumber(value)) {
    return ret
  }
  const reg = /(?=(?!(\b))(\d{3})+$)/g
  value = value.toString()
  if (value === null || value === undefined) {
    return ret
  }
  if (value.indexOf('.') !== -1) {
    const complement =
      decimalDigits > 0 && value.split('.')[1].length === 1 ? '0' : ''
    const small_ =
      decimalDigits > 0
        ? '.' + value.split('.')[1].substring(0, decimalDigits) + complement
        : ''
    ret = value.split('.')[0].replace(reg, ',') + small_
  } else {
    ret = value.replace(reg, ',')
  }
  return ret
}

// 数值转单位
// 示例： 15000 => 1.5万
export const number2Unit = function (value, options) {
  return value.toString()
}
