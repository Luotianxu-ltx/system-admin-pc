<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <user-info></user-info>
      </el-col>
      <el-col :span="16">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userInfo from '@/views/info/components/userInfo'
export default {
  name: 'user',
  components: {
    userInfo
  }
}
</script>

<style lang="less" scoped>
</style>
