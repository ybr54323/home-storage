import axios from 'axios';
import {Toast, Dialog} from 'vant';
import store from '../store/index'
import router from '../router';

/**
 * 401 未登录 - 跳到登录页
 * 402 参数错误 - 当前页处理
 * 408 未知错误 - 当前页处理
 * 500 后台代码错误
 */

axios.defaults.withCredentials = true // 允许跨域带cookie

const service = axios.create({
  baseURL: 'http://localhost:7001',
  timeout: 30000, // 请求超时时间
  withCredentials: true
});

service.interceptors.request.use(
  request => {
    if (!request.hideLoading) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
    }
    return request;
  }
);

service.interceptors.response.use(
  response => {
    const {code, data, msg} = response.data
    Toast.clear();
    if (code === 200) {
      Toast.success(msg)
      return Promise.resolve({code, data, msg})
    }
    if (code === 401) {
      store.commit('setShowTarBar', false)
      // router.push({
      //   name: 'login',
      //   query: {step: 0}
      // })
      // window.history.href = window.location.host + '/#/login?step=0'
      Toast.fail(msg)
      return Promise.reject(code)
    }
    if (code === 402 || code === 500) {
      Toast.fail(msg)
      return Promise.reject(code)
    }
  },
  error => {
    debugger
    Toast.clear();
    // Toast.fail(error.response.data.msg);
    return Promise.reject(error);
  }
);

export default service;
