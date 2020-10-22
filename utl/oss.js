import OSS from 'ali-oss'
import {getAssumeRole} from "@/sevice/oss";

let client = null
const Credentials = {
  AccessKeyId: '',
  AccessKeySecret: '',
  SecurityToken: '',
  Expiration: ''
}

const initClient = (cb) => {
  getAssumeRole()
    .then(res => {
      const {AccessKeyId, AccessKeySecret, SecurityToken, Expiration} = res.data.Credentials || {}
      const c = Credentials
      c.AccessKeyId = AccessKeyId
      c.AccessKeySecret = AccessKeySecret
      c.SecurityToken = SecurityToken
      c.Expiration = Expiration
      client = new OSS({
        accessKeyId: AccessKeyId,
        accessKeySecret: AccessKeySecret,
        stsToken: SecurityToken,
        region: 'oss-cn-shenzhen',
        bucket: 'ybr54323'
      })
      cb(client)
    })
}

const isWithinExpiration = () => {
  return !!Credentials.AccessKeyId || new Date(Credentials.Expiration) > new Date()
}


export const getClient = (cb) => {
  console.log(isWithinExpiration())
  if (isWithinExpiration()) {
    cb(client)
  } else {
    initClient(cb)
  }
}

