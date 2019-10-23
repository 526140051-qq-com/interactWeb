import axios from 'common/js/axios'
import {getUser, getToken, saveToken, saveExpireTime, getExpireTime} from 'common/js/cache'
import api from 'common/js/api'
import router from '@/router'
import {Message} from 'element-ui'

let tokenLock = false
let tokenTime = 0
const EXPIRETIME = 3600000 // 设置过期时间1小时

/**
 * axios封装post请求
 * @url url
 * @params 参数
 * 无需验证获取token
 */
function postNoToken(url, params = {}) {
  return new Promise((resolve, reject) => {
    const user = getUser()
    if (user) params.loginId = user.id
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err.data)
      })
  })
}

/**
 * axios封装post请求
 * @url url
 * @params 参数
 */
function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    const user = getUser()
    if (user && !params.loginId) params.loginId = user.id
    // 上一次设置更新token时间
    let expireTime = getExpireTime()
    // 当前时间
    let nowTime = new Date().getTime()
    let overTime = nowTime - expireTime
    // 上一次设置更新token时间不存在或超时了（1小时）
    if (!expireTime || overTime > EXPIRETIME) {
      if (!expireTime) saveExpireTime(new Date().getTime())
      checkToken().then(() => {
        axios.post(url, params)
          .then(res => {
            resolve(res.data)
          }, err => {
            reject(err.data)
          })
      })
    } else {
      axios.post(url, params)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err.data)
        })
    }
  })
}

/**
 * 检查token是否过期
 */
function checkToken() {
  return new Promise((resolve) => {
    // 正在请求更新token时，其他接口等待
    if (tokenLock && tokenTime < 30) {
      setTimeout(function () {
        tokenTime++
        checkToken().then(resolve)
      }, 500)
    } else if (tokenTime > 60) { // 500*60是30S，30s没有响应就直接跳登录页
      Message({
        message: '页面已过期，请重新登录',
        type: 'error',
        duration: 3000,
        onClose: () => {
          const user = getUser()
          if (user && user.type === 1) { // 家长
            router.push('/')
          } else {
            router.push('/login')
          }
        }
      })
    } else {
      tokenLock = true
      let expireTime = getExpireTime()
      let nowTime = new Date().getTime()
      let overTime = nowTime - expireTime
      // 前端做token过期时间判断（1小时后更新token）
      if (overTime > EXPIRETIME) {
        updateToken(resolve)
      } else {
        axios.post(api.checkToken, {
          token: getToken()
        }).then(res => {
          // true 未过期,服务器设置的token未过期
          if (res.data.data) {
            tokenLock = false
            tokenTime = 0
            resolve()
          } else { // 更新token
            updateToken(resolve)
          }
        })
      }
    }
  })
}

/**
 * 更新token
 */
function updateToken(resolve) {
  axios.post(api.getToken, {
    userId: getUser().id
  }).then(res => {
    tokenLock = false
    tokenTime = 0
    saveToken(res.data.data)
    saveExpireTime(new Date().getTime())
    resolve()
  })
}

/*
 * 验证手机号
 */
function checkPhone(str) {
  const reg = /^(0|86|17951)?(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/
  if (reg.test(str)) {
    return true
  } else {
    return false
  }
}

export {
  postNoToken,
  post,
  checkPhone
}
