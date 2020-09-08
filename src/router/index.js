import Vue from 'vue'
import Router from 'vue-router'
// import { lazyComponent } from '@/utils/files'
// import layoutComponent from '@/views/layout'
// import store from '@/store'
// import { getToken } from '@/utils/auth' // getToken from cookie
// import { Message } from 'element-ui'
// // import commonRouter from './src/common'
// // import oldRoutes from './oldRoutes'
import newRoutes from './src'
Vue.use(Router)

const loginUrl = window.localStorage.getItem('hash') || '/login/index' // 不做总入口地址,平台和用户各用个的 , 登录时候保存入口锚点
export const constantRouterMap = [
  ...newRoutes,
  { path: '/login', redirect: loginUrl },
  {
    path: '/login/:operType',
    // component: lazyComponent('user/login'),
    hidden: true,
    props: true
  }
  // { path: '/404', component: lazyComponent('404'), hidden: true }
]
const newRouter = new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// const whiteList = [
//   '/login',
//   '/authredirect',
//   '/login/index',
//   '/login/platform',
//   '/login/mall'
//   // 'chanelSchedules'
// ] // no redirect whitelist

newRouter.beforeEach((to, from, next) => {
  // if (getToken()) {
  //   // determine if there has token
  //   /* has token*/
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //   } else {
  //     if (!store.getters.name) {
  //       // 判断当前用户是否已拉取完user_info信息
  //       store
  //         .dispatch('GetInfo')
  //         .then(_ => {
  //           // 拉取user_info
  //           next({ ...to, replace: true })
  //         })
  //         .catch(err => {
  //           store.dispatch('FedLogOut').then(() => {
  //             Message.error(err || 'Verification failed, please login again')
  //             next({ path: '/login' })
  //           })
  //         })
  //     } else if (store.getters.menus.length === 0) {
  //       // 判断当前用户是否已拉取完user_info信息
  //       store
  //         .dispatch('GetMenu')
  //         .then(res => {
  //           // 拉取user_info
  //           const menus = store.getters.menus // note: roles must be a array! such as: ['editor','develop']
  //           store.dispatch('GenerateRoutes', { menus }).then(() => {
  //             // 根据roles权限生成可访问的路由表
  //             // ...commonRouter,
  //             const _addRoutes = [...store.getters.addRouters]
  //             // if (process.env.NODE_ENV === 'development') _addRoutes.concat([...work, ...setting])
  //             const appRouter = [
  //               {
  //                 path: '/',
  //                 name: 'app',
  //                 meta: { title: 'app' },
  //                 // component: layoutComponent,
  //                 hidden: true,
  //                 children: _addRoutes
  //               }
  //             ]
  //             newRouter.addRoutes(appRouter) // 动态添加可访问路由表
  //             next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
  //           })
  //         })
  //         .catch(err => {
  //           store.dispatch('FedLogOut').then(() => {
  //             Message.error(err || 'Verification failed, please login again')
  //             next({ path: '/login' })
  //           })
  //         })
  //     } else {
  //       // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        next()
  //     }
  //   }
  // } else {
  //   /* has no token*/
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     next('/login') // 否则全部重定向到登录页
  //   }
  // }
})
export default newRouter
// export const asyncRouterMap = oldRoutes.concat(newRoutes)
export const asyncRouterMap = newRoutes
