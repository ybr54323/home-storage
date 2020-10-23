/**
 * 处理用户和群组的关系
 */

import http from "@/sevice/http";

export function getGroup() {
  return http({
    url: '/group_user',
    method: 'get'
  })
}
