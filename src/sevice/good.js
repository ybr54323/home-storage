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

export function getGoodDetail(good_id) {
  return http({
    url: '/good/detail/' + good_id,
    method: 'get',
  })
}

export function editGood({
                           good_id,
                           name,
                           des,
                           imgUrls
                         }) {
  return http({
    url: '/good/edit',
    method: 'post',
    data: {
      good_id,
      name,
      des,
      imgUrls
    }
  })
}