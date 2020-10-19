import http from "./http";

// 获取 注册 / 登录 的短信验证码
export function getRegisterOrLoginCode({phone}) {
  return http({
    url: '/user/register_or_login_code/' + phone,
    method: 'get',
  })
}

// 短信验证码 注册 / 登录 新用户-注册 老用户-直接登录
export function registerOrLogin({phone, code}) {
  return http({
    url: '/user/register_or_login',
    method: 'post',
    data: {
      phone,
      code
    }
  })
}

// 短信验证码 - 验证码通过 - 新用户 - 注册
export function register({username, phone, code}) {
  return http({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      phone,
      code
    }
  })
}


// 获取重设密码的短信验证码
export function getResetCode({phone}) {
  return http({
    url: '/user/pwd_code/' + phone,
    method: 'get',
  })
}

// 校验短信验证码-重设密码-登录
export function resetPwd({phone, code, pwd}) {
  return http({
    url: '/user/pwd',
    method: 'post',
    data: {
      phone,
      code,
      pwd
    }
  })
}

// 手机密码登录
export function phonePwdLogin({phone, pwd}) {
  return http({
    url: '/user/phone_pwd_login',
    method: 'post',
    data: {
      phone,
      pwd
    }
  })
}

// 通过手机号码搜索用户
export function searchByPhone(phone) {
  return http({
    url: '/user/' + phone,
    method: 'get',
  })
}

// 通过用户名搜索用户
export function searchByName(name) {
  return http({
    url: '/users/' + name,
    method: 'get',
  })
}

export function getUserDetail(id) {
  return http({
    url: '/user/detail/' + id,
    method: 'get'
  })
}
