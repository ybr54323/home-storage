<template>
  <van-cell>
    <div class="profile-bar" @click="onClick">
      <van-image
          :src="profile.avatarUrl ||defaultUrl" alt="avatar"
          :width="size"
          :height="size"
          lazy-load
          fit="cover"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20"/>
        </template>
      </van-image>
      <span class="text-name">{{profile.name}}</span>
      <span class="text-des">{{profile.des}}</span>
      <slot name="pending"></slot>
    </div>

  </van-cell>
</template>

<script>
import url from '../assets/sand.jpg'

export default {
  props: {
    profile: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    size: {
      type: Number,
      default() {
        return 50
      }
    }
  },
  name: "profileBar",
  data() {
    return {
      defaultUrl: url
    }
  },
  methods: {
    onClick() {
      const {profile} = this
      this.$emit('profile-detail-click', {
        id: profile.id,
        avatarUrl: profile.avatarUrl,
        name: profile.name,
        messageId: profile.messageId,
        sourceUserId: profile.sourceUserId || '',
        sourceUserAvatar: profile.sourceUserAvatar || '',
        sourceUserName: profile.sourceUserName || ''
      })
    }
  }
}
</script>

<style scoped>
.profile-bar {
  display: flex;
  align-items: center;
}


.text-name {
  margin: 0 0 0 10px;
  /*flex: 1;*/
}

.text-des {
  margin: 0 0 0 20px;
}

</style>
