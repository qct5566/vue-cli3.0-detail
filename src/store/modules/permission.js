import { asyncRouterMap, constantRouterMap } from '@/router'
import { Message } from 'element-ui'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param menuList
 */

function filterRouter(asyncRouterMap) {
  const filterRouterList = asyncRouterMap.map(route => {
    return {
      ...route,
      path: route._path || route.path,
      _path: route._path || route.path
    }
  })
  return filterRouterList
}

function combineMenus(asyncRouterMap, menuList) {
  function computMenus(asyncRouterMap, menuList) {
    menuList.forEach((menu, midx) => {
      if (menuList[midx].children && menuList[midx].children[0].position === '4') {
        delete menuList[midx].children
      }
      if (!menuList[midx].children) {
        const foundRouter = asyncRouterMap.find(
          route =>
            route._path &&
            (route._path === menu.menuUrl || route.name === menu.menuUrl)
        )
        menuList[midx] = {
          ...menuList[midx],
          ...foundRouter
        }
      } else {
        if (menuList[midx].menuUrl) {
          const nameList = menuList[midx].menuUrl.split('/')
          menuList[midx].name = nameList[nameList.length - 1]
        }
        computMenus(asyncRouterMap, menu.children)
      }
    })
  }

  computMenus(asyncRouterMap, menuList)
  return menuList
}

function findChildren(item) {
  if (item) {
    if (!item.children) {
      return item.menuUrl
    } else {
      return findChildren(item.children[0])
    }
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit, dispatch }, data) {
      return new Promise(resolve => {
        const { menus } = data
        const filterRouterList = filterRouter(asyncRouterMap)
        const filterMenus = combineMenus(filterRouterList, menus)
        // 空路由
        const firstMenuRoute = findChildren(menus[0])

        filterRouterList.push({ path: '', redirect: firstMenuRoute })
        filterRouterList.push({
          path: '*',
          hidden: true,
          beforeEnter: (to, from, next) => {
            // dispatch('FedLogOut')
            Message.error({
              message: `您没有访问权限页面:${to.fullPath}`,
              showClose: true
            })
            // next({ path: '/login' })
            next()
          }
        })
        commit('SET_MENUS', filterMenus)
        commit('SET_ROUTERS', filterRouterList)
        resolve()
      })
    }
  }
}

export default permission
