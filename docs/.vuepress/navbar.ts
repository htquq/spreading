import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
  { text: '文档', icon: 'material-symbols:article-outline',
    items: [
      {text: '工作文档', link: '/doc/external/', icon: 'ion:document-text-outline'},
      {text: '内部文档', link: '/doc/internal/', icon: 'fluent:document-lock-28-regular'},
    ]
  },
  { text: '禾研阅社', icon: 'tabler:seeding',
    items: [
      {text: '活动', link: '/activity/', icon: 'material-symbols:interactive-space-outline'},
      { text: '播客', link: '/audio/', icon: 'mdi:audio-video' },
      {text: '月刊', link: '/periodical/', icon: 'mdi:newspaper-variant-outline'},
      {text: '漂流本', link: '/drift/', icon: 'lucide:notebook-pen'},
    ]
  },
  { text: '展示', icon: 'material-symbols:grid-view-outline',
    items: [
      {text: '禾阅记录', link: '/hy-record/', icon: 'material-symbols:book-outline'},
      {text: '学校风采', link: '/article/', icon: 'fa-solid:school'},
      {text: '学生投稿', link: '/student-article/', icon: 'lucide:user-pen'},
    ]
  },
])
