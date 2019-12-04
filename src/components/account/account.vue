<template>
  <div class="main">
    <loading v-if="showLoading"></loading>
    <template v-else>
      <div class="common-table-container">
        <div class="common-title-container">
          <span>查询条件</span>
        </div>
        <el-divider></el-divider>
        <div class="main-container">
          <div class="filter-container">
            <el-form :inline="true" label-width="80px" label-position="right">
              <el-form-item class="filter-content" label="用户昵称">
                <el-input v-model.trim="form.nickName" type="text" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item class="filter-content" label="手机号">
                <el-input v-model.trim="form.phone" type="text" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item class="filter-button-container">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleSearch">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="common-table-container mt20">
        <div class="common-title-container">
          <span>用户管理</span>
        </div>
        <el-divider></el-divider>
        <div class="common-table-main">
          <el-table
            stripe
            class="common-table"
            :data="list"
            v-loading="tableLoading"
            :show-overflow-tooltip="true"
            style="width: 100%">
            <el-table-column
              prop="menuTitle"
              label="头像">
              <template slot-scope="scope">
                <preview-pic v-if="scope.row.photo" :images="scope.row.photo.split(',')"></preview-pic>
                <img v-else class="avatar" :src="Avatar" alt="">
              </template>
            </el-table-column>
            <el-table-column
              prop="nickName"
              label="用户昵称">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="identityCard"
              label="身份证号">
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.state === 1"
                  @change="doSetting(scope.row)"
                  active-text="解冻"
                  inactive-text="冻结">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              :total="totalCount"
              :current-page.sync="pageNum"
              :page-size="pageSize"
              @current-change="handlePageChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  import PreviewPic from 'base/preview-pic/preview-pic'
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'

  const Avatar = require('common/image/avatar.png')

  export default {
    data() {
      return {
        showLoading: true,
        Avatar,
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
        list: [],
        form: {
          nickName: '',
          phone: ''
        },
        tableLoading: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        const {nickName, phone} = this.form
        this.$post(api.findUser, {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          nickName,
          phone
        }).then(res => {
          if (res.code === ERR_OK) {
            const {count, list} = res.data
            this.totalCount = count
            this.list = list
            this.tableLoading = false
            this.showLoading = false
          }
        })
      },
      // 查询
      handleSearch() {
        this.tableLoading = true
        this.pageNum = 1
        this.fetchData()
      },
      handleCancel() {
        this.form = {
          nickName: '',
          phone: ''
        }
        this.fetchData()
      },
      handlePageChange(val) {
        this.pageNum = val
        this.fetchData()
      },
      // 冻结、解冻
      doSetting(row) {
        this.$loading.show()
        let {id: userId, state: oldState} = row
        let state = oldState === 1 ? 2 : 1
        this.$post(api.setUserState, {
          userId,
          state // 状态1.冻结 2.解冻
        }).then(res => {
          if (res.code === ERR_OK) {
            this.$loading.hide()
            this.$toast('编辑成功', 'success')
            this.fetchData()
          } else {
            this.$loading.hide()
            this.$toast(res.message, 'error')
          }
        })
      }
    },
    components: {
      Loading,
      PreviewPic
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-divider--horizontal
    margin 0

  .pagination-container
    margin-top: 20px
    display flex
    .el-pagination
      margin-left auto

  .main-container
    background-color #fff
    padding 32px 30px 10px

  .avatar
    width: 80px
    height: 80px
    border-radius: 50%

  /deep/ .preview
    img
      width: 80px
      height: 80px
      border-radius: 50%
</style>
