<!--
  工具链编辑器
-->
<script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import xChain from '../../../index.js'

  const menuList = ref([
    {
      label: '基础示例',
      id: 1,
      contents: [
        {
          id: 1,
          label: '创建实例',
          content: 'xChain()'
        },
        {
          id: 2,
          label: 'number2String()',
          content: 'xChain().number2String(100)'
        },
        {
          id: 3,
          label: 'number2Thousand()',
          content: 'xChain().number2Thousand(25000)'
        },
        {
          id: 4,
          label: 'string2Number()',
          content: 'xChain().string2Number("25000")'
        },
        {
          id: 5,
          label: 'valueOf()',
          content: 'xChain().number2String(100).valueOf()'
        },
        {
          id: 6,
          label: 'valueOfAll()',
          content: 'xChain().number2String(100).valueOfAll()'
        },
        {
          id: 7,
          label: '一维多节点链',
          content: 'xChain().number2String(25000).string2Number().number2Thousand().valueOf()'
        },
        {
          id: 8,
          label: '多维链嵌套',
          content: 'xChain().string2Number(xChain().number2String(25000)).valueOf()'
        },
        {
          id: 9,
          label: 'run一维链',
          content:
            'xChain().run([{nodeName: "string2Number", params: "25000"}, {nodeName: "number2Thousand"}]).valueOf()'
        },
        {
          id: 10,
          label: 'run多维链',
          content:
            'xChain().run([{nodeName: "string2Number", children: [{nodeName: "number2String", params: 25000}]}, {nodeName: "number2Thousand"}])'
        },
        {
          id: 11,
          label: 'run多维链与普通链',
          content:
            'xChain().run([{nodeName: "string2Number", children: [{nodeName: "number2String", params: 25000}]}, {nodeName: "number2Thousand"}]).valueOf()'
        },
      ]
    }
  ])
  // 打开的菜单
  const activeMenuId = ref([1])
  // 打开的菜单项ID
  const activeMenuItemId = ref(null)
  // 当前显示的内容
  const activeContent = ref({
    id: '',
    label: '',
    content: '',
    result: ''
  })
  // 菜单变化事件
  const onActiveMenuChange = (menuId) => {
    console.log('onActiveMenuChange', menuId)
  }
  // 菜单项点击事件
  const onMenuItemClick = (menuItem, contentItem) => {
    activeMenuItemId.value = contentItem.id
    activeContent.value = contentItem
    doRun()
  }
  // 执行当前输入内容
  const doRun = async () => {
    // 清空结果
    activeContent.value.result = ''
    const data = activeContent.value
    if (!data || !data.content) {
      ElMessage.error('脚本不能为空！')
      return
    }
    console.log('data', data, data.content)
    try {
      const result =  await eval(data.content)
      console.log('执行脚本：', data.content)
      console.log('执行结果：', result)
      activeContent.value.result = result
    } catch (e) {
      ElMessage.error('执行失败，请检查脚本！')
      console.log('执行错误：', e)
      activeContent.value.result = e
    }
  }
</script>

<template>
  <page-container class="chain-editor">
      <template v-slot:left>
        <el-scrollbar style="height: 100%">
          <el-collapse v-model="activeMenuId" @change="onActiveMenuChange">
            <el-collapse-item
              v-for="menuItem in menuList"
              :key="menuItem.id"
              :name="menuItem.id"
              :title="menuItem.label"
            >
              <el-button
                v-for="item in menuItem.contents"
                :key="item.id"
                class="menu-item"
                text
                :type="item.id === activeMenuItemId ? 'primary' : ''"
                @click="onMenuItemClick(menuItem, item)"
              >
                {{ item.label }}
              </el-button>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </template>
      <template v-slot:right>
        <template v-if="activeContent">
          <el-input
            v-model="activeContent.content"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="请输入脚本"
          />
          <el-button
            type="primary"
            style="margin: 10px 0 20px;"
            @click="doRun"
          >执行</el-button>
          <el-input
            v-model="activeContent.result"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            readonly
            placeholder="暂无结果！"
          />
        </template>
      </template>
  </page-container>
</template>

<style scoped>
  .menu-item {
    width: 100%;
    justify-content: flex-start;
    margin-left: 12px;
  }
</style>
