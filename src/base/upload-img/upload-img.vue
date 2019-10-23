<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :http-request="httpRequest"
      :headers="headers"
      list-type="picture-card"
      :multiple="multiple"
      :limit="1"
      :before-upload="beforeUpload"
      :on-success="imgSuccess"
      :on-preview="PicPreview"
      :file-list="fileList"
      :on-remove="handleRemove">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Config from 'common/js/config'
  import api from 'common/js/api'
  import {getToken} from 'common/js/cache'
  import {compress} from 'common/js/compress'

  export default {
    props: {
      imageUrl: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        imgurl: [],
        action: Config.ApiHost + api.uploadFile,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: []
      }
    },
    mounted() {
      this.elUpload = document.querySelector('.el-upload')
    },
    computed: {
      headers() {
        return {
          'token': getToken()
        }
      }
    },
    methods: {
      // 删除
      handleRemove(file, fileList) {
        this.imgurl = []
        this.fileList = []
        this.$emit('uploadimg', this.imgurl)
      },
      // 图片预览
      PicPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      imgSuccess(response, file, fileList) {
      },
      beforeUpload(file) {
        console.log('beforeUpload')
        const isLt200 = file.size / 1024 / 1024 < 6
        if (!isLt200) {
          this.$toast('上传图片大小不能超过 6M!')
        }
        return isLt200
      },
      httpRequest(options) {
        let file = options.file
        let name = file.name
        const isLt200 = file.size / 1024 / 1024 < 6
        if (!isLt200) {
          this.$toast('上传图片大小不能超过 6M!')
        } else {
          compress(file, (res) => {
            let dataBase = res.split(',')[1]
            let arr = []
            this.$post(api.uploadBase64File, {
              data: dataBase,
              fileName: name
            }).then((res) => {
              if (res.code === 0) {
                this.fileList = [
                  {
                    name: name,
                    url: res.data
                  }
                ]
                arr.push(res.data)
                this.imgurl = arr
                this.$emit('uploadimg', this.imgurl)
              }
            })
          })
        }
        return isLt200
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .avatar
    position: relative
    top: -5px
    border-radius: 6px

  /deep/ .el-upload--picture-card img
    max-width: 118px
    max-height: 118px
</style>
