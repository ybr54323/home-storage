import Vue from "vue";
import VueRouter from 'vue-router'

import Index from './view/index'
import Mine from './view/mine'
import Login from './view/login'
import Friend from './view/friend'
import SearchGood from './view/searchGood'
import AddFriend from './view/addFriend'
import Profile from './view/profile'
import PendingPage from './view/pendingPage'
import NewGroup from './view/newGroup'
import Group from './view/group'
import ChatRoom from './view/chatRoom'
import NewGood from './view/newGood'
import EditGroup from './view/editGroup'
import GoodDetail from './view/goodDetail'
import EditGood from './view/editGood'

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
    path: '/search_good',
    name: 'SearchGood',
    component: SearchGood,
    meta: {
      title: '搜索物品',
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
  }, {
    path: '/pending_page',
    name: 'PendingPage',
    component: PendingPage,
    meta: {
      title: '待处理',
      requireLogin: true
    }
  }, {
    path: '/new_group',
    name: 'NewGroup',
    component: NewGroup,
    meta: {
      title: '新建群组',
      requireLogin: true
    }
  }, {
    path: '/group',
    name: 'Group',
    component: Group,
    meta: {
      title: '你的空间',
      requireLogin: true
    }

  }, {
    path: '/chat_room',
    name: 'ChatRoom',
    component: ChatRoom,
    meta: {
      title: '聊天',
      requireLogin: true
    }
  }, {

    path: '/new_good',
    name: 'NewGood',
    component: NewGood,
    meta: {
      title: '创建物品',
      requireLogin: true
    }
  }, {

    path: '/edit_group',
    name: 'EditGroup',
    component: EditGroup,
    meta: {
      title: '编辑空间',
      requireLogin: true
    }
  }, {
    path: '/good_detail',
    name: 'GoodDetail',
    component: GoodDetail,
    meta: {
      title: '物品详情',
      requireLogin: true
    }
  }, {
    path: '/edit_good',
    name: 'EditGood',
    component: EditGood,
    meta: {
      title: '编辑物品',
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
router.afterEach((to, from) => {
})
export default router

