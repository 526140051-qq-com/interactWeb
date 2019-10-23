<template>
  <div class="avatar-wrap">
    <div class="avatar">
      <img :src="avatar"/>
    </div>
    <div class="avatarName">
      {{name}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      avatar: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"
  .avatar-wrap
    text-align : center
    .avatar
      width: 70px
      height : 70px
      display : inline-block
      border-radius: 50%
      background: #dfdfdf
      img
        width: 100%
        height: 100%
        max-width: 100%
        max-height: 100%
        border-radius: 50%

    .avatarName
      color: #fff
      font-size : 16px
      line-height : 30px
</style>
