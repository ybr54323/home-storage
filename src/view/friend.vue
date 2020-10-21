<template>
  <div>
    <nav-bar :on-click-right="onClickRight" :right-text="'新的朋友'">
    </nav-bar>
    <div class="con">
      <van-cell class="search-con" @click="viewNewFriendApply">
        <div class="icon-rect">
          <van-icon name="friends-o" size="25" :badge="friendUnread||null" color="#fff"/>
        </div>
        <span class="text-search">新的朋友</span>
      </van-cell>
      <van-cell class="search-con" @click="viewNewGroupApply">
        <div class="icon-rect">
          <van-icon name="home-o" size="25" :badge="groupUnread||null" color="#fff"/>
        </div>
        <span class="text-search">新的群组</span>
      </van-cell>
      <van-index-bar>
        <van-index-anchor index="A"/>
        <van-cell v-for="f in friend" :key="f.id">
          <profile-bar :profile="{
              id: f.id,
              name: f.name,
              avatarUrl: f.avatar_url
            }"
                       @profile-detail-click="onChat"
          ></profile-bar>
        </van-cell>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/navBar'
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
      'groupUnread',
      'friendUnread',
      'friendMessage',
      'friend'
    ])
  },
  components: {
    NavBar,
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
    },
    onClickRight() {
      this.$router.push({path: '/add_friend'})
    },
    viewNewFriendApply() {
      this.$router.push({path: '/new_friend', query: {type: 1}})
    },
    viewNewGroupApply() {
      this.$router.push({path: '/new_friend', query: {type: 2}})
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
