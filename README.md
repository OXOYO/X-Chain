# X-Chain
JS链式操作基础库


## 示例
```javascript
    // 工具包根入口
    U()
    // FIXME 示例1
    F()
        // 链的数据操作
        .action1(val)
        // 链的取值
        .valueOf()
    
    // FIXME 示例2
    F()
        // 链的配置
        .setConfig('key', {
            k1: 'v1',
            k2: 'v2'
        })
        // 链的数据操作
        .action1(val)
        .action2()
        .action3()
        // 链的取值
        .valueOf()
    
    // FIXME 示例3
    F()
        // 链的配置
        .setConfig('action1', {
            k1: 'v1',
            k2: 'v2'
        })
        // 链的数据操作
        .action1(val)
        // 链的配置
        .setConfig('action2', {
            k1: 'v1',
            k2: 'v2'
        })
        .action2()
        // 链的配置
        .setConfig('action2', {
            k1: 'v1',
            k2: 'v2'
        })
        .action3()
        // 链的取值
        .valueOf()
    
    // FIXME 示例3等价
    // 链的配置
    F({
        action1: {
            k1: 'v1',
            k2: 'v2'
        },
        action2: {
            k1: 'v1',
            k2: 'v2'
        },
        action3: {
            k1: 'v1',
            k2: 'v2'
        }
    })
        .action1(val).action2().action3().valueOf()
    
    // FIXME 示例3等价
    // 链的配置
    F({
        action1: {
            k1: 'v1',
            k2: 'v2'
        },
        action2: {
            k1: 'v1',
            k2: 'v2'
        },
        action3: {
            k1: 'v1',
            k2: 'v2'
        }
    })
        .action1(val, {
            k1: 'v3',
            k2: 'v4'
        })
        .action1({
            k1: 'v3',
            k2: 'v4'
        })
        .action2({
            k1: 'v5',
            k2: 'v6'
        })
        .action3({
            k1: 'v7',
            k2: 'v8'
        })
        .valueOf()
    
    
    // FIXME 示例4
    // 链的配置
    F({
        action1: {
            k1: 'v1',
            k2: 'v2'
        },
        action2: {
            k1: 'v1',
            k2: 'v2'
        },
        action3: {
            k1: 'v1',
            k2: 'v2'
        }
    })
        .action1(val).action2().action3()
        .setConfig({
            action1: {
                k1: 'v9',
                k2: 'v10'
            },
            action2: {
                k1: 'v9',
                k2: 'v10'
            },
            action3: {
                k1: 'v9',
                k2: 'v10'
            }
        })
        .action1().action2().action3()
        .setConfig('action1', {
            k1: 'v9',
            k2: 'v10'
        })
        .action1({
            k1: 'v9',
            k2: 'v10'
        })
        .valueOf()
    
    
    // 链示例
    // 一维链
    F().chain([
        ['action1', val, config],
        ['action2'],
        ['valOf']
    ])
    // 等价于
    F().action1(val, config).action2().valOf()
    
    // 二维链
    F().chainTree([
        [
            'action1',
            val,
            config,
            // 子链
            [
                ['action2']
            ]
        ],
        ['valOf']
    ])
    // 等价于
    F().action1(val, config, actions2()).valOf()
    
    // 异步链
    F().asyncAction1(val, config).action2().valOf()
    
    // 链核心
    // 链基类 function T
    // 配置基类 function C
    // 节点基类 function N
    // 实例 function F = new T()
    // 注册节点方法 function T.prototype.registerNode
    // 设置节点配置 function
    T.prototype.setConfig
    // 一维链 function
    T.prototype.chain
    // 多维链
    T.prototype.chainTree
    // 异步链

```
