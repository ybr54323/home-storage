<template>
  <div id="app">
    {{userInfo}}
    <br>
    friendUnread:
    <br>
    {{friendUnread}}
    <br>
    friendMessage:
    <br>
    {{friendMessage}}
    <br>
    friend
    {{friend}}
    <router-view></router-view>
    <van-tabbar v-if="hasTabBarRoute.indexOf($route.path)>=0" route active-color="#07c160" inactive-color="#000">
      <van-tabbar-item to="/" replace icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/friend" icon="friends-o" :badge="friendUnread || null">通讯录</van-tabbar-item>
      <van-tabbar-item to="/mine" replace icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {
  getAllMessage,
  getChatMessage,
  getFriendMessage,
  getGroupMessage,
} from "@/sevice/message";

export default {
  name: 'App',
  data() {
    const hasTabBarRoute = [
      '/',
      '/friend',
      '/mine',
    ]
    return {
      hasTabBarRoute,
    }
  },
  created() {
    this.setShowTarBar(true)
    this.auth()
  },
  watch: {
    '$route.path': {
      handler(curPath, oldPath) {
        if (curPath === oldPath) return
        if (curPath === '/') {
          this.getFriendMessage()
          this.getFriend()
        }
      },
      immediate: true
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'appStatus',
      'chatUnread',
      'friendUnread',
      'groupUnread',
      'friendMessage',
      'friend'
    ]),
  },
  methods: {
    ...mapActions([
      'getFriend',
      'getFriendMessage',
    ]),
    ...mapMutations([
      'setShowTarBar',
      'setChatMessage',
      'setFriendMessage',
      'setGroupMessage',
      'setChatUnread',
      'setFriendUnread',
      'setGroupUnread',
      'setUserInfo',
      'setFriend'
    ]),
    auth() {
      if (!this.userInfo.id && !localStorage.getItem('userInfo')) {
        this.$router.push({path: '/login'})
      } else {
        if (!this.userInfo.id) {
          const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          this.setUserInfo(userInfo)
        }
      }
    },
  },
  sockets: {
    connect() {
      const sk = this.$socket
      const {id: client} = sk
      console.log('#connect,', client, sk);

      // 监听自身 id 以实现 p2p 通讯
      this.sockets.subscribe(client, msg => {
        const {query: {type}} = msg
        switch (type) {
          case 'addFriend':
            this.setFriendUnread(++this.friendUnread)
            break
          case 'addGroup':
            this.setGroupUnread(++this.groupUnread)
            break
        }
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
