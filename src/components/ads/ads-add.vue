<template>
  <div class="main">
    <loading v-if="showLoading"></loading>
    <template v-else>
      <div class="common-table-container">
        <div class="common-title-container">
          <el-page-header class="page-header" @back="$router.go(-1)" content="新增广告"></el-page-header>
        </div>
        <el-divider></el-divider>
        <div class="common-table-main">
          <el-form class="article-form" label-position="left" label-width="85px">
            <el-form-item label="广告商名称">
              <el-input class="article-title-input" v-model.trim="form.advertiser" placeholder="请输入广告商名称"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="广告名称">
              <el-input class="article-title-input" v-model.trim="form.name" placeholder="请输入广告名称"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
              <upload-img ref="uploadImg" @uploadimg="uploadHandler"></upload-img>
            </el-form-item>
            <el-form-item label="广告详情">
              <div>
                <quill-editor
                  v-model="form.content"
                  ref="myQuillEditor"
                  class="myEditor"
                  :options="editorOption"
                  @change="onEditorChange($event)"
                  @ready="onEditorReady($event)">
                </quill-editor>
                <upload-img
                  style="display: none;"
                  ref="quillImg"
                  @uploadimg="quillImgHandler">
                </upload-img>
              </div>
            </el-form-item>
            <el-form-item label="广告链接">
              <el-input class="article-title-input" v-model.trim="form.url" placeholder="请输入广告链接"
                        clearable></el-input>
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
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
  import UploadImg from 'base/upload-img/upload-img'

  const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{
      'header': 1
    }, {
      'header': 2
    }],
    [{
      'list': 'ordered'
    }, {
      'list': 'bullet'
    }],
    [{
      'script': 'sub'
    }, {
      'script': 'super'
    }],
    [{
      'indent': '-1'
    }, {
      'indent': '+1'
    }],
    [{
      'direction': 'rtl'
    }],
    [{
      'size': ['small', false, 'large', 'huge']
    }],
    [{
      'header': [1, 2, 3, 4, 5, 6, false]
    }],
    [{
      'color': []
    }, {
      'background': []
    }],
    [{
      'font': []
    }],
    [{
      'align': []
    }],
    ['clean'],
    ['link', 'image']
  ]

  export default {
    data() {
      return {
        showLoading: false,
        form: {
          advertiser: '',
          name: '',
          imgs: '',
          content: '',
          url: '',
          state: 1 // 1、上架 2、下架
        },
        editorOption: {
          placeholder: '请输入内容...',
          modules: {
            toolbar: {
              container: toolOptions,
              handlers: {
                'image': (value) => {
                  if (value) {
                    this.$refs.quillImg.$el.querySelector('.el-upload').click()
                  } else {
                    this.quill.format('image', false)
                  }
                }
              }
            }
          }
        }
      }
    },
    methods: {
      uploadHandler(url) {
        this.elUploadImg = this.$refs.uploadImg.$el.querySelector('.el-upload')
        if (url) {
          this.elUploadImg.style.display = 'none'
        } else {
          this.elUploadImg.style.display = ''
        }
        console.log('uploadHandler', url)
        this.form.imgs = url
      },
      quillImgHandler(name, url) {
        console.log('quillImgHandler name = ', name)
        console.log('quillImgHandler url = ', url)
        let quill = this.$refs.myQuillEditor.quill
        let length = quill.getSelection().index
        quill.insertEmbed(length, 'image', url)
        quill.setSelection(length + 1)
      },
      onEditorChange(editor) {
      },
      onEditorReady(editor) {
      },
      doSubmit() {
        const {advertiser, name, imgs, content, url, state} = this.form
        if (!advertiser) {
          this.$toast('请输入广告商名称')
          return
        }
        if (!name) {
          this.$toast('请输入广告名称')
          return
        }
        if (!imgs) {
          this.$toast('请上传图片')
          return
        }
        if (!content && !url) {
          this.$toast('请输入广告详情或广告链接')
          return
        }
        this.$loading.show()
        this.$post(api.addAdver, {
          advertiser,
          name,
          imgs,
          content,
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
      quillEditor,
      UploadImg
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .ql-snow
    .ql-editor
      img
        width: auto

  .common-table-main
    padding 50px 100px
    .article-title-input
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

  .quill-editor
    width 90%
    height 500px
    padding-bottom 100px
    margin-top 5px

  .button-container
    margin-top 20px
    display flex
    .button-main
      margin-left auto
      .el-button
        width 130px

  /deep/ .el-divider--horizontal
    margin 0
</style>
