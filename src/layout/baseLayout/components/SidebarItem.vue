<template>
  <div>
    <template v-if="!item.children || item.children.length === 0">
      <router-link :to="item.url">
        <el-menu-item :index="item.url">
          <i :class=item.icon></i>
          {{ item.name }}
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.id" popper-append-to-body>
      <template slot="title">
        <i :class=item.icon></i>
        {{ item.name }}
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :base-path="child.url"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
