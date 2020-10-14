import axios from 'axios';
import {Toast, Dialog} from 'vant';
import store from '../store/index'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 30000 // 请求超时时间
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
    Toast.clear();
    if (response.status === 200) {
      if (response.data.code === 401) { // 未登录
        store.commit('setShowTarBar', false)
        window.history.href = window.location.host + '/#/login'
        Toast.fail('请先登录')
        return Promise.reject(response.data)
      } else if (response.data.code === 402) { // 参数错误
        Toast.fail('参数错误')
        return Promise.reject(response.data)
      }
      Toast.success(response.data.msg)
      return Promise.resolve(response.data)
    }
  },
  error => {
    Toast.clear();
    Toast.fail(error.response.data.message);
    return Promise.reject(error);
  }
);

export default service;
