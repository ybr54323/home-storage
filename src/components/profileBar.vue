<template>
  <div class="profile-bar" @click="onClick($event, profile.id)">
    <img :src="profile.avatarUrl ||defaultUrl" alt="avatar" :class="[size===50?'img-avatar':'img-avatar-big']">
    <span class="text-name">{{profile.name}}</span>
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
    onClick(e) {
      const {profile} = this
      this.$emit('profile-detail-click', {
        id: profile.id,
        avatarUrl: profile.avatarUrl,
        name: profile.name
      })
    }
  }
}
</script>

<style scoped>
.profile-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid gainsboro;
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
}

</style>
