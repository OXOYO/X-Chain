/*
* 异步测试
*
* */

export const asyncLoad = async function (value = '') {
  console.log('asyncLoad 001')
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('asyncLoad 002')
      resolve('asyncLoad Success ' + value)
    }, 500)
  })
}
