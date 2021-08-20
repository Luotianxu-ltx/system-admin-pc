<template>
  <div>
    <div>{{menuList}}</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters([
      'menuList'
    ])
  }
}
</script>

<style scoped>

</style>
