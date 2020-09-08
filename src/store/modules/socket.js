import router from '../../router'

const type = {
  MESSAGE_COUNT: 'MESSAGE_COUNT',
  MESSAGE: 'MESSAGE',
  PLAN_SPEED: 'PLAN_SPEED',
  SUB_MENU: 'SUB_MENU',
  CUR_NAV_IDX: 'CUR_NAV_IDX'
}
export default {
  state: {
    message: {},
    messageCount: 0,
    planSpeed: 0,
    subMenu: [],
    curNavIdx: 0
  },
  actions: {
    setMessageCount({ commit }, data) {
      commit(type.MESSAGE_COUNT, data)
    },
    setMessage({ commit }, data) {
      commit(type.MESSAGE, data)
    },
    setPlanSpeed({ commit }, data) {
      commit(type.PLAN_SPEED, data)
    },
    // 设置侧边菜单
    setSubMenu({ commit }, data) {
      commit(type.SUB_MENU, data)
    },
    // 设置菜单索引
    setCurNavIdx({ commit }, data) {
      commit(type.CUR_NAV_IDX, data)
    },
    // 跳转路由
    toLinkRouter({ commit }, path) {
      function findNav(list) {
        const navIdx = list.findIndex(i => i._path === path)
        if (navIdx > -1) {
          return navIdx
        } else {
          return list.findIndex((i, idx) => {
            if (i.children) {
              return findNav(i.children) > -1
            }
          })
        }
      }
      const menuList = this.state.user.menus
      const navIdx = findNav(menuList)
      if (navIdx !== undefined) {
        this.commit('DEL_ALL_VIEWS')
        commit(type.SUB_MENU, menuList[navIdx].children)
        commit(type.CUR_NAV_IDX, navIdx)
        router.push(path)
      }
    }
  },
  mutations: {
    [type.MESSAGE_COUNT]: (state, count) => {
      state.messageCount = count
    },
    [type.MESSAGE](state, message) {
      state.message = message
    },
    [type.PLAN_SPEED](state, speed) {
      state.planSpeed = speed
    },
    SUB_MENU: (state, subMenu) => {
      state.subMenu = subMenu
    },
    CUR_NAV_IDX: (state, curNavIdx) => {
      state.curNavIdx = curNavIdx
    }
  }
}
