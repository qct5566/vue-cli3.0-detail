const type = {
  PORGRAM_ADD: 'PORGRAM_ADD',
  PORGRAM_DEL: 'PORGRAM_DEL'
};
// 页面中有添加删除子方案动作，添加一条对应的结果，父分组删除后，一起删
export default {
  state: {
    programmObj: {
      // id:{
        //   id:'',
      //     isEdit:false,
      //     startList:[],
      //     programList:[]
      // }
    } // key存id
  },
  actions: {
    addProgram({ commit }, data) {
      commit(type.PORGRAM_ADD, data);
    },
    deleteProgram({ commit }, id) {
      commit(type.PORGRAM_DEL, id);
    }
  },
  mutations: {
    // 添加key
    [type.PORGRAM_ADD]: (state, obj) => {
      state.programmObj[obj.id] = obj
    },
    // 删除key
    [type.PORGRAM_DEL]: (state, id) => {
      delete state.programmObj[id];
    }
  }
};
