import Sortable from 'sortablejs';
export default {
  data() {
    return {
      sortable: null
    };
  },
  methods: {
    // list 需要拖动的数组，element需要拖拽的父级层，index父级层遍历出来时定位父级层（默认配置用，其他配置传element）
    // darpClass 拖动项类名，disabled 禁用排序（并没有什么卵用，可能要设置sort为true）
    // drapCallback 拖动结束后需要执行的方法,外部定义
    setSort({ list, element, index, darpClass, disabled = false, obj = this, listKey }) {
      // if (this.sortable) return;
      this.$nextTick(() => {
        const el = element || document.querySelectorAll(
           '.drap-table .el-table__body-wrapper > table > tbody'
        )[0].children[index + 1].firstChild;
        // const that = this;
        this.sortable = new Sortable(el, {
          draggable: darpClass || '.darp-item',
          ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
          handle: darpClass || '.darp-item', // 需要禁用时取消节点上的class
          disabled: disabled,
          setData: function(dataTransfer) {
            dataTransfer.setData('Text', '');
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          onEnd: evt => {
            console.log('list111', list)
            console.log('evt', evt);
            const nIndex = evt.newIndex;
            const oIndex = evt.oldIndex;
            if (nIndex === oIndex) return;
            const $li = el.children[nIndex];
            const $oldLi = el.children[oIndex];
            // VUE2.0之后，根本原因是Virtual DOM和真实DOM之间出现了不一致，导致拖拽有问题，最直接的方法设置v-for的key
            // 先删除移动的节点
            el.removeChild($li);
            // 再插入移动的节点到原有节点，还原了移动的操作
            if (nIndex > oIndex) {
              el.insertBefore($li, $oldLi);
            } else {
              el.insertBefore($li, $oldLi.nextSibling);
            }
            const oldList = JSON.parse(JSON.stringify(list));
            const listTemp = oldList.slice(0);
            const targetRow = listTemp.splice(oIndex, 1)[0];
            listTemp.splice(nIndex, 0, targetRow);
            list.splice(0);
            listTemp.forEach(e => {
              list.push(e);
            });
            if (obj && listKey) this.$set(obj, listKey, list)
            if (this.drapCallback) this.drapCallback();
          }
        });
      });
    }
  }
};
