<template>
  <div class="layout">
    <el-container>
      <el-header class="clearfix">
        <div class="left">
          <span>{{user.school.name}}</span>
          <i class="el-icon-edit edit-icon" @click="editSchoolName"></i>
          <el-dialog
            class="school-dialog"
            title="修改学校名称"
            :visible.sync="showSchoolDialog"
            width="300px"
            top="30vh">
            <el-form>
              <el-form-item label="学校名称">
                <el-input v-model="editName" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="showSchoolDialog = false">取 消</el-button>
              <el-button type="primary" @click="confirmEditSchool">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="right">
          <el-dropdown @command="logout">
              <span class="el-dropdown-link">
                当前用户：{{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="outer-main">
        <el-container>
          <el-aside width="220px" ref="aside">
            <el-row>
              <el-col :span="24">
                <div class="logo">
                  <img class="logo-img" :src="src" alt="">
                  <div class="logo-name">摇篮E家园</div>
                </div>
                <template>
                  <el-menu
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router="router">
                    <el-menu-item
                      v-for="item in menu"
                      :key="item.id"
                      :index="item.url">
                      <i :class="item.icon"></i>
                      <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                  </el-menu>
                </template>
              </el-col>
            </el-row>
          </el-aside>
          <el-container>
            <el-main class="main-container">
              <keep-alive include="keepAlive">
                <router-view></router-view>
              </keep-alive>
            </el-main>
            <el-footer>&copy; {{date}} <a href="http://www.joymetec.com" target="_blank">苏州乐米科技</a></el-footer>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import {saveUser, getUser, clearUser, clearExpireTime} from 'common/js/cache'
  import {ERR_OK} from '../../common/js/config'
  import api from 'common/js/api'

  const src = require('../../common/image/logo.png')

  export default {
    data() {
      return {
        src,
        user: getUser(),
        showSchoolDialog: false,
        editName: '',
        menu: [
          {
            id: 1,
            name: '园所公告',
            url: '/notice',
            icon: 'el-icon-document'
          }
        ]
      }
    },
    computed: {
      date() {
        return moment().format('YYYY')
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
        this.$router.replace('/login')
      },
      editSchoolName() {
        this.editName = this.user.school.name
        this.showSchoolDialog = true
      },
      confirmEditSchool() {
        if (!this.editName) {
          this.$toast('请填写学校名称')
          return
        }
        this.user.school.name = this.editName
        this.$post(api.editSchool, {
          name: this.editName
        }).then((res) => {
          if (res.code === ERR_OK) {
            saveUser(this.user)
            this.showSchoolDialog = false
            this.$toast('修改成功', 'success')
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .el-container
    min-height: 100%

  .el-header
    background-color: rgba(64, 64, 64, 1)
    color: #333
    line-height: 60px
    padding-left 100px
    .left
      color #fff
      span
        font-size 17px
      .edit-icon
        margin-left 10px
        font-size 16px
        cursor pointer
      .school-dialog
        /deep/ .el-dialog__body
          padding 0 20px
    .right
      padding-right: 5px
      margin-left auto
      color: $color
      cursor: pointer
      .el-dropdown-link
        color #fff

  .el-aside
    background-color: #545c64
    color: #333
    transition: all 0.3s
    .logo
      height: 80px
      font-size: 16px
      color: #fff
      padding: 0 12px
      display: flex
      align-items: center
      .logo-img
        flex: 0 0 36px
        width: 36px
        height: 35px
        margin-right: 10px
      .logo-name
        flex: 1
        line-height: 1.2
        margin-left 10px
    .el-menu
      border-right: none
    .el-menu-vertical-demo:not(.el-menu--collapse)
      width: 220px
      min-height: 400px

  .outer-main
    padding 0
    height calc(100vh - 60px)
    background-color: $mainBg
    color: #333

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

  .main-container
    flex-basis 0
</style>
