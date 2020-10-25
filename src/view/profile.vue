<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <profile-bar :profile="profile" :size="50">
      </profile-bar>
      <br>
      <div v-if="type===2">
        <van-button class="btn" @click="addFriend" block round type="primary">加为好友</van-button>
      </div>
      <div v-if="type===3">
        <van-button class="btn" block round type="primary">申请加入群组</van-button>
      </div>
      <!--      处理好友申请-->
      <div v-if="type===4">
        <van-button class="btn" @click="permitAddFriend" block round type="primary">通过好友申请</van-button>
        <van-button class="btn" @click="rejectAddFriend" block round type="primary">拒绝</van-button>
      </div>
      <!--      处理群组申请-->
      <div v-if="type===5">
        <van-button class="btn" @click="permitJoinGroup" block round type="primary">同意群组邀请</van-button>
        <van-button class="btn" @click="rejectJoinGroup" block round type="primary">拒绝</van-button>
      </div>
      <div v-if="type===6">
        <van-button class="btn" @click="sendMessage" block round type="primary">发送消息</van-button>
      </div>
      <div v-if="type===7">
        <van-collapse v-model="activeType">
          <van-collapse-item title="空间物品" name="2">内容</van-collapse-item>
          <van-collapse-item title="空间成员" name="1">内容</van-collapse-item>
        </van-collapse>
        <br>
        <van-button class="btn" @click="editGood" block round type="primary">编辑物品</van-button>
        <van-button class="btn" @click="editGroupMate" block round type="primary">编辑成员</van-button>
      </div>
    </div>
  </div>

</template>

<script>
import url from '../assets/sand.jpg'
import {
  createChatMessage,
  createFriendMessage,
  createGroupMessage,
  handleFriendMessage,
  handleGroupMessage
} from '@/sevice/message'
import ProfileBar from '../components/profileBar'
import {mapGetters} from 'vuex'

export default {
  name: "profile",
  data() {
    return {
      // 1. 聊天消息 2.好友申请 3.群组邀请 4.处理好友申请 5.处理群组申请 6. 发消息
      type: 0,
      profile: {},
      activeType: []
    }
  },
  components: {
    ProfileBar
  },
  created() {
    this.init()
  },
  computed: {
    ...mapGetters(['userInfo', 'friend'])
  },
  methods: {
    editGood() {

    },
    editGroupMate() {

    },
    init() {
      const {type, id, name, avatarUrl, messageId, sourceUserId, sourceUserAvatarUrl, des} = this.$route.query
      this.type = +type
      this.profile = {
        id,
        name,
        avatarUrl,
        messageId,
        sourceUserId,
        sourceUserAvatarUrl,
        des
      }
    },
    // 6
    sendMessage() {

    },
    permitAddFriend() {
      handleFriendMessage({
        message_id: this.profile.messageId,
        answer: 1,
        source_user_id: this.profile.id
      })
          .then(res => {
            const {code} = res
            if (code === 200) {
              this.type = 6
            }
          })
    },
    rejectAddFriend() {
    },
    // 同意加入群组
    permitJoinGroup() {
      const {sourceUserId, id, messageId, sourceUserName} = this.profile
      debugger
      handleGroupMessage({
        group_id: id,
        source_user_id: sourceUserId,
        answer: 1,
        message_id: messageId
      })
          .then(res => {
            debugger
            this.$socket.emit('permitJoinGroup', {
              query: {
                group_id: id,
                source_user_id: sourceUserId,
                // source_user_name: sourceUserName,
                target_user_id: this.userInfo.id,
                target_user_name: this.userInfo.name
              }
            })
          })
    },
    // 不进组
    rejectJoinGroup() {
      const {sourceUserId, id, messageId, sourceUserName} = this.profile
      handleGroupMessage({
        group_id: id,
        source_user_id: sourceUserId,
        answer: 2,
        message_id: messageId
      })
          .then(res => {
            debugger
            this.$socket.emit('rejectJoinGroup', {
              query: {
                group_id: id,
                source_user_id: sourceUserId,
                // source_user_name: sourceUserName,
                target_user_id: this.userInfo.id,
                target_user_name: this.userInfo.name
              }
            })
          })
    },
    addFriend() {
      // 1. 聊天消息 2.好友申请 3.群组邀请
      const {id} = this.profile
      createFriendMessage({
        target_user_id: id,
      })
          .then(res => {
            this.$socket.emit('addFriend', {
              query: {
                source_user_id: this.userInfo.id,
                target_user_id: id
              }
            })
          })
          .catch()
    }
  },
  mounted() {

  },
}
</script>

<style scoped>
.profile-box {
  display: flex;
  align-items: center;
}

.img-avatar {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: scale-down;
}

.text-name {
  margin: 0 0 0 10px;
}

.btn {
  margin: 10px 0;
}

</style>
