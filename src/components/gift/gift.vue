<template>
  <div class="main">
    <loading v-if="showLoading"></loading>
    <template v-else>
      <div class="common-table-container">
        <div class="common-title-container">
          <span>礼物管理</span>
          <el-button class="publish-button" type="primary" size="medium" @click="handleAdd">新增礼物</el-button>
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
              label="礼物名称">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格">
            </el-table-column>
            <el-table-column
              prop="menuTitle"
              label="图片">
              <template slot-scope="scope">
                <preview-pic :images="scope.row.photo.split(',')"></preview-pic>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.state === 1"
                  @change="doSetting(scope.row)"
                  active-text="上架"
                  inactive-text="下架">
                </el-switch>
              </template>
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
    </template>
  </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  import PreviewPic from 'base/preview-pic/preview-pic'
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'

  export default {
    data() {
      return {
        showLoading: true,
        list: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.$post(api.findGift).then(res => {
          if (res.code === ERR_OK) {
            this.list = res.data
            this.showLoading = false
          }
        })
      },
      // 新增
      handleAdd() {
        this.$router.push('/gift/add')
      },
      // 编辑
      handleEdit(row) {
        this.$router.push(`/gift/edit/${row.id}`)
      },
      // 上架、下架广告
      doSetting(row) {
        this.$loading.show()
        let {id: giftId, state: oldState} = row
        let state = oldState === 1 ? 2 : 1
        this.$post(api.updateGift, {
          giftId,
          state // 礼物状态1.上架 2.下架
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
    margin: 0
</style>
