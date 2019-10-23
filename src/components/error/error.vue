<template>
  <div class="error">
    <div class="error-wrap">
      <div class="error-img"><img :src="src" alt=""></div>
      <div class="error-content">
        <div class="title">404</div>
        <div class="txt">页面加载失败...点击<span @click="reLoad">重新刷新</span>网页</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getPath, getUser} from 'common/js/cache'

  const src = require('./error.png')

  export default {
    data() {
      return {
        src
      }
    },
    methods: {
      reLoad() {
        if (!this.isClicked) {
          this.isClicked = true
          const path = getPath()
          const user = getUser()
          if (path) {
            this.$router.replace(path)
          } else {
            this.$toast('网页已过期，请重新登录', 'error', () => {
              if (user && user.type === 1) { // 家长
                this.$router.replace('/')
              } else {
                this.$router.replace('/login')
              }
            })
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .error
    display: flex
    justify-content: center
    align-items: center
    min-height: 100vh
    .error-wrap
      position: relative
      top: -100px
      display: flex
      .error-img
        margin-right: 15px
        img
          width: 63px
          height: 55px
      .error-content
        color: #787878
        .title
          font-weight: bold
          font-size: 30px
          margin: 0 0 12px
        .txt
          letter-spacing: 2px
          span
            cursor: pointer
            text-decoration: underline
            color: $color
            margin: 0 5px
            &:hover
              color: $hoverColor
</style>
