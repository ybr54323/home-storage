import http from './http'

export function createGroup(groupDTO) {
  return http({
    url: '/group',
    method: 'post',
    data: {
      ...groupDTO
    }
  })
}

export function getGroup() {
  return http({
    url: '/group',
    method: 'get'
  })
}
