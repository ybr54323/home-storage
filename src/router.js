import Vue from "vue";
import VueRouter from 'vue-router'

import Index from './view/index'
import Mine from './view/mine'
import Login from './view/login'
import Friend from './view/friend'
import Search from './view/search'
import AddFriend from './view/addFriend'
import Profile from './view/profile'

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
  }, {
    path: '/friend',
    name: 'Friend',
    component: Friend,
    meta: {
      title: '通讯录',
      requireLogin: true
    }
  }, {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      title: '搜索',
      requireLogin: true
    }
  }, {
    path: '/add_friend',
    name: 'AddFriend',
    component: AddFriend,
    meta: {
      title: '添加好友',
      requireLogin: true
    }
  }, {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '详情',
      requireLogin: true
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

