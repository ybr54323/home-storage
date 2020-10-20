<template>
  <div id="app">
    {{userInfo}}
    <router-view></router-view>
    <van-tabbar v-if="hasTabBarRoute.indexOf($route.path)>=0" route active-color="#07c160" inactive-color="#000">
      <van-tabbar-item to="/" replace icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/friend" icon="friends-o" :badge="chatUnread || null">通讯录</van-tabbar-item>
      <van-tabbar-item to="/mine" replace icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
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
    if (!this.userInfo.id) {
      this.$router.push({path: '/login'})
    } else {

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
      'groupUnread'
    ]),
  },
  methods: {
    ...mapMutations([
      'setShowTarBar',
      'setChatMessage',
      'setFriendMessage',
      'setGroupMessage',
      'setChatUnread',
      'setFriendUnread',
      'setGroupUnread'
    ]),
    getAllMessage() {
      getAllMessage()
          .then(res => {
            const {chatMessage, friendMessage, groupMessage} = res
            const unreadCount = (messages) => {
              let count = 0
              messages.forEach(message => {
                message.is_read === 0 && count++
              })
            }
            this.setChatMessage(chatMessage)
            this.setFriendMessage(friendMessage)
            this.setGroupMessage(groupMessage)

            this.setChatUnread(unreadCount(chatMessage))
            this.setFriendUnread(unreadCount(friendMessage))
            this.setGroupUnread(unreadCount(groupMessage))

          })
          .catch()
    }
  },
  sockets: {
    connect() {
      const sk = this.$socket
      const {id: client} = sk
      console.log('#connect,', client, sk);

      // 监听自身 id 以实现 p2p 通讯
      this.sockets.subscribe(client, msg => {
        debugger
        console.log('#receive', msg)
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
