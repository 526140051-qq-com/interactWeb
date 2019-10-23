<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :headers="headers"
      list-type="picture-card"
      :multiple="multiple"
      :limit="4"
      :before-upload="beforeUpload"
      :on-exceed="exceed"
      :on-success="imgSuccess"
      :on-preview="PicPreview"
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

  export default {
    props: {
      imageUrl: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean,
        default: true
      },
      filelist: {
        type: Array
      }
    },
    data() {
      return {
        imgurl: [],
        action: Config.ApiHost + api.uploadFile,
        dialogImageUrl: '',
        dialogVisible: false
      }
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
        let urlArr = []
        fileList.forEach((item, index) => {
          if (item.response) {
            urlArr.push(item.response.data)
          }
        })
        this.imgurl = urlArr
        this.$emit('uploadimg', this.imgurl)
      },
      // 图片预览
      PicPreview(file) {
        console.log('preview')
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      imgSuccess(response, file, fileList) {
        let urlArr = []
        fileList.forEach((item, index) => {
          if (item.response) {
            urlArr.push(item.response.data)
          }
        })
        this.imgurl = urlArr
        this.$emit('uploadimg', this.imgurl)
      },
      exceed() {
        this.$toast('最多上传四张图片')
      },
      beforeUpload(file) {
        const isLt200 = file.size / 1024 / 1024 < 6
        if (!isLt200) {
          this.$toast('上传图片大小不能超过 6M!')
        }
        return isLt200
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
