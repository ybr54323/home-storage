/**
 * 处理用户和群组的关系
 */

import http from "@/sevice/http";

// 获取当前用户的组
export function getClientGroup() {
  return http({
    url: '/group_user',
    method: 'get'
  })
}

export function getGroupUser(group_id) {
  return http({
    url: '/group_user/' + group_id,
    method: 'get'
  })
}
