<script setup>
import { Layout } from 'vuepress-theme-plume/client'
</script>

<template>
  <Layout>
    <template #nav-bar-title-after>
      <!-- 自定义内容示例：插入一个 Logo 图片 -->
      <img 
        src="/春禾logo.svg"
        class="nav-logo"
        alt="Logo"
      />
    </template>
  </Layout>
</template>

<style>
/* 
  自定义 CSS 样式：
  这里仅作用于当前 Layout.vue 文件，不会污染全局样式
*/
.nav-logo {
  height: 80%;          /* 设置 Logo 高度 */
  margin-left: 10px;     /* 图片与右侧元素的间距 */
  margin-top: 0px; /* 图片与顶部元素的间距 */
  vertical-align: middle; /* 垂直对齐方式（与标题文字对齐） */
}

</style>