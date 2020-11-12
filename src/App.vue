<template>
  <div id="app">
    <process-bar
      :height="10"
    ></process-bar>
    <!--    <h1>id</h1>-->
    <!--    <h2>{{userInfo.id}}</h2>-->
    <!--    <h1>friendUnread</h1>-->
    <!--    <h2>{{friendUnread}}</h2>-->
    <!--    <h1>friend</h1>-->
    <!--    <h2>{{friend}}</h2>-->
    <!--    <h1>friendMessage</h1>-->
    <!--    <h2>{{friendMessage}}</h2>-->
    <!--    <h1>group</h1>-->
    <!--    <h2>{{group}}</h2>-->
    <!--        <h1>groupMessage</h1>-->
    <!--        <h2>{{groupMessage}}</h2>-->
    <!--        顶栏-->
    <nav-bar
        class="nav-bar"
        :title="$route.meta.title"
        :on-click-right="operationMap.get($route.path).onClickRight || void 0"
        :right-text="operationMap.get($route.path).rightText || void 0"
        slot="nav-bar"></nav-bar>
    <!--        滚动通知-->
    <van-notice-bar
        v-if="notice && hasNotice"
        slot="notice"
        left-icon="volume-o"
        :text="notice"
    />
    <!--    <transition name="van-fade">-->
    <router-view>
    </router-view>
    <!--    </transition>-->
    <!--    左侧弹窗-->
    <van-popup
        v-model="showPopUp"
        position="left"
        :style="{ width: '30%', height: '100vh'}"
    >
      <van-cell title="新建群组" @click="skipNewGroup"></van-cell>
      <van-cell title="新建物品" @click="skipNewGood"></van-cell>
    </van-popup>
    <van-search @click="skipSearchGood" placeholder="搜索物品"/>
    <van-tabbar v-if="hasTabBar" route active-color="#07c160" inactive-color="#000">
      <van-tabbar-item to="/" replace icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/group" icon="send-gift-o" :badge="groupUnread || null">你的空间</van-tabbar-item>
      <van-tabbar-item to="/friend" icon="friends-o" :badge="friendUnread || null">通讯录</van-tabbar-item>
      <van-tabbar-item to="/mine" replace icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import NavBar from './components/navBar'
import ProcessBar from './components/processBar'
export default {
  name: 'App',
  data() {
    const hasTabBarRoute = [
      '/',
      '/group',
      '/friend',
      '/mine',
    ]
    const operationMap = new Map([
      ['/', {
        rightText: '+', onClickRight: () => {
          this.showPopUp = true
        }
      }],
      ['/group', {}],
      ['/friend', {
        rightText: '搜索好友', onClickRight: () => {
          this.$router.push({path: '/add_friend'})
        }
      }],
      ['/mine', {}],
      ['/login', {}],
      ['/search_good', {}],
      ['/add_friend', {}],
      ['/profile', {}],
      ['/pending_page', {}],
      ['/new_group', {}],
      ['/chat_room', {}],
      ['/new_good', {}],
      ['/edit_group', {}],
      ['/good_detail', {}],
      ['/edit_good', {}]
    ])
    return {
      hasTabBarRoute,
      showPopUp: false, // 左侧弹
      operationMap, // 操作map
    }
  },
  components: {
    NavBar,
    ProcessBar
  },
  created() {
    this.setShowTarBar(true)
    this.auth()
  },
  watch: {
    '$route.path': {
      handler(curPath, oldPath) {
        if (curPath === oldPath) return
        if (curPath === '/login') return
        if (curPath === '/') {
          this.getFriendMessage()
          this.getGroupMessage()
          this.getUserGood()
        }
        if (curPath === '/group') {
          this.getClientGroup()
        }
        if (curPath === '/friend') {
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
      'groupMessage',
      'friend',
      'group',
      'notice',
    ]),
    // hasNavBar() {
    //   return !/^\/login.*/.test(this.$route.path)
    // },
    hasNotice() {
      return !/^\/login.*/.test(this.$route.path)
    },
    hasTabBar() {
      return this.hasTabBarRoute.indexOf(this.$route.path) >= 0
    }
  },
  methods: {
    ...mapActions([
      'getFriend',
      'getFriendMessage',
      'getClientGroup', // 获取用户自己的群组
      'getGroupMessage',
      'getUserGood', // 获取用户自己的物品
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
      'setFriend',
      'setNotice'
    ]),
    skipSearchGood() {
      this.$router.push({path: '/search_good'})
    },
    skipNewGood() {
      this.$router.push({path: '/new_good'})
      this.showPopUp = false
    },
    skipNewGroup() {
      this.$router.push({path: '/new_group'})
      this.showPopUp = false
    },
    bindEnter() {

    },
    auth() {
      // if (!this.userInfo.id && !localStorage.getItem('userInfo')) {
      //   this.$router.push({path: '/login'})
      // } else {
      //   if (!this.userInfo.id) {
      //     const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      //     this.setUserInfo(userInfo)
      //   }
      // }
    },
  },
  sockets: {
    connect() {
      const sk = this.$socket
      const {id: client} = sk
      console.log('#connect,', client, sk);

      // 监听自身 id 以实现 p2p 通讯
      this.sockets.subscribe(client, sockMsg => {
        const {query: {type, msg}} = sockMsg
        switch (type) {
          case 'addFriend':
            this.setFriendUnread(++this.friendUnread)
            break
          case 'addGroup':
            this.setGroupUnread(++this.groupUnread)
            break
          case 'permitJoinGroup':
            this.setNotice(msg)
            break
          case 'rejectJoinGroup':
            this.setNotice(msg)
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

#app {
  position: relative;
  height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
}

.nav-bar {
  width: 100%;
  z-index: 2;
  position: fixed;
  background-color: #fff;
}
</style>
