import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
  { text: '文档', link: '/doc/', icon: 'material-symbols:article-outline'},
  { text: '展示', link: '/case/', icon: 'material-symbols:grid-view-outline'},
  { text: '工作', link: '/work/', icon: 'material-symbols:work-outline'}
])
