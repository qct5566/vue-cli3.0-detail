
const filters = {
  // 将 ‘1,2,3’ 过滤成 3
  getStrArraylen(value, key = ',') {
    if (typeof value === 'string') {
      const len = value.split(key).filter(i => i).length
      return len
    }
    return 0
  },

  getTypeName(v, Type, valueKey = 'value', labelKey = 'label') {
    if (Type instanceof Array) {
      const item = Type.find(i => i[valueKey] === v)
      if (item) {
        return item[labelKey]
      }
    }
    return v
  },

  toTime(v) {
    return v + ''.slice(0, 10)
  }

}

export default {
  install(vue, options) {
    console.log('filters-options', options)
    for (const key in filters) {
      vue.filter(key, filters[key])
    }
  }
}

