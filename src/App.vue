<template>
  <div id="app">
    {{$route}}
    <van-nav-bar
        :title="op.title||''"
        :right-text="op.rightText||''"
        :left-text="op.leftText||''"
        @click-right="op.onRightClick||''"
        @click-left="op.onLeftClick||''"
        left-arrow
    >
    </van-nav-bar>
    <router-view></router-view>
    <van-tabbar v-if="hasTabBarRoute.indexOf($route.path)>=0" route active-color="#07c160" inactive-color="#000">
      <van-tabbar-item to="/" replace icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/friend" icon="friends-o">通讯录</van-tabbar-item>
      <!--      <van-tabbar-item icon="search">消息</van-tabbar-item>-->
      <van-tabbar-item to="/mine" replace icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

const {log} = console

export default {
  name: 'App',
  data() {
    const back = () => eval('this.$router.go(-1)')

    const operationMap = new Map([
      ['/', {title: '首页', onRightClick: back, onLeftClick: back}],
      ['/friend', {
        title: '通讯录',
        rightText: '添加好友',
        onRightClick: () => this.$router.push({path: '/add_friend'}),
        onLeftClick: back
      }],
      ['/add_friend', {title: '添加', onLeftClick: back}],
      ['/mine', {title: '我的', onRightClick: back, onLeftClick: back}],
      ['/profile', {title: '详情', onRightClick: '', onLeftClick: back}],
      ['/login', {title: '登录', onLeftClick: back}]
    ])
    const hasTabBarRoute = [
      '/',
      '/friend',
      '/mine',
    ]
    return {
      hasTabBarRoute,
      operationMap
    }
  },
  created() {
    this.setShowTarBar(true)
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['userInfo', 'appStatus']),
    op() {
      return this.operationMap.get(this.$route.path) || {}
    }
  },
  methods: {
    ...mapMutations(['setShowTarBar'])
  },
  sockets: {
    connect() {
      const sk = this.$socket
      const {id: client} = sk
      log('#connect,', client, sk);

      // 监听自身 id 以实现 p2p 通讯
      this.sockets.subscribe(client, msg => {

        log('#receive', msg)
      })
    },
    exchange(data) {
    },
    disconnect() {

    },
    disconnecting() {

    },
    error() {

    }
  }
}
</script>

<style>
@import "./common/css/common.css";

</style>
