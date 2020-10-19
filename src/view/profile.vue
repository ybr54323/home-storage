<template>
  <div class="con">
    <img src="" alt="avatar" class="img-avatar">
    <span>{{name}}</span>
    <div v-if="type==='user'">
      <van-button block round type="primary">加为好友</van-button>
    </div>
    <div v-if="type==='group'">
      <van-button block round type="primary">申请加入群组</van-button>
    </div>
  </div>
</template>

<script>
import {getUserDetail} from '../sevice/user'
import {message} from '../sevice/message'

export default {
  name: "profile",
  data() {
    return {
      type: 'user',
      profile: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    getUserInfo() {
    },
    init() {
      const {type, id, name, avatarUrl} = this.$route.query
      this.type = type
      this.profile = {
        id,
        name,
        avatarUrl
      }
    },
    onAdd() {
      // 1. 聊天消息 2.好友申请 3.群组邀请
      const {type} = this
      if (type === 2) {
        const {id} = this.profile
        message({
          type,
          id
        })
            .then(res => {
              debugger
            })
            .catch()
      } else if (type === 3) {
        // TODO
      }
    }
  },
  mounted() {

  },
}
</script>

<style scoped>

</style>
