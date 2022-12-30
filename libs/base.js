/*
* X-Chain 链构造器基类
*
* */

import plugins from '../plugins'
import systemConfig from '../configs/system'
import baseConfig from '../configs/base'
import chainNodes from '../chain-nodes'

/*
* 链构造器
* @param {Object} config  链全局配置
*
* @return {BASE Instance} 返回当前链实例
* */
const BASE = function (config = {}) {
  // 处理基础信息
  Object.entries(systemConfig).forEach(([key, value]) => {
    this[key] = value
  })
  // 链配置
  this._config = {
    ...baseConfig,
    ...config
  }
  // 链数据
  this._data = []
  // 当前链节点名称
  this._nodeName = ''
  // 当前链节点索引
  this._nodeIndex = 0
  // 当前链节点及之前节点名称列表
  this._nodeNames = new Set()
  return this
}

// 整个链库可以执行链式操作的链节点名称
BASE.prototype._allNodeNames = new Set(['setConfig', 'registerNode'])

/*
* 安装插件
* @param {Function} func  插件入口函数
* @param {Object} config  插件配置
* */
BASE.prototype.use = function (func, config) {
  if (typeof func !== 'function') {
    return
  }
  func(BASE, config)
}

/*
* 【链】设置全局配置或节点配置
* @param {String} nodeName  链节点名称
* @param {Object} config  链节点配置
*
* @return {BASE Instance} 返回当前链实例
* */
BASE.prototype.setConfig = function (nodeName, config) {
  // 设置全局配置
  if (typeof nodeName === 'object') {
    this._config = {
      ...this._config,
      ...nodeName
    }
  } else {
    // 设置节点配置
    this._config[nodeName] = config
  }
  return this
}

/*
* 获取链全局配置或节点配置
* @param {String} nodeName  链节点名称
*
* @return 返回链全局配置或节点配置
* */
BASE.prototype.getConfig = function (nodeName) {
  return nodeName ? this._config[nodeName] : this._config
}

/*
* 获取链最终数据或节点数据
* @param {Number} nodeIndex  链节点索引
*
* @return 返回链最终数据或节点数据
* */
BASE.prototype.valueOf = function (nodeIndex = 0) {
  return this._data[nodeIndex]
}

/*
* 获取链所有节点数据
*
* @return {Object} 返回当前链实例数据对象
* */
BASE.prototype.valueOfAll = function () {
  return this._data
}

/*
* 【链】链节点注册
* @param {String} nodeName  链节点名称
* @param {Function} func  链节点方法
* @param {Boolean} force  是否强制注册
*
* @return {BASE Instance} 返回当前链实例
* */
BASE.prototype.registerNode = function (nodeName, func, force = false) {
  if (!nodeName || !func || typeof nodeName !== 'string' || typeof func !== 'function') {
    this.log('registerNode Parameter error!', 'error')
  } else if (this[nodeName] && !force) {
    this.log(`The node with this name:${nodeName} already exists, please do not register again!`, 'error')
  } else {
    BASE.prototype._allNodeNames.add(nodeName)
    // FIXME !!! 节点方法二次包装
    BASE.prototype[nodeName] = function () {
      // 更新_nodeName
      this._nodeName = nodeName
      this._nodeIndex++
      this._nodeNames.add(nodeName)
      // 如果节点方法没有传值，则默认取_data.default
      let args = [...arguments]
      if (args.length) {
        args = args.map(val => {
          // 参数值如果是链式对象则对其求值
          if (val instanceof BASE) {
            return val.valueOf()
          }
          return val
        })
      } else {
        args = [this._data[0]]
      }
      // 更新默认值及当前节点值
      this._data[0] = this._data[this._nodeIndex] = func.call(this, ...args)
      return this
    }
  }
  return this
}

/*
* 【链】执行链
* @param {String} chainData 链数据
*
* @return {BASE Instance} 返回当前链实例
* */
BASE.prototype.run = function (chainData) {
  // 检查数据合法性
  let valid = true
  const handler = (dataTree) => {
    if (Array.isArray(dataTree) && dataTree.length) {
      for(let i = 0; i < dataTree.length; i++) {
        if (!valid) {
          break
        }
        const chainNode = dataTree[i]
        if (!chainNode.hasOwnProperty('nodeName')) {
          valid = false
          break
        } else if  (typeof this[chainNode.nodeName] !== 'function') {
          valid = false
          break
        }
        if (chainNode.hasOwnProperty('children')) {
          handler(chainNode.children)
        }
      }
    } else {
      valid = false
    }
  }
  handler(chainData)
  if (!valid) {
    this.log('run() function parameter validation failed!', 'error')
    return
  }
  if (Array.isArray(chainData) && chainData.length) {
    for(let i = 0; i < chainData.length; i++) {
      const chainNode = chainData[i]
      // 处理子链
      if (chainNode.hasOwnProperty('children')) {
        this.run(chainNode.children)
      }
      if (chainNode.hasOwnProperty('params')) {
        this[chainNode.nodeName](chainNode.params)
      } else {
        this[chainNode.nodeName]()
      }
    }
  }
  return this
}

// 安装工具集合插件
BASE.prototype.use(plugins)

// 注册链节点
Object.entries(chainNodes).forEach(([nodeName, func]) => {
  xBase.prototype.registerNode(nodeName, func)
})

export default BASE
