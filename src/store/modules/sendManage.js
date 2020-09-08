const type = {
  ACTIVENAME_TAB: 'ACTIVENAME_TAB'
}
export default {
  state: {
    activeNameTab: ''
  },
  mutations: {
    [type.ACTIVENAME_TAB]: (state, tab) => {
      state.activeNameTab = tab
    }
  },
  actions: {
    changeTypeX({ commit }, tab) {
      commit(type.ACTIVENAME_TAB, tab)
    }
  }
}
