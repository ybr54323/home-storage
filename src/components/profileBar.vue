<template>
  <div class="profile-bar" @click="onClick">
    <van-image
        :src="profile.avatarUrl ||defaultUrl" alt="avatar"
        :width="size"
        :height="size"
        lazy-load
        fit="scale-down"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20"/>
      </template>
    </van-image>
    <span class="text-name">{{profile.name}}</span>
    <slot></slot>
  </div>
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
        message_id: profile.message_id
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

.img-avatar {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: scale-down;
}

.img-avatar-big {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: scale-down;
}

.text-name {
  margin: 0 0 0 10px;
  flex: 1;
}

</style>
