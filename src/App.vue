<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-if="appStatus.showTarBar" route active-color="#07c160" inactive-color="#000">
      <van-tabbar-item to="/" replace icon="home-o">首页</van-tabbar-item>
      <!--      <van-tabbar-item icon="friends-o">通讯录</van-tabbar-item>-->
      <!--      <van-tabbar-item icon="search">消息</van-tabbar-item>-->
      <van-tabbar-item to="/mine" replace icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['userInfo', 'appStatus'])
  },
  methods: {},
  sockets: {
    connect() {
      const {id} = this.$socket
      this.sockets.subscribe(id, (msg) => {
      })
      console.log(this.$socket)
      this.$socket.emit('exchange', {id})
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
