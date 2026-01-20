import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import collections from './collections'
import * as path from 'path'
import { glob } from 'glob'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '禾小阅.svg',

  appearance: true,  // 配置 深色模式

  social: [
    { icon: 'qq', link: 'https://qm.qq.com/q/GK0cBkouwG' },
  ],
  navbarSocialInclude: ['qq'], // 允许显示在导航栏的 social 社交链接
  aside: true, // 页内侧边栏， 默认显示在右侧
  outline: [2, 3], // 页内大纲， 默认显示 h2, h3

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  copyright: false, // 禁用版权信息

  prevPage: true,   // 是否启用上一页链接
  nextPage: true,   // 是否启用下一页链接
  createTime: true, // 是否显示文章创建时间

  /* 站点页脚 */
  footer: {
    message: 'Affiliated with: <a target="_blank" href="https://www.spring.org.cn/">上海春禾青少年发展中心</a>',
    copyright: 'Copyright © 2022 禾阅计划',
  },

  /**
   * @see https://theme-plume.vuejs.press/config/basic/#profile
   */
  profile: { // 站点作者信息
    avatar: '禾小阅.svg', // 站点头像
    name: '禾小阅', // 站点名称
    description: '禾我们一起阅世界~', // 站点描述
    circle: true, // 头像圆形化
    location: '', // 站点位置
    organization: '上海春禾青少年发展中心', // 站点组织机构
  },

  navbar, // 导航栏配置

  sidebar: { // 侧边栏配置
    '/student-article/': getStudentArticleSidebar(), // 自动生成学生投稿侧边栏
    '/article/': getArticleSidebar(), // 自动生成学校风采侧边栏
    '/hy-record/': getHYRecordSidebar(), // 自动生成禾阅记录侧边栏
  },

  collections, // 集合配置

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
   // bulletin: {
   //   layout: 'top-right',
   //   contentType: 'markdown',
   //   title: '公告板标题',
   //   content: '公告板内容',
   // },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
  // transition: {
  //   page: true,        // 启用 页面间跳转过渡动画
  //   postList: true,    // 启用 博客文章列表过渡动画
  //   appearance: 'fade',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
  // },

})


// 自动生成学生投稿侧边栏
function getStudentArticleSidebar() {
  // 使用 glob.sync 方法获取 student-article 目录下的所有 .md 文件，排除 README.md 文件
  const files = glob.sync(
    // 双重保险：模式排除 + 后过滤
    ['*.md', '!README.md'], // 第一步：模式排除，匹配所有 .md 文件但不包括 README.md
    { cwd: path.resolve(__dirname, '../student-article') } // 设置当前工作目录为 student-article
  ).filter(file => 
    // 第二步：后过滤确保万无一失
    !['README.md'].includes(path.basename(file)) // 进一步确保不包含 README.md 文件
  )

  // 返回一个包含侧边栏项的数组
  return [{
    items: files.map(file => ({ // 遍历每个文件生成侧边栏项
      text: path.basename(file, '.md'), // 获取文件名（去掉扩展名）作为显示文本
      link: `/student-article/${file.replace(/\.md$/, '')}` // 生成文件的链接，去掉 .md 后缀
    }))
  }]
}

// 自动生成学校风采侧边栏
function getArticleSidebar() {
  const baseDir = path.resolve(__dirname, '../article')
  
  // 获取所有年份目录下的.md文件
  const files = glob.sync('*/*.md', {
    cwd: baseDir,
    ignore: ['**/README.md']
  })

  // 按年份分组
  const yearMap = files.reduce((acc: Record<string, Array<{ rawName: string, formattedName: string }>>, filePath) => {
    const [year, fileName] = filePath.split(path.sep)
    if (!acc[year]) acc[year] = []
    acc[year].push({
      rawName: path.basename(fileName, '.md'),
      formattedName: formatArticleTitle(path.basename(fileName, '.md'))
    })
    return acc
  }, {})
  
  // 对年份进行倒序排序
  const sortedYears = Object.keys(yearMap).sort((a, b) => b.localeCompare(a))

  return sortedYears.map(year => ({
    text: `${year}年`,
    collapsible: true,
    items: (yearMap[year] as Array<{ rawName: string, formattedName: string }>)
      .sort((a, b) => a.rawName.localeCompare(b.rawName)) // 对文件名进行排序
      .map(item => ({
        text: item.formattedName,
        link: `/article/${item.formattedName}/`
      }))
  }))
}

// 标题格式化函数
function formatArticleTitle(rawTitle: string) {
  return rawTitle
    .replace(/^\d{8}/, '') // 移除日期前缀（如20221208）
    .replace(/([a-zA-Z])(\d+)/g, '$1 $2') // 字母和数字间加空格
    .trim()
}

// 自动生成禾阅记录侧边栏
function getHYRecordSidebar() {
  const baseDir = path.resolve(__dirname, '../hy-record')
  
  // 获取所有学校的.md文件
  const schools = glob.sync('*/*.md', {
    cwd: baseDir,
    ignore: ['**/README.md']
  })

  // 按学校分组
  const schoolMap = schools.reduce((acc: Record<string, Array<{ fileName: string, fullPath: string }>>, filePath) => {
    const [school, fileName] = filePath.split(path.sep)
    if (!acc[school]) acc[school] = []
    acc[school].push({
      fileName: path.basename(fileName, '.md'),
      fullPath: filePath
    })
    return acc
  }, {})

  return Object.entries(schoolMap).map(([school, files]) => ({
    text: school,
    collapsible: true,
    items: (files as Array<{ fileName: string }>).map(file => ({
      text: formatTitle(file.fileName),
      link: `/hy-record/${file.fileName}/`  // 直接使用文件名生成链接
    }))
  }))
}

// 标题格式化函数
function formatTitle(rawTitle: string) {
  return rawTitle
    .replace(/([a-z])([A-Z])/g, '$1 $2')   // 驼峰转空格
    .replace(/_/g, ' ')                    // 下划线转空格
    .replace(/[0-9]{4}/, ' $& ')           // 年份加空格
    .replace(/\s+/g, ' ')                  // 合并多个空格
    .trim()
}