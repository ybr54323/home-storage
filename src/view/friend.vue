<template>
  <div>
    <nav-bar :on-click-right="onClickRight" :right-text="'新的朋友'">
    </nav-bar>
    <div class="con">
      <div class="con search-con" @click="viewNewFriendApply">
        <div class="icon-rect">
          <van-icon name="friends-o" size="25" :badge="friendUnread||null" color="#fff"/>
        </div>
        <span class="text-search">手机号搜索: </span> {{searchInput}}
      </div>
      <div class="con search-con" @click="viewNewGroupApply">
        <div class="icon-rect">
          <van-icon name="friends-o" size="25" :badge="friendUnread||null" color="#fff"/>
        </div>
        <span class="text-search">手机号搜索: </span> {{searchInput}}
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from '../components/navBar'
import {mapGetters} from 'vuex'
import {viewChatMessage, viewFriendMessage, viewGroupMessage} from "@/sevice/message";

export default {
  name: "friend",
  data() {
    return {
      friends: [{}, {}]
    }
  },
  computed: {
    ...mapGetters([
      'friendUnread',
      'groupUnread',
      'friendUnread',
      'groupMessage'
    ])
  },
  components: {
    NavBar
  },
  methods: {
    onClickRight() {
      this.$router.push({path: '/add_friend'})
    },
    viewNewFriendApply() {


    },
    viewNewGroupApply() {

    }
  }

}
</script>

<style scoped>

</style>
