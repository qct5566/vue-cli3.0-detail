import {
  mapGetters
} from 'vuex'
import {
  getToken
} from '@/utils/auth'

import config from '@/config'
export default {
  data() {
    return {
      webSock: null,
      connectTime: 0,
      user: {
        name: 'agan',
        address: '福州'
      },
      timeout: 70000, // 心跳时长--默认70秒
      timeoutObj: null,
      serverTimeoutObj: null
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created() {},
  methods: {
    initWebSocket() {
      try {
        if ('WebSocket' in window) {
          // 初始化weosocket
          this.webSock = new WebSocket(config.webSocketUrl)
          this.webSock.onmessage = this.webSocketOnMessage
          this.webSock.onopen = this.webSocketOnOpen
          this.webSock.onerror = this.webSocketOnError
          this.webSock.onclose = this.webSocketClose
          this.connectTime++
        } else {
          this.$comfirm('您的浏览器不支持WebSocket!', 'warning')
        }
      } catch (e) {
        this.webSocketOnError()
      }
    },
    webSocketOnOpen(e) {
      // 连接建立之后执行send方法发送数据
      this.heartCheckReset() // 执行心跳
      console.log(this.webSock.readyState)
      console.log('webSocket链接成功！', e)
      this.webSocketSend({})
    },
    webSocketOnError(e) {
      // 连接建立失败重连
      console.log('error', e)
      if (this.connectTime < 5) {
        setTimeout(() => {
          this.initWebSocket()
        }, 12000)
      } else {
        this.connectTime = 0
        this.$message({
          showClose: true,
          message: '已经尝试5次连接webSocket，都失败了!',
          type: 'error'
        })
      }
    },
    webSocketOnMessage(e) {
      this.heartCheckReset() // 获取心跳响应后重置并进行下一轮心跳
      console.log('接收到的数据', e) // JSON.parse(e.data)
    },
    webSocketSend(data) {
      // 数据发送
      const tokenId = this.token || getToken()
      console.log('tokenId', tokenId)
      if (tokenId) {
        this.webSock.send(JSON.stringify({
          tokenId: tokenId,
          ...data
        }))
      } else {
        setTimeout(() => {
          this.webSocketSend(data)
        }, 3000)
      }
    },
    webSocketClose(e) {
      // 关闭
      console.log(`断开连接${this.connectTime}`, e)
      // this.webSock.close()
      // this.webSocketOnError()
    },
    heartCheckStart() {
      const that = this
      this.timeoutObj = setTimeout(function() {
        // 发送一个心跳，后端收到后，返回一个心跳消息，
        // onmessage拿到返回的心跳就说明连接正常
        that.webSocketSend({})
        console.log('ping!')
        that.serverTimeoutObj = setTimeout(function() { // 如果超过一定时间还没重置，说明后端主动断开了
          that.webSock.close() // 如果onclose执行重连，则仅执行ws.close().若直接执行重连 会触发onclose导致重连两次
        }, that.timeout)
      }, that.timeout)
    },
    heartCheckReset() {
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      setTimeout(() => {
        this.heartCheckStart()
      }, 0)
    }
  }
}
