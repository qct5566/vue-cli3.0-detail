export default {
  data() {
    return {
      tableParams: {
        count: 0,
        page: 1,
        pageSize: 10,
        data: [],
        selectList: [],
        isCheckBoxClick: false // 点击复选框标示
      },
      pk: 'id',
      advancedSearchVisible: false
    };
  },
  computed: {
    _tableSelectedIds() {
      const res = this.tableParams.selectList.map(item => item[this.pk]);
      return res;
    }
  },
  methods: {
    assignQuery(query) {
      return {
        page: this.tableParams.page,
        pageSize: this.tableParams.pageSize,
        ...query
      };
    },
    onSearch() {
      this.clearSelection();
      this.$set(this.tableParams, 'page', 1);
      this.loadList && this.loadList();
    },
    onReset() {
      if (this.$refs.searchForm) {
        this.$refs.searchForm.resetFields();
        if (this.onRangeChange && typeof this.onRangeChange === 'function') {
          this.rangeTime = [];
          this.onRangeChange([]);
        }
        if (this.areaValue && Object.keys(this.areaValue).length) {
          this.areaValue = {};
        }
        this.onSearch();
      }
    },
    // handleSelectionChange () {
    //   let table = this.$refs.zmTabel.getTable
    //   this.tableParams.selectList = table.selection
    // },
    initialTableData(dataList, totalCount) {
      const tableParams = this.tableParams;
      tableParams.count = totalCount;
      this.$set(this.tableParams, 'data', Object.freeze(dataList));
      // 删除非第一页最后一项时，重新加载上一页数据，否则会造成表格空数据
      if (!dataList.length && this.tableParams.page > 1) {
        this.tableParams.page--;
        this.loadList && this.loadList();
      }
    },
    /**
     * 获取table组件的引用
     */
    getTableRef() {
      return this.$refs.zmTable || this.$refs.multipleTable;
    },
    /**
     * 获取表格选中列的数组
     */
    getTableSelection() {
      const table = this.getTableRef();
      if (table) {
        return table.getSelectionsList();
      }
      return [];
    },
    /**
     * 清除表格选中列的数组
     */
    clearSelection() {
      const table = this.getTableRef();
      if (this.tableParams.selectList.length) this.tableParams.selectList = [];
      if (table) table.clearSelection();
    },
    getSelectionIds(isNoEl, idName) {
      const tableSelection = this.getTableSelection();
      const handlerIds = [];
      const id = idName || 'id';
      tableSelection.forEach(item => {
        handlerIds.push(item[id]);
      });
      return handlerIds;
    },
    // 展开收缩某一行
    toggleRowExpansion(row, expanded) {
      const table = this.getTableRef();
      if (table) {
        table.toggleRowExpansion(row, expanded);
      }
    },
    onAdvancedQuery() {
      this.advancedSearchVisible = true;
    },
    onAdvancedQueryCancel(params, obj) {
      this.advancedSearchVisible = false;
    },
    onAdvancedQuerySearch(params, obj) {
      this.advancedSearchVisible = false;
      // 用高级搜索的params覆盖参数
      // if (this.resetParams && typeof this.resetParams === 'function') {
      //   this.resetParams(params, obj)
      // }
      this.onSearch();
    },
    getSelects(e) {
      this.tableParams.selectList = e;
    }
  }
};
