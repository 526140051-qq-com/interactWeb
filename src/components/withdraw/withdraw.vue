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
            <el-form :inline="true" label-width="80px">
              <el-form-item label="订单号">
                <el-input v-model.trim="form.num" placeholder="请输入订单号" clearable></el-input>
              </el-form-item>
              <el-form-item label="用户昵称">
                <el-input v-model.trim="form.nickName" placeholder="请输入用户昵称" clearable></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model.trim="form.phone" placeholder="请输入手机号" clearable></el-input>
              </el-form-item>
              <el-form-item label="支付状态">
                <el-select v-model="form.state" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
          <span>提现记录</span>
          <div class="calc">
            <div>待付款(总)金额：{{totalMoney}}元</div>
            <div>已付款(总)金额：{{isPayTotal}}元</div>
            <div>服务费(总)：{{totalDeduction}}元</div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="common-table-main">
          <el-table
            stripe
            show-overflow-tooltip
            class="common-table"
            :data="list"
            v-loading="tableLoading">
            <el-table-column
              prop="num"
              label="订单号">
            </el-table-column>
            <el-table-column
              prop="user.nickName"
              label="用户昵称">
            </el-table-column>
            <el-table-column
              label="日期"
              width="150px">
              <template slot-scope="scope">
                {{scope.row.createTime | formatDate('m')}}
              </template>
            </el-table-column>
            <el-table-column
              prop="user.phone"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="money"
              label="提现金额(元)">
            </el-table-column>
            <el-table-column
              prop="deduction"
              label="服务费(元)">
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                {{scope.row.state === 1 ? '待付款' : '已付款'}}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.state === 1" type="primary" size="mini" @click="handleSubmit(scope.row)">
                  付款
                </el-button>
                <span v-if="scope.row.state === 2">已付款</span>
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
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'

  export default {
    data() {
      return {
        showLoading: true,
        tableLoading: false,
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
        list: [],
        totalMoney: '', // 待付款(总)金额
        isPayTotal: '', // 已付款(总)金额
        totalDeduction: '', // 服务费(总)
        form: {
          num: '', // 订单号
          nickName: '', // 用户昵称
          phone: '', // 手机号
          state: '' // 支付状态
        },
        options: [
          {
            label: '待付款',
            value: 1
          },
          {
            label: '已付款',
            value: 2
          }
        ]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.tableLoading = true
        const {num, nickName, phone, state} = this.form
        this.$post(api.findWithdraw, {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          num, // 订单号
          nickName, // 用户昵称
          phone, // 支付状态
          state // 状态 1.待付款 2.已付款
        }).then(res => {
          if (res.code === ERR_OK) {
            const {count, list, totalMoney, isPayTotal, totalDeduction} = res.data
            this.totalCount = count
            this.list = list
            this.totalMoney = totalMoney
            this.isPayTotal = isPayTotal
            this.totalDeduction = totalDeduction
            this.tableLoading = false
            this.showLoading = false
          }
        })
      },
      handleCancel() {
        this.form = {
          num: '', // 订单号
          nickName: '', // 用户昵称
          phone: '', // 手机号
          state: '' // 支付状态
        }
        this.pageNum = 1
        this.fetchData()
      },
      // 查询
      handleSearch() {
        this.pageNum = 1
        this.fetchData()
      },
      // 分页
      handlePageChange(val) {
        this.pageNum = val
        this.fetchData()
      },
      // 付款
      handleSubmit(row) {
        this.$loading.show()
        this.$post(api.finishWithdraw, {
          withdrawId: row.id
        }).then(res => {
          if (res.code === ERR_OK) {
            this.$toast('付款成功', 'success')
            this.fetchData()
          } else {
            this.$toast(res.message, 'error')
          }
          this.$loading.hide()
        })
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  /deep/ .el-divider--horizontal
    margin 0

  .common-title-container
    justify-content: space-between
    .calc
      display: flex
      > div
        font-size: 16px
        color: $color
        margin-left: 20px

  .pagination-container
    margin-top: 20px
    display flex
    .el-pagination
      margin-left auto

  .main-container
    background-color #fff
    padding 32px 30px 10px
</style>
