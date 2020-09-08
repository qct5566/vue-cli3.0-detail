const type = {
    DETAIL_TAB: 'DETAIL_TAB'
}
export default {
    state: {
        detailTab: ''
    },
    mutations: {
        [type.DETAIL_TAB]: (state, tab) => {
            state.detailTab = tab
        }
    },
    actions: {
        setCurrentTab({ commit }, tab) {
            commit(type.DETAIL_TAB, tab)
        }
    }
}
