<template>
  <div>
    <Sidebar></Sidebar>
    <UserSetting></UserSetting>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '@/layout/baseComponent/components/Sidebar'
import UserSetting from '@/layout/baseComponent/components/UserSetting'
export default {
  name: 'index',
  components: {
    Sidebar,
    UserSetting
  }
}
</script>

<style scoped>

</style>
