<template>
  <div class="spinner">
    <div class="sk-spinner sk-spinner-wave">
      <div class="sk-rect1"></div>
      <div class="sk-rect2"></div>
      <div class="sk-rect3"></div>
      <div class="sk-rect4"></div>
      <div class="sk-rect5"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .spinner
    position: absolute
    top: 0
    bottom: 0
    z-index: 999
    width: 100%
    background-color: #fff
    .sk-spinner
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
    .sk-spinner-wave
      width: 50px
      height: 36px
      text-align: center
      font-size: 10px
      > div
        background-color: $color-green
        height: 100%
        width: 6px
        display: inline-block
        margin: 0 2px
        -webkit-animation: sk-waveStretchDelay 1.2s infinite ease-in-out
        animation: sk-waveStretchDelay 1.2s infinite ease-in-out
      .sk-rect2
        -webkit-animation-delay: -1.1s
        animation-delay: -1.1s
      .sk-rect3
        -webkit-animation-delay: -1s
        animation-delay: -1s
      .sk-rect4
        -webkit-animation-delay: -.9s
        animation-delay: -.9s
      .sk-rect5
        -webkit-animation-delay: -.8s
        animation-delay: -.8s

  @-webkit-keyframes sk-waveStretchDelay
    0%, 100%, 40%
      -webkit-transform: scaleY(0.4)
      transform: scaleY(0.4)
    20%
      -webkit-transform: scaleY(1)
      transform: scaleY(1)

  @keyframes sk-waveStretchDelay
    0%, 100%, 40%
      -webkit-transform: scaleY(0.4)
      transform: scaleY(0.4)
    20%
      -webkit-transform: scaleY(1)
      transform: scaleY(1)
</style>
