import Vue from "vue";
import VueRouter from 'vue-router'

import Index from './view/index'
import Mine from './view/mine'
import Login from './view/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: '首页',
      requireLogin: true
    }
  }, {
    path: '/mine',
    name: 'Mine',
    component: Mine,
    meta: {
      title: '我',
      requireLogin: true
    }
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      requireLogin: false
    }
  }]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.meta.requireLogin && !localStorage.getItem("userInfo")) {
    next({
      name: 'Login', params: {
        step: 0
      }
    })
  } else next()
})

export default router

