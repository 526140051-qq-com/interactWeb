<template>
  <div id="preview">
    <viewer :images="images" class="preview">
      <img
        v-for="(item, index) in images"
        :key="index"
        :src="item"
      >
    </viewer>
  </div>
</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'

  Vue.use(Viewer, {
    defaultOptions: {
      title: 0,
      movable: 0, // 移动
      toolbar: {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 0,
        reset: 0,
        prev: 1,
        play: {
          show: 0,
          size: 'large'
        },
        next: 1,
        rotateLeft: 0,
        rotateRight: 0,
        flipHorizontal: 0,
        flipVertical: 0
      }
    }
  })
  export default {
    props: {
      images: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .img-wrap
    .preview
      display: flex

  img
    width: 120px
    height: 90px
    margin: 0 15px 0 0
    cursor: pointer
</style>
