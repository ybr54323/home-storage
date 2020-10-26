import http from './http'

// 获取群组下的物品
export function getGroupGood(group_id) {
  return http({
    url: '/group_good/' + group_id,
    method: 'get'
  })
}
