import http from "./http";

export function getZhenziCode(phone) {
  return http({
    url: '/user/zhenzi_code/' + phone,
    method: 'get',
    params: {
      phone
    }
  })
}

export function login(params) {
  return http({
    url: '/user/login',
    method: 'post',
    data: {
      params
    }
  })
}

export function register(params) {
  return http({
    url: '/user',
    method: 'get',
    data: {
      params
    }
  })
}

export function searchUserByPhone(phone) {
  return http({
    url: '/user/' + phone,
    method: 'get',
    params: {
      phone
    }
  })
}

