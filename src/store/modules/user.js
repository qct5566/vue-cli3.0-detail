// import { login, logout, getInfo, getMenu } from '@/api/user'
/* eslint-disable */
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId } from '@/utils/auth'

// import router from '@/router'
// import md5 from 'js-md5'
const user = {
  state: {
    userId: getUserId(),
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menus: [],
    type: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 登录
    Login({ commit, dispatch, rootState, state }, userInfo) {
      // const username = userInfo.username.trim()
      // return login(username, userInfo.password, userInfo.type).then(response => {
      //   const data = response
      //   setToken(data.tokenId)
      //   setUserId(data.id)
      //   commit('SET_TOKEN', data.tokenId)
      //   commit('SET_NAME', data.realName)
      //   commit('SET_USER_ID', data.id)
      //   commit('SET_ROLES', data.roles)
      //   dispatch('GetInfo')
      // })
    },

    // 获取用户信息
    GetInfo({ commit, dispatch, rootState, state }) {
      // return getInfo().then(response => {
      //   const data = response
      //   commit('SET_TOKEN', data.tokenId)
      //   commit('SET_NAME', data.realName)
      //   commit('SET_USER_ID', data.id)
      //   commit('SET_AVATAR', data.headImg)
      //   commit('SET_TYPE', data.type)
      //   return response
      // })
    },

    // 获取菜单
    GetMenu({ commit, dispatch, rootState, state }) {
      // return getMenu().then(response => {
      //   commit('SET_MENUS', response)
      //   if (response.length <= 0) {
      //     return Promise.reject('没有相关菜单权限')
      //   }
      //   return response
      // })
    },

    // 登出
    LogOut({ commit, state }) {
      // return logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   commit('SET_MENUS', [])
      //   removeToken()
      //   removeUserId()
      // })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      // return new Promise(resolve => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   commit('SET_MENUS', [])
      //   removeToken()
      //   removeUserId()
      //   resolve()
      // })
    }
  }
}

export default user
