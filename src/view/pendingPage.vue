<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <div v-if="type===1">
        <div class="op-con" v-for="message in friendMessage" :key="message.id">
          <profile-bar :profile="{
          id: message.source_user_id,
          name: message.source_user_name,
          avatarUrl: message.source_user_avatar_url,
          messageId: message.id
        }"
                       @profile-detail-click="onViewFriendDetail"
          >
            <span class="text-desc">等待验证</span>
          </profile-bar>
        </div>
      </div>
      <div v-if="type===2">
        <div class="op-con" v-for="message in groupMessage" :key="message.id">
          <profile-bar :profile="{
          id: message.group_id,
          name: message.group_name,
          avatarUrl: message.group_avatar,
          messageId: message.id,
          sourceUserId: message.source_user_id,
          sourceUserAvatar: message.source_user_avatar_url,
          sourceUserName: message.source_user_name
        }"
                       @profile-detail-click="onViewGroupDetail"
          >
            <div>
              <profile-bar :profile="{
              id: message.source_user_id,
              name: message.source_user_name,
              avatarUrl: message.source_user_avatar_url,
              messageId: message.id
              }"
                           :size="30"
              >
                邀请您加入
              </profile-bar>
            </div>
          </profile-bar>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ProfileBar from "@/components/profileBar";
import {mapGetters} from 'vuex'
import {viewFriendMessage, viewGroupMessage} from "@/sevice/message";

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
    this.$route.meta.title = this.type === 2 ? '待通过的群组邀请申请' : this.type === 1 ? '待通过的好友申请邀请' : ''
    this.init()
  },
  components: {
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
    onViewGroupDetail(group) {
      // id -> group_id
      const {id, name, avatarUrl, messageId, sourceUserId, sourceUserAvatar} = group;
      this.$router.push({
        path: '/profile',
        query: {id, name, avatarUrl, messageId, sourceUserId, sourceUserAvatar, type: 5}
      })
    },
    onViewFriendDetail(user) {
      const {id, name, avatarUrl, messageId} = user
      this.$router.push({path: '/profile', query: {id, name, avatarUrl, messageId, type: 4}})
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
        this.viewGroupMessage()
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
