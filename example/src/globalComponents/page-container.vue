<!--
  公共组件：页面布局容器
-->

<script setup>
  import { ref, computed, shallowRef, onMounted } from 'vue'
  const props = defineProps({
    leftWidth: {
      type: String,
      default: '300px'
    }
  })
  const leftStyle = computed(() => {
    return {
      width: props.leftWidth
    }
  })
</script>

<template>
  <div class="page-container">
    <div class="page-left" :style="leftStyle">
      <slot name="left"></slot>
    </div>
    <div class="page-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
  .page-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 20px;
    background: #F2F6FC;
  }
  .page-left {
    flex: none;
    height: 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: 20px;
    background: #ffffff;
  }
  .page-right {
    flex: 1;
    height: 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: 20px;
    margin-left: 20px;
    background: #ffffff;
  }
</style>
