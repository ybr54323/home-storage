<template>
  <div class="profile-bar" @click="onClick($event, id)">
    <img :src="avatarUrl" alt="avatar" class="img-avatar">
    <span>{{name}}</span>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
    avatarUrl: {
      type: String,
      default() {
        return '../assets/sand.jpg'
      }
    },
    name: {
      type: String,
      default() {
        return 'name'
      }
    }
  },
  name: "profileBar",
  data() {
    return {}
  },
  methods: {
    onClick(e) {
      this.$emit('profile-detail-click', {
        id: this.id,
        avatarUrl: this.avatarUrl,
        name: this.name
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
</style>
