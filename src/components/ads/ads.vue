<template>
  <div class="main">
    <loading v-if="showLoading"></loading>
    <template v-else>
      <div class="common-table-container">
        <div class="common-title-container">
          <span>广告管理</span>
          <el-button class="publish-button" type="primary" size="medium" @click="handleAdd">新增广告</el-button>
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
              prop="advertiser"
              label="广告商名称">
            </el-table-column>
            <el-table-column
              prop="name"
              label="广告名称">
            </el-table-column>
            <el-table-column
              prop="menuTitle"
              label="图片">
              <template slot-scope="scope">
                <preview-pic :images="scope.row.imgs.split(',')"></preview-pic>
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
                <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
        this.$post(api.selectAdvertisement).then(res => {
          if (res.code === ERR_OK) {
            this.list = res.data
            this.showLoading = false
          }
        })
      },
      // 新增
      handleAdd() {
        this.$router.push('/ads/add')
      },
      // 编辑
      handleEdit(row) {
        this.$router.push(`/ads/edit/${row.id}`)
      },
      // 删除
      handleDelete(row) {
        this.$tips('是否确认删除该广告?', () => {
          this.$loading.show()
          this.$post(api.deleteAdverById, {
            adverId: row.id
          }).then(res => {
            if (res.code === ERR_OK) {
              this.fetchData()
              this.$loading.hide()
              this.$toast('删除成功', 'success')
            }
          })
        })
      },
      // 上架、下架广告
      doSetting(row) {
        this.$loading.show()
        let {id: adverId, state: oldState} = row
        let state = oldState === 1 ? 2 : 1
        this.$post(api.editAdver, {
          adverId,
          state // 广告状态1.上架 2.下架
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
</style>
