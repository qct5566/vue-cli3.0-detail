/**
 * Created by jiachenpan on 16/11/18.
 */
// import { Loading } from 'element-ui'

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object' && sourceProperty !== null) {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function cloneObject(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  Object.keys(target).forEach(property => {
    const sourceProperty = source[property]
    target[property] = sourceProperty
  })
  return target
}
// 无法递归到更深
export function deepClone(obj) {
  var proto = Object.getPrototypeOf(obj)
  return Object.assign({}, Object.create(proto), obj)
}
// 可以深层次拷贝
export function realDeepClone(sourceObj, targetObj) {
  let cloneObj = targetObj || {}
  if (!sourceObj || typeof sourceObj !== 'object') {
    return sourceObj
  }
  if (sourceObj.length) {
    cloneObj = sourceObj.map(e => {
      return realDeepClone(e)
    })
    return cloneObj
  }
  for (const i in sourceObj) {
    // if (sourceObj[i] && typeof sourceObj[i] === 'object' && sourceObj[i].length) {
    if (sourceObj[i] && typeof sourceObj[i] === 'object') {
      cloneObj[i] = realDeepClone(sourceObj[i], {})
    } else {
      cloneObj[i] = sourceObj[i]
    }
  }
  return cloneObj
}
export function split(arrStr, fix = ',') {
  const arr = arrStr.split(fix)
  return arr.filter(e => e !== '')
}

export function mergeArray(arr1, arr2, prop = 'value') {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (prop) {
        if (arr1[i]) {
          if (arr1[i][prop] === arr2[j][prop]) {
            arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
          }
        }
      } else {
        if (arr1[i] === arr2[j]) {
          arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
        }
      }
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i])
  }
  return arr1
}

export function mergeDiffArray(arr1, arr2, prop = 'value') {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (prop) {
        if (arr1[i]) {
          if (arr1[i][prop] === arr2[j][prop]) {
            arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
          }
        }
      } else {
        if (arr1[i] === arr2[j]) {
          arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
        }
      }
    }
  }
  return arr1
}

export function intersectArray(arr1, arr2, prop = 'value') {
  // 交集
  const arr3 = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (prop) {
        if (arr1[i]) {
          if (arr1[i][prop] === arr2[j][prop]) {
            arr3.push(arr1[i])
          }
        }
      } else {
        if (arr1[i] === arr2[j]) {
          arr3.push(arr1[i])
        }
      }
    }
  }
  return arr3
}

// 模糊查询下拉框回调参数
export async function getSelectValue(msg, params, val, val2, paramsChange) {
  this.$set(params, val, msg[0])
  if (val2) {
    this.$set(params, val2, msg[1])
  }
}

// 获取数组内所有id,并操作全选和反选
export function getCanChooseIds(list, isAll, idName) {
  const ids = []
  const newIdName = idName || 'value'
  Array.isArray(list) &&
    list.forEach(item => {
      if (isAll) ids.push(item[newIdName])
      if (typeof isAll === 'boolean') item.isAll = isAll
    })
  return ids
}

export const eachOwn = (obj, fn) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(obj[key], key, obj)
    }
  }
}

export const getModelName = (
  model,
  value,
  label = 'label',
  valueKey = 'value'
) => {
  if (model instanceof Array) {
    const item = model.find(i => i[valueKey] === value)
    if (item) {
      return item[label]
    }
    return ''
  }
  return ''
}

// obj1 的值覆盖到obj上 , （编辑表单时候用）
export const simpleExtented = (obj, obj1) => {
  // const o = JSON.parse(JSON.stringify(obj))
  const o = obj
  const o_key = Object.keys(o)
  o_key.forEach(el => {
    o[el] = obj1[el] || o[el]
  })
  return o
}

export const getTypeName = (
  v,
  Type,
  valueKey = 'value',
  labelKey = 'label'
) => {
  if (Type instanceof Array) {
    const item = Type.find(i => i[valueKey] === v)
    if (item) {
      return item[labelKey]
    }
  }
  return v
}

// 数组为空判断
export const judgeArrFill = value => {
  const noFill = value && value.filter(i => {
    const arr = Object.keys(i).filter(key => {
      return i[key] === null || i[key] === '' || i[key] === undefined
    })
    return arr.length > 0
  })
  return noFill
}

// 表格按钮，配合Zm-Table使用
export const getBtn = ({ txt, funType, h, row, index, params }) => {
  params = { ...params, clickFun: 'onOperateClick', btnType: 'text' }
  // params = { h, context,clickFun,btnType row, index, parent, parentIndex}
  /* txt 文字 必传
   * funType  方法类型 必传
   * h 元素 必传
   * clickFun 点击方法
   * context 组件的this
   * row 表格单项
   * index 表格下标
   * parent 当前父级（展开等功能使用）
   * parentIndex
   * txtSlot 修改文字*/
  return (
    <el-button
      disabled={params.disabled}
      type={params.btnType}
      onClick={() => params.context[params.clickFun](funType, row, index, params)}
    >{params.txtSlot || txt}</el-button>
  );
};
