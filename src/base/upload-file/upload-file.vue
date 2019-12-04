<template>
  <div>
    <el-upload
      :action="action"
      :headers="headers"
      :multiple="multiple"
      :limit="1"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-preview="handlePreview"
      :file-list="fileList"
      :on-remove="handleRemove">
      <slot></slot>
      <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过100M</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <div>预览内容</div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Config from 'common/js/config'
  import api from 'common/js/api'
  import {getToken} from 'common/js/cache'

  export default {
    props: {
      fileUrl: {
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
        console.log('handleRemove', file)
//        this.imgurl = []
//        this.fileList = []
//        this.$emit('uploadfile', '')
      },
      // 预览
      handlePreview(file) {
        console.log('handlePreview', file)
        this.dialogVisible = true
      },
      handleSuccess(response, file, fileList) {
        console.log('handleSuccess', file)
        if (file.response) {
          const ossUrl = file.response.data
          this.$emit('uploadfile', ossUrl)
        }
      },
      beforeUpload(file) {
        console.log('beforeUpload', file)
        if (!file.type.includes('video/')) {
          this.$toast('请上传视频文件')
          return false
        }
        const isLt200 = file.size / 1024 / 1024 < 100
        if (!isLt200) {
          this.$toast('上传文件大小不能超过 100M!')
        }
        return isLt200
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
