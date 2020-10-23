import http from './http'

export function createGood({name, des, imgUrls, groupIds}) {
  return http({
    url: '/good',
    method: 'post',
    data: {
      name,
      des,
      imgUrls,
      groupIds
    }
  })
}

export function getUserGood() {
  return http({
    url: '/good',
    method: 'get'
  })
}
