<template>
  <div class="main">
    <div class="login">
      <div class="body">
        <div class="body-wrap">
          <el-container>
            <el-header class="clearfix">
              <div class="header-container">
                <div class="left">
                  <span>王炸管理后台</span>
                </div>
              </div>
            </el-header>
            <el-main class="main-container">
              <div class="box">
                <div class="box-tab">
                  <div class="tab">{{title}}</div>
                </div>
                <div class="box-content">
                  <div class="admin">
                    <el-form ref="form" :model="form">
                      <el-form-item>
                        <el-input
                          type="number"
                          oninput="if(value.length>11)value=value.slice(0,11)"
                          @keyup.enter.native="doLogin"
                          placeholder="请输入手机号"
                          v-model.trim="form.phone"
                          clearable>
                        </el-input>
                      </el-form-item>
                      <el-form-item>
                        <div class="code-container">
                          <div class="code">
                            <el-input
                              type="number"
                              oninput="if(value.length>6)value=value.slice(0,6)"
                              @keyup.enter.native="doLogin"
                              placeholder="请输入验证码"
                              v-model.trim="form.code"
                              clearable>
                            </el-input>
                          </div>
                          <el-button :disabled="!sendClick" type="text" class="send-code" @click="getCode">{{codeTxt}}
                          </el-button>
                        </div>
                      </el-form-item>
                      <div class="login-btn" @click="doLogin" :loading="loading">登录</div>
                    </el-form>
                  </div>
                </div>
              </div>
            </el-main>
          </el-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'
  import {saveUser} from 'common/js/cache'
  import {checkPhone, postNoToken} from 'common/js/util'

  export default {
    data() {
      return {
        form: {
          schoolName: '',
          managerName: '',
          phone: '',
          code: '' // 验证码
        },
        loading: false,
        codeTxt: '获取验证码',
        codeTime: 60, // 60秒倒计时
        sendClick: true, // 发送验证码开关
        title: '管理员登录'
      }
    },
    destroyed() {
      this.clearTimer()
    },
    methods: {
      getCode() { // 点击获取验证码
        let {phone} = this.form
        if (!phone) {
          this.$toast('请输入手机号')
          return
        }
        if (!checkPhone(phone)) {
          this.$toast('手机号格式不正确')
          return
        }
        if (this.sendClick) {
          this.sendClick = false
          this.sendMessage()
          this.countTimer()
        }
      },
      sendMessage() { // 发送短信验证码
        postNoToken(api.sendMessage, {
          phone: this.form.phone
        }).then((res) => {
          if (res.code === ERR_OK) {
            this.$toast(res.message, 'success')
          }
        })
      },
      countTimer() { // 倒计时
        this.timer = setInterval(() => {
          if (this.codeTime > 0) { // 倒计时没结束
            this.codeTime--
            this.codeTxt = `${this.codeTime}s`
          } else { // 倒计时结束
            this.resetTimer()
          }
        }, 1000)
      },
      resetTimer() { // 重置定时器
        this.clearTimer()
        this.sendClick = true
        this.codeTxt = '获取验证码'
        this.codeTime = 60
      },
      clearTimer() { // 清理定时器
        clearInterval(this.timer)
      },
      doLogin() { // 登录
        let {phone, code} = this.form
        if (!phone) {
          this.$toast('请输入手机号')
          return
        }
        if (!checkPhone(phone)) {
          this.$toast('手机号格式不正确')
          return
        }
        if (!code) {
          this.$toast('请输入验证码')
          return
        }
        if (this.sendClick) {
          this.$toast('请点击获取验证码')
          return
        }
        if (!this.loading) {
          this.loading = true
          this.$loading.show('登录中...')
          postNoToken(api.login, {
            phone,
            code
          }).then((res) => {
            if (res.code === ERR_OK) {
              this.goPage(res.data)
            }
            this.$loading.hide()
            this.loading = false
          })
        }
      },
      async goPage(user) {
        saveUser(user)
        this.doJump()
      },
      doJump() { // 登录后跳转
        setTimeout(() => {
          this.$loading.hide()
          this.$router.replace('/notice')
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .login
    .body
      width: 100%
      height: 100vh
      background-image: url(./bg.jpg)
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      overflow: hidden
      .body-wrap
        height: 100%
        display: flex
        justify-content: center
        /*align-items: center*/
        .el-header
        //background-color: #B3C0D1
          background-color: rgba(64, 64, 64, 1)
          color: #333
          line-height: 60px
          .header-container
            margin 0 auto
            width 70%
            display flex
            .left
              color #fff
              span
                font-size 17px
                font-weight 600
            .right
              padding-right: 5px
              margin-left auto
              color: $color
              cursor: pointer
              .el-dropdown-link
                a
                  color #fff

        .main-container
          display flex
          align-items center
        .box-name
          font-size: 36px
          font-weight: bold
          letter-spacing: 3px
          color: #636363
          line-height: 50px
          margin-bottom: 70px
          text-align: center
        .box
          position: relative
          top: -5px
          left: -1px
          width: 410px
          border: 1px solid #e8e8e8
          border-radius: 15px
          background: #fff
          overflow: hidden
          margin: 0 auto
          box-shadow: 0 2px 18px 0 rgba(147, 147, 147, 0.5)
          .box-tab
            height: 64px
            font-size: 18px
            color: $color-green
            overflow: hidden
            border-bottom: 1px solid #e8e8e8
            display: flex
            .tab
              flex: 1
              line-height: 60px
              text-align: center
              border-bottom: 4px solid transparent
          .box-content
            .admin
              padding: 40px
              .code-container
                display: flex
                flex-direction: row
                .code
                  flex: 1
                  margin-right: 5px
                .send-code
                  width: 100px
                  cursor: pointer
              .login-btn
                text-align: center
                color: #fff
                width: 100%
                font-size: 16px
                padding: 14px 20px
                background-color: $color-green
                border-color: $color-green
                border-radius: 5px
                cursor: pointer
                transition: all .3s
                &:hover
                  background-color: $color-green-hover
                  border-color: $color-green-hover
              .hint
                text-align: center
                font-size: 13px
                line-height: 20px
                margin-top: 15px
                a
                  cursor: pointer
                  color: $color-green
                  text-decoration: underline

  /deep/ .el-input__inner
    height: 46px
    line-height: 46px

  /deep/ .el-button--text
    color: $color-green

  /deep/ .el-input__inner:focus
    border-color: $color-green
</style>
