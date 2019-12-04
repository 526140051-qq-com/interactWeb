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
                  <div class="tab">管理员登录</div>
                </div>
                <div class="box-content">
                  <div class="admin">
                    <el-form ref="form" :model="form">
                      <el-form-item>
                        <el-input
                          @keyup.enter.native="doLogin"
                          placeholder="请输入账号"
                          v-model.trim="form.username"
                          clearable>
                        </el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-input
                          type="password"
                          @keyup.enter.native="doLogin"
                          placeholder="请输入密码"
                          v-model.trim="form.pwd"
                          clearable>
                        </el-input>
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
  import {postNoToken} from 'common/js/util'

  export default {
    data() {
      return {
        form: {
          username: '',
          pwd: ''
        },
        loading: false
      }
    },
    methods: {
      doLogin() { // 登录
        let {username, pwd} = this.form
        if (!username) {
          this.$toast('请输入账号')
          return
        }
        if (!pwd) {
          this.$toast('请输入密码')
          return
        }
        if (!this.loading) {
          this.loading = true
          this.$loading.show('登录中...')
          postNoToken(api.login, {
            username,
            pwd
          }).then(res => {
            if (res.code === ERR_OK) {
              this.goPage(res.data)
            } else {
              this.$toast(res.message)
            }
            this.$loading.hide()
            this.loading = false
          })
        }
      },
      goPage(user) {
        saveUser(user)
        this.doJump()
      },
      doJump() { // 登录后跳转
        setTimeout(() => {
          this.$loading.hide()
          this.$router.replace('/ads')
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
