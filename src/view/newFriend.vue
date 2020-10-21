<template>
  <div>
    <nav-bar></nav-bar>
    <div class="con">
      <div v-if="type===1">
        <div class="op-con" v-for="message in friendMessage" :key="message.id">
          <profile-bar :profile="{
          id: message.source_user_id,
          name: message.source_user_name,
          avatarUrl: message.source_user_avatar_url,
          message_id: message.id
        }"
                       @profile-detail-click="onViewDetail"
          >
            <span class="text-desc">等待验证</span>
          </profile-bar>
        </div>
      </div>
      <div v-else-if="type===2">
        <div class="op-con" v-for="message in groupMessage" :key="message.id">
          <profile-bar :profile="{
          id: message.group_id,
          name: message.group_name,
          avatarUrl: message.group_avatar,
          message_id: message.id
        }"
                       @profile-detail-click="onViewDetail"
          >
            <span class="text-desc">等待验证</span>
          </profile-bar>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/navBar'
import ProfileBar from "@/components/profileBar";
import {mapGetters} from 'vuex'
import {viewFriendMessage} from "@/sevice/message";

export default {
  name: "newFriend",
  data() {
    return {
      // 1.好友邀请 2.群组邀请
      type: 0
    }
  },
  created() {
    const {query: {type}} = this.$route
    this.type = +type
    this.init()
  },
  components: {
    NavBar,
    ProfileBar
  },
  computed: {
    ...mapGetters([
      'friendMessage',
      'friendUnread',
      'groupUnread',
      'groupMessage'
    ])
  },
  methods: {
    onViewDetail(user) {
      const {id, name, avatarUrl, message_id} = user

      this.$router.push({path: '/profile', query: {id, name, avatarUrl, message_id, type: 4}})
    },
    viewFriendMessage() {
      viewFriendMessage()
          .then()
          .catch()
    },
    init() {
      if (this.friendUnread && this.type === 1) {
        this.viewFriendMessage()
      } else if (this.groupUnread && this.type === 2) {

      }
    }
  }
}
</script>

<style scoped>
.text-desc {
  align-self: center;
}
</style>
