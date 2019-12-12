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
            <el-form :inline="true" label-width="90px">
              <el-form-item label="礼物接受人">
                <el-input v-model.trim="form.toNickName" type="text" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="礼物送出人">
                <el-input v-model.trim="form.fromNickName" type="text" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker
                  v-model="form.time"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleSearch">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="common-table-container mt20">
        <div class="common-title-container">
          <span>礼物收入记录</span>
          <!--<el-button class="publish-button" type="primary" size="medium" @click="handleExport">导出</el-button>-->
        </div>
        <el-divider></el-divider>
        <div class="common-table-main">
          <el-table
            stripe
            class="common-table"
            :data="list"
            v-loading="tableLoading"
            :show-overflow-tooltip="true">
            <el-table-column
              prop="toUser.nickName"
              label="礼物接受人">
            </el-table-column>
            <el-table-column
              prop="gift.name"
              label="礼物名称">
            </el-table-column>
            <el-table-column
              prop="gift.price"
              label="金额(元)">
            </el-table-column>
            <el-table-column
              prop="identityCard"
              label="时间">
              <template slot-scope="scope">{{scope.row.createTime | formatDate('m')}}</template>
            </el-table-column>
            <el-table-column
              prop="fromUser.nickName"
              label="礼物送出人">
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
  import api from 'common/js/api'
  import config, {ERR_OK} from 'common/js/config'
  import {download} from 'common/js/util'
  import qs from 'qs'

  export default {
    data() {
      return {
        showLoading: true,
        tableLoading: false,
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
        list: [],
        form: {
          toNickName: '', // 礼物接受人
          fromNickName: '', // 礼物送出人
          time: ''
        },
        beginTime: '',
        endTime: '',
        exportUrl: config.ApiHost + api.downPayLogs
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        const {toNickName, fromNickName, time} = this.form
        if (time) {
          [this.beginTime, this.endTime] = time
        } else {
          this.beginTime = ''
          this.endTime = ''
        }
        this.$post(api.selectGiveGiftLogPager, {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          toNickName, // 礼物接受人
          fromNickName, // 礼物送出人
          beginTime: this.beginTime,
          endTime: this.endTime
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
      // 取消
      handleCancel() {
        this.form = {
          toNickName: '', // 礼物接受人
          fromNickName: '', // 礼物送出人
          time: ''
        }
        this.beginTime = ''
        this.endTime = ''
        this.exportUrl = config.ApiHost + api.downPayLogs
        this.handleSearch()
      },
      // 查询
      handleSearch() {
        this.tableLoading = true
        this.pageNum = 1
        this.fetchData()
      },
      // 分页
      handlePageChange(val) {
        this.pageNum = val
        this.fetchData()
      },
      handleExport() {
        const {outTradeNo, nickName, time} = this.form
        let params = {
          outTradeNo,
          nickName: encodeURIComponent(nickName)
        }
        if (time) {
          [params.beginTime, params.endTime] = time
        } else {
          params.beginTime = ''
          params.endTime = ''
        }
        this.exportUrl = this.exportUrl + '?' + qs.stringify(params)
        download(this.exportUrl)
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-divider--horizontal
    margin 0

  .publish-button
    width: auto !important

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
