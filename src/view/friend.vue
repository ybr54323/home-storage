<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <van-cell class="search-con" @click="viewNewFriendApply">
        <div class="icon-rect">
          <van-icon name="friends-o" size="25" :badge="friendUnread||null" color="#fff"/>
        </div>
        <span class="text-search">{{friendUnread ? '有新的好友申请待通过' : '查看过往的好友申请'}}</span>
      </van-cell>
      <br>
      <profile-bar
          v-for="f in friend" :key="f.id"
          :profile="{
              id: f.id,
              name: f.name,
              avatarUrl: f.avatar_url
            }"
          @profile-detail-click="onChat"
      ></profile-bar>
    </div>
  </div>
</template>

<script>
import ProfileBar from '../components/profileBar'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {viewChatMessage, viewFriendMessage, viewGroupMessage} from "@/sevice/message";
import {getFriend} from "@/sevice/friend";

export default {
  name: "friend",
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'friendUnread',
      'friendMessage',
      'friend'
    ])
  },
  components: {
    ProfileBar
  },
  created() {
    this.getFriend()
  },
  methods: {
    ...mapActions([
      'getFriend'
    ]),
    ...mapMutations([
      'setFriend'
    ]),
    onChat(profile) {
      this.$router.push({
        path: '/chat_room', query: {}
      })
    },
    onClickRight() {
      this.$router.push({path: '/add_friend'})
    },
    viewNewFriendApply() {
      this.$router.push({path: '/pending_page', query: {type: 1}})
    },
    viewNewGroupApply() {
      this.$router.push({path: '/pending_page', query: {type: 2}})
    }
  }

}
</script>

<style scoped>
.search-con {
  display: flex;
  align-items: center;
}

.search-con:active {
  background-color: darkgrey;
}

.icon-rect {
  height: 50px;
  width: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: lawngreen;
  border-radius: 10px;
}

.text-search {
  margin: 0 0 0 10px;
}
</style>
