import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
  { text: '文档', link: '/doc/', icon: 'material-symbols:article-outline'},
  { text: '展示', icon: 'material-symbols:grid-view-outline',
    items: [
      {text: '禾阅记录', link: '/show/hy-record/', icon: 'material-symbols:book-outline'},
      {text: '活动展示', link: '/show/activity/', icon: 'material-symbols:interactive-space-outline'},
      {text: '学生文章', link: '/show/student-article/', icon: 'lucide:user-pen'},

    ]
  },
])
