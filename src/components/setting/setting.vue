<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="common-table-main">
        <el-form class="article-form" label-position="left" label-width="100px">
          <el-form-item label="提现扣除比例">
            <el-input class="title-input" type="number" v-model.trim="val" placeholder="请输入提现扣除比例"
                      clearable></el-input>
            <span>%</span>
          </el-form-item>
          <el-form-item>
            <el-button @click="doSubmit" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'

  export default {
    data() {
      return {
        isLoading: false,
        settingId: '',
        val: '' // 提现扣除比例
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        let ret = await this.getData()
        this.val = ret.vals
        this.settingId = ret.id
        this.isLoading = false
      },
      getData() {
        return new Promise(resolve => {
          this.$post(api.selectByKey).then(res => {
            if (res.code === ERR_OK) {
              resolve(res.data)
            }
          })
        })
      },
      doSubmit() {
        if (!this.val) {
          this.$toast('请输入提现扣除比例')
          return
        }
        this.$loading.show()
        this.$post(api.updateSetting, {
          settingId: this.settingId,
          val: this.val
        }).then(res => {
          if (res.code === ERR_OK) {
            this.$loading.hide()
            this.$toast('设置成功', 'success')
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
  .common-table-main
    padding: 50px 100px
    background: #fff
    .title-input
      width: 40%
    span
      margin-left: 8px
</style>
