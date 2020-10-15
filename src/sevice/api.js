import http from "./http";

export function getZhenziCode({phone}) {
  return http({
    url: '/user/zhenzi_code/' + phone,
    method: 'get',
    params: {
      phone
    }
  })
}

export function register({username, phone}) {
  return http({
    url: '/user',
    method: 'get',
    data: {
      username,
      phone
    }
  })
}

export function login({account, pwd}) {
  return http({
    url: '/user/login',
    method: 'post',
    data: {
      account,
      pwd
    }
  })
}


export function forgetPwd({phone, code, pwd}) {
  return http({
    url: '/user/forget_pwd',
    method: 'post',
    data: {
      phone,
      code,
      pwd
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

