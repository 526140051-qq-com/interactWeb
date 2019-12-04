<template>
  <div class="main">
    <loading v-if="showLoading"></loading>
    <template v-else>
      <div class="common-table-container">
        <div class="common-title-container">
          <el-page-header class="page-header" @back="$router.go(-1)" content="编辑礼物"></el-page-header>
        </div>
        <el-divider></el-divider>
        <div class="common-table-main">
          <el-form class="article-form" label-position="left" label-width="85px">
            <el-form-item label="礼物图片">
              <upload-img
                ref="uploadImg"
                @uploadimg="uploadHandler"
                :imageUrl="form.photo"
              ></upload-img>
            </el-form-item>
            <el-form-item label="礼物名称">
              <el-input class="title-input" v-model.trim="form.name" placeholder="请输入礼物名称"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="礼物价格">
              <el-input class="title-input" type="number" v-model.trim="form.price" placeholder="请输入礼物价格"
                        clearable></el-input>
            </el-form-item>
          </el-form>
          <div class="button-container">
            <div class="button-main">
              <el-button @click="doSubmit" type="primary">保存</el-button>
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
  import UploadImg from 'base/upload-img/upload-img'

  export default {
    data() {
      return {
        showLoading: true,
        form: null
      }
    },
    created() {
      this.giftId = this.$route.params.id
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.$post(api.selectGiftById, {
          giftId: this.giftId
        }).then(res => {
          if (res.code === ERR_OK) {
            this.form = res.data
            this.showLoading = false
          }
        })
      },
      uploadHandler(url) {
        this.elUploadImg = this.$refs.uploadImg.$el.querySelector('.el-upload')
        if (url) {
          this.elUploadImg.style.display = 'none'
        } else {
          this.elUploadImg.style.display = ''
        }
        console.log('uploadHandler', url)
        this.form.photo = url
      },
      doSubmit() {
        const {photo, name, price, state} = this.form
        if (!photo) {
          this.$toast('请上传礼物图片')
          return
        }
        if (!name) {
          this.$toast('请输入礼物名称')
          return
        }
        if (!price) {
          this.$toast('请输入礼物价格')
          return
        }
        this.$loading.show()
        this.$post(api.updateGift, {
          giftId: this.giftId,
          photo,
          name,
          price,
          state
        }).then(res => {
          if (res.code === ERR_OK) {
            this.$loading.hide()
            this.$router.back()
            this.$toast('编辑成功', 'success')
          } else {
            this.$toast(res.message, 'error')
          }
        })
      }
    },
    components: {
      Loading,
      UploadImg
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
