import storage from 'good-storage'

const TOKEN_KEY = '__token__'
const USER_KEY = '__user__'
const PATH_KEY = '__path__'
const TIME_KEY = '__time__'

// 保存token
export function saveToken(data) {
  storage.session.set(TOKEN_KEY, data)
}

// 获取token
export function getToken() {
  const token = storage.session.get(TOKEN_KEY, '')
  return token
}

// 保存管理员信息
export function saveUser(data) {
  storage.session.set(USER_KEY, data)
}

// 获取管理员信息
export function getUser() {
  let user = storage.session.get(USER_KEY, {})
  if (!user.id) {
    return false
  }
  return user
}

// 管理员退出登录
export function clearUser() {
  storage.session.remove(USER_KEY)
}

// 保存path
export function savePath(path) {
  storage.session.set(PATH_KEY, path)
}

// 获取path
export function getPath() {
  const path = storage.session.get(PATH_KEY, '')
  return path
}

// 保存token时间
export function saveExpireTime(time) {
  storage.session.set(TIME_KEY, time)
}

// 获取token时间
export function getExpireTime() {
  const time = storage.session.get(TIME_KEY, '')
  return time
}

// 清空token时间
export function clearExpireTime() {
  storage.session.remove(TIME_KEY)
}
