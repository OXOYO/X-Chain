/*
* X-Chain 链构造器创建实例类
* */

import xBase from './libs/base'

const xChain = function (config = {}) {
  // 创建链实例
  return new xBase(config)
}

window.xChain = xChain

export default xChain

