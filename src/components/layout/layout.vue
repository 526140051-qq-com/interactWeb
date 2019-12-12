<template>
  <div class="layout">
    <el-container>
      <el-aside width="220px" ref="aside">
        <el-row>
          <el-col :span="24">
            <div class="logo">
              <img v-show="!isCollapse" :src="src" alt="">
              {{logo}}
            </div>
            <template>
              <el-menu
                :collapse="isCollapse"
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router="router">
                <el-menu-item index="/ads">
                  <i class="el-icon-bell"></i>
                  <span slot="title">广告管理</span>
                </el-menu-item>
                <el-menu-item index="/ticket">
                  <i class="el-icon-s-ticket"></i>
                  <span slot="title">门票管理</span>
                </el-menu-item>
                <el-menu-item index="/gift">
                  <i class="el-icon-s-goods"></i>
                  <span slot="title">礼物管理</span>
                </el-menu-item>
                <el-submenu index="/order">
                  <template slot="title">
                    <i class="el-icon-s-order"></i>
                    <span>订单管理</span>
                  </template>
                  <el-menu-item index="/order/pay">支付记录</el-menu-item>
                  <el-menu-item index="/order/gift-income">礼物收入记录</el-menu-item>
                  <el-menu-item index="/order/room-income">房间收入记录</el-menu-item>
                </el-submenu>
                <el-menu-item index="/home">
                  <i class="el-icon-s-home"></i>
                  <span slot="title">首页视频</span>
                </el-menu-item>
                <el-menu-item index="/setting">
                  <i class="el-icon-setting"></i>
                  <span slot="title">平台设置</span>
                </el-menu-item>
                <el-menu-item index="/withdraw">
                  <i class="el-icon-money"></i>
                  <span slot="title">提现记录
                    <span v-show="count" class="count">{{count}}</span>
                  </span>
                </el-menu-item>
                <el-menu-item index="/account">
                  <i class="el-icon-user"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
              </el-menu>
            </template>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header class="clearfix">
          <el-radio-group v-model="isCollapse" size="small">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <div class="right">
            <el-dropdown @command="logout">
              <span class="el-dropdown-link">
                当前用户：{{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <keep-alive include="keepAlive">
            <router-view></router-view>
          </keep-alive>
        </el-main>
        <el-footer>&copy; {{Date.now() | formatDate('Y')}}</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUser, clearUser, clearExpireTime} from 'common/js/cache'

  const src = require('../../common/image/logo.png')

  export default {
    data() {
      return {
        src,
        isCollapse: false,
        user: getUser(),
        count: 0
      }
    },
    computed: {
      logo() {
        return !this.isCollapse ? '王炸管理后台' : '王炸'
      }
    },
    created() {
      this.router = true
    },
    methods: {
      handleOpen(key, keyPath) {
//        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
//        console.log(key, keyPath)
      },
      logout() { // 退出登录
        clearUser()
        clearExpireTime()
        this.$router.replace('/teacher-login')
      }
    },
    watch: {
      isCollapse(newVal) {
        if (newVal) {
          this.$refs.aside.$el.style.width = '64px'
        } else {
          this.$refs.aside.$el.style.width = '220px'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .count
    position: relative
    top: -12px
    left: 15px
    background: #f00
    padding: 0 10px
    border-radius: 2px
    color: #fff

  .el-container
    min-height: 100%

  .el-header
    background-color: #B3C0D1
    color: #333
    line-height: 60px
    .right
      padding-right: 5px
      flex: 1
      color: $color
      cursor: pointer

  .el-aside
    background-color: #545c64
    color: #333
    transition: all 0.3s
    .logo
      height: 80px
      line-height: 80px
      text-align: center
      font-size: 16px
      color: #fff
      img
        width: 36px
        height: 36px
        border-radius: 50%
        margin-right: 5px
    .el-menu
      border-right: none
    .el-menu-vertical-demo:not(.el-menu--collapse)
      width: 220px
      min-height: 400px

  .el-main
    background-color: $mainBg
    color: #333
    height: calc(100vh - 100px)

  .el-footer
    background-color: #B3C0D1
    color: #666
    text-align: center
    height: 40px !important
    line-height: 40px

  .el-submenu
    i
      vertical-align: middle
      margin-right: 5px
      width: 24px
      text-align: center
      font-size: 18px

  .el-menu
    i
      margin-right: 8px
</style>
