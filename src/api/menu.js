import service from '@/utils/request'

export default {
  // 查询菜单列表
  getList (query) {
    return service.request({
      method: 'post',
      url: '/system/menu/search',
      data: query
    })
  },
  // 新增
  add (data) {
    return service.request({
      method: 'post',
      url: '/system/menu',
      data
    })
  },
  // 查询详情
  getById (id) {
    return service.request({
      method: 'get',
      url: `/system/menu/${id}`
    })
  },
  // 更新
  update (data) {
    return service.request({
      method: 'put',
      url: '/system/menu',
      data
    })
  },
  // 删除
  deleteById (id) {
    return service.request({
      method: 'delete',
      url: `system/menu/${id}`
    })
  }
}
