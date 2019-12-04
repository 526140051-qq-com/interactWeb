<template>
  <div class="main">
    <loading v-if="showLoading"></loading>
    <template v-else>
      <div class="common-table-container">
        <div class="common-title-container">
          <span>门票管理</span>
        </div>
        <el-divider></el-divider>
        <div class="common-table-main">
          <el-table
            stripe
            class="common-table"
            :data="list"
            :show-overflow-tooltip="true"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="门票名称">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格(元)">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog width="500px" class="ticket-dialog" title="编辑门票"
                 :visible.sync="showDialog">
        <el-form :model="form" label-width="110px" label-position="right">
          <el-form-item label="门票名称" prop="name">
            <el-input v-model.trim="form.name" placeholder="请输入门票名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input type="number" v-model.trim="form.price" placeholder="请输入价格" clearable>
              <i slot="suffix">元</i>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </div>
      </el-dialog>
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
        list: [],
        showDialog: false,
        form: {
          chargeId: '',
          name: '',
          price: ''
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.$post(api.findCharge).then(res => {
          if (res.code === ERR_OK) {
            this.list = res.data
            this.showLoading = false
          }
        })
      },
      // 编辑
      handleEdit(row) {
        const {id, name, price} = row
        this.form.chargeId = id
        this.form.name = name
        this.form.price = price
        this.showDialog = true
      },
      // 编辑弹框 - 点击确定按钮
      handleConfirm() {
        const {chargeId, name, price} = this.form
        this.$loading.show()
        this.$post(api.updateCharge, {
          chargeId,
          name,
          price
        }).then(res => {
          if (res.code === ERR_OK) {
            this.fetchData()
            this.showDialog = false
            this.$loading.hide()
            this.$toast('编辑成功', 'success')
          } else {
            this.$loading.hide()
            this.$toast(res.message, 'error')
          }
        })
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

  /deep/ .el-input__suffix
    right: 10px

  .ticket-dialog
    /deep/ .el-form
      width 400px
      margin 0 auto
</style>
