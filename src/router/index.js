import en from '../i18n/lang/en'
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'

// 不是必须加载的组件使用懒加载
const NotFound = () => import('@/page404')

const blogList = () => import('@/views/blog/List')
const editBlog = () => import('@/views/blog/Edit')
const catalogList = () => import('@/views/catalog/List')
const linkList = () => import('@/views/link/List')
const userList = () => import('@/views/user/List')
const voteList = () => import('@/views/vote/List')
const commentList = () => import('@/views/comment/List')
const logList = () => import('@/views/log/List')

Vue.use(Router)
let routeNmae = en.routeNmae
let defaultRouter = [
  { path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    iconCls: 'fa fa-dashboard', // 图标样式class
    name: routeNmae.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard', // 图标样式class
        name: '主页',
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  },
]

let addRouter = [

  /*博客管理*/
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'blog',
    component: Layout,
    children: [
      {
        path: '/blogList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'blogList',
        component: blogList,
        children: []
      },
      {
        path: '/editBlog',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'editBlog',
        component: editBlog,
        children: []
      }
    ]
  },
  /*分类管理*/
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'catalog',
    component: Layout,
    children: [
      {
        path: '/catalogList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'catalogList',
        component: catalogList,
        children: []
      },
    ]
  },
  /*友链管理*/
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'link',
    component: Layout,
    children: [
      {
        path: '/linkList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'linkList',
        component: linkList,
        children: []
      },
    ]
  },
  /*用户管理*/
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'user',
    component: Layout,
    children: [
      {
        path: '/userList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'userList',
        component: userList,
        children: []
      },
    ]
  },
  /*点赞管理*/
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'vote',
    component: Layout,
    children: [
      {
        path: '/voteList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'voteList',
        component: voteList,
        children: []
      },
    ]
  },
  /*评论管理*/
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'comment',
    component: Layout,
    children: [
      {
        path: '/commentList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'commentList',
        component: commentList,
        children: []
      },
    ]
  },
  /*日志管理*/
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'log',
    component: Layout,
    children: [
      {
        path: '/logList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'logList',
        component: logList,
        children: []
      },
    ]
  },
  { path: '*',
    redirect: '/404',
    hidden: true,
    children: []
  },

]
export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
