<template>
  <div>
    <i class="el-icon-full-screen" @click="full"></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'screenfull',
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    full () {
      if (!screenfull.enabled) {
        this.$message({
          message: '您的浏览器不支持！',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy () {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-icon-full-screen {
  font-size: 20px;
}
</style>
