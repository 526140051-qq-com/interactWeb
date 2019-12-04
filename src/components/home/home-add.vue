<template>
  <div class="main">
    <loading v-if="showLoading"></loading>
    <template v-else>
      <div class="common-table-container">
        <div class="common-title-container">
          <el-page-header class="page-header" @back="$router.go(-1)" content="新增视频"></el-page-header>
        </div>
        <el-divider></el-divider>
        <div class="common-table-main">
          <el-form class="article-form" label-position="left" label-width="85px">
            <el-form-item label="视频名称">
              <el-input class="title-input" v-model.trim="form.name" placeholder="请输入视频名称"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="上传视频">
              <upload-file ref="uploadFile" @uploadfile="uploadHandler">
                <el-button size="small" type="primary">点击上传</el-button>
              </upload-file>
            </el-form-item>
          </el-form>
          <div class="button-container">
            <div class="button-main">
              <el-button @click="doSubmit" type="primary">新增</el-button>
            </div>
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
  import UploadFile from 'base/upload-file/upload-file'

  export default {
    data() {
      return {
        showLoading: false,
        form: {
          name: '',
          url: '',
          state: 1 // 1、开启 2、关闭
        }
      }
    },
    methods: {
      uploadHandler(url) {
        console.log('uploadHandler', url)
        this.form.url = url
      },
      doSubmit() {
        const {name, url, state} = this.form
        if (!name) {
          this.$toast('请输入视频名称')
          return
        }
        if (!url) {
          this.$toast('请上传视频')
          return
        }
        this.$loading.show('视频上传中...')
        this.$post(api.addVideoUrl, {
          name,
          url,
          state
        }).then(res => {
          if (res.code === ERR_OK) {
            this.$loading.hide()
            this.$router.back()
            this.$toast('新增成功', 'success')
          } else {
            this.$toast(res.message, 'error')
          }
        })
      }
    },
    components: {
      Loading,
      UploadFile
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .common-table-main
    padding 50px 100px
    .title-input
      width 95%

  .article-content-container
    .article-content-container-main
      display flex
      .article-content-title
        font-size 14px
        color #606266
        line-height 40px
        padding 0 12px 0 0
        width 80px

  .button-container
    margin-top 30px
    display flex
    .button-main
      margin-left auto
      .el-button
        width 130px

  /deep/ .el-divider--horizontal
    margin 0
</style>
