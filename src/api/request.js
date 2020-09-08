// eslint-disable-next-line no-unused-vars
import router from '@/router'
import axios from 'axios'
// import store from '@/store'
import { remove } from 'lodash'
import { Message, MessageBox, Loading } from 'element-ui'
import { getToken } from '@/utils/auth'
import { parseTime } from './index'
import sign from '@/utils/sign'
import _config from '@/config'
import { realDeepClone } from '@/utils'

const _env = process.env.NODE_ENV
const MINI_TIME = 500
const _requests = []
let _timer = null
let _random = {}
let loading = null
let isloading = false
let url = ''
let isHasConfirm = false

function log(msg) {
  if (_env === 'development') {
    console.log(msg)
  }
}
function pushRequest(config) {
  log(`${config.url}--begin`)
  _requests.push(config)
  isloading = true
  loading = Loading.service({ fullscreen: true, spinner: 'el-icon-loading' })
}

function popRequest(config) {
  log(`${config.url}--end`)
  remove(_requests, r => {
    return r === config
  })
  if (!_requests.length) {
    setTimeout(() => {
      // url有get时不需要loading，判断loading存在再关闭
      if (isloading) {
        loading.close()
        isloading = false
      }
    }, 300)
  }
}
// 创建axios实例
const service = axios.create({
  baseURL: _config.baseUrl, // api的base_url
  timeout: 30000 // 请求超时时间
})
const config = config => {
  if (!config.params) {
    config.params = {}
  }
  const token = getToken()
  if (token) config.params.tokenId = token
  config.params.requestTime = parseTime(new Date())
  config.params.account = 'zuimei'
  sign(config.params, config.data, 'verifyInfo')
  // 打开全局loading
  url = config.url
  _random = { stamp: Date.now(), url: url }
  const isGetUrl = url.indexOf('/get') !== -1 // get数据请求小于时间数不加loading层
  _timer = setTimeout(
    () => {
      // 超过定义的请求时间时把random塞入config
      config.random = _random
      pushRequest(_random)
    },
    isGetUrl ? MINI_TIME : 0
  )
  config.timer = _timer
  return config
}

// request拦截器
service.interceptors.request.use(config, error => {
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    // 如果请求结束还未进入timer，直接删除定时器，让请求不走loading
    clearTimeout(response.config.timer)
    // 请求结束时判断定时器是否走完，走完即存在random，删除random
    if (response.config.random) {
      popRequest(response.config.random)
    }
    const res = response.data
    if (res.status !== 0) {
      if (res.status === 401) {
        if (isHasConfirm) return false
        isHasConfirm = true
        MessageBox.alert('暂无权限,请联系管理员!', {
          callback: () => {
            // 当前打开无权限的是否为弹窗
            const authDialog = window.authDialog
            if (authDialog) {
              MessageBox.close()
              authDialog.cancel()
            } else {
              window.history.back()
            }
            isHasConfirm = false
          }
        })
      } else if (res.content !== '方案不存在') {
        Message({
          message: res.content,
          type: 'error',
          showClose: true,
          duration: 5 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      if (response.config.url === '/api/systemApi/channelCinemaPlan/getCinemaPlanPageList') {
        return res
      }
      if (res.count !== undefined) {
        return res
      }
      return res.data
    }
  },
  error => {
    console.log('error', error)
    Message({
      message: error.content || '未知异常',
      type: 'error',
      showClose: true,
      duration: 5 * 1000
    })
    // 非200时，也要删除对应请求
    clearTimeout(_timer)
    // 出现接口报错的时候，直接关闭loading
    _requests.splice(0)
    popRequest(_random)
    return Promise.reject(error)
  }
)
export default service
const fetch = ({ url, params, method = 'POST', isSys = true } = {}) => {
  const _url = isSys ? `/systemApi${url}` : url
  const postParams =
    Object.prototype.toString.call(params) === '[Object Object]' ? realDeepClone(params) : params
  const _params = method === 'POST' ? postParams : { params }
  const _method = method.toLocaleUpperCase() === 'POST' ? 'post' : 'get'
  return service[_method](_url, _params)
}
export { fetch }
