import http from './http'

export function getFriend() {
  return http({
    url: '/friends',
    method: 'get'
  })
}
