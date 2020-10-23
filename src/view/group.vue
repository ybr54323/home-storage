<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <van-cell class="search-con" @click="viewNewGroupApply">
        <div class="icon-rect">
          <van-icon name="home-o" size="25" :badge="groupUnread||null" color="#fff"/>
        </div>
        <span class="text-search">新的群组</span>
      </van-cell>
      <br>
      <template v-if="group.length">
        <profile-bar
            v-for="f in group" :key="f.id"
            :profile="{
              id: f.id,
              name: f.name,
              avatarUrl: f.group_avatar_url,
            }"
            @profile-detail-click="viewGroupProfile"
        ></profile-bar>
      </template>
      <template v-else>
        <van-empty description="暂无空间"/>
      </template>
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
      'groupUnread',
      'group'
    ])
  },
  components: {
    ProfileBar
  },
  created() {
  },
  methods: {
    ...mapActions([
      'getFriend'
    ]),
    ...mapMutations([
      'setFriend'
    ]),
    // 查看空间详情
    viewGroupProfile(profile) {
      const {id, name, avatarUrl} = profile;
      this.$router.push({
        path: 'profile',
        query: {
          type: '7',
          id,
          name,
          avatarUrl
        }
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
