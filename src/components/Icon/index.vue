<template>
  <span>
    <i :class="eleIcon" :style="{fontSize:fontSize,color: color,fontWeight: width}"></i>
  </span>
</template>

<script>
export default {
  name: 'index',
  props: {
    icon: {
      required: true,
      type: String
    },
    font: {
      required: false,
      type: String,
      default: '22'
    },
    color: {
      required: false,
      type: String,
      default: '#252323'
    },
    width: {
      required: false,
      type: Number
    }
  },
  computed: {
    eleIcon () {
      return 'iconfont ' + this.icon
    },
    fontSize () {
      return this.font + 'px'
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
