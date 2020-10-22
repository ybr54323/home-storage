import http from './http'

export const getAssumeRole = () => {
  return http({
    url: '/assume_rule',
    method: 'get',
  })
}

