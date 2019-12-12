export default {
  login: '/adminManager/login', // 园长登录
  uploadFile: '/user/uploadFile', // 园长登录
  selectAdvertisement: '/adminManager/selectAdvertisement', // 广告查询
  addAdver: '/adminManager/addAdver', // 新增广告
  deleteAdverById: '/adminManager/deleteAdverById', // 删除广告
  selectAdverById: '/adminManager/selectAdverById', // 根据广告ID查询详情
  editAdver: '/adminManager/editAdver', // 广告编辑
  findCharge: '/user/findCharge', // 查询门票
  updateCharge: '/gift/updateCharge', // 编辑门票
  findGift: '/gift/findGift', // 礼物查询
  addGift: '/gift/addGift', // 礼物新增
  selectGiftById: '/adminManager/selectGiftById', // 根据礼物ID查询详情
  updateGift: '/gift/updateGift', // 礼物编辑
  getPayLogs: '/order/getPayLogs', // 查看支付记录列表
  downPayLogs: '/order/downPayLogs', // 导出支付记录列表
  revenueLog: '/user/revenueLog', // 房间收入
  giftLog: '/user/giftLog', // 礼物收入
  findVideoUrl: '/gift/findVideoUrl', // 查询首页视频
  addVideoUrl: '/gift/addVideoUrl', // 新增首页视频
  deleteVideoUrl: '/gift/deleteVideoUrl', // 删除首页视频
  selectVideoUrlById: '/adminManager/selectVideoUrlById', // 根据首页视频ID查询详情
  updateVideoUrl: '/gift/updateVideoUrl', // 编辑首页视频
  selectByKey: '/user/selectByKey', // 平台设置查询
  updateSetting: '/user/updateSetting', // 设置平台设置
  findWithdraw: '/withdraw/findWithdraw', // 提现记录
  selectGiveGiftLogPager: '/gift/selectGiveGiftLogPager', // 查看送出礼物记录
  finishWithdraw: '/withdraw/finishWithdraw', // 付款（完成提现）
  findUser: '/gift/findUser', // 用户查询
  setUserState: '/user/setUserState' // 账号状态1.冻结、2.解冻
}
