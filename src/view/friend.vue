<template>
  <div class="con">
    <van-button
        @click="this.$router.push({path: '/add_friend'})"
        icon="https://img.yzcdn.cn/vant/user-active.png"
        type="info">
      新的朋友
    </van-button>
    <div>
      ...
    </div>
  </div>
</template>

<script>
export default {
  name: "friend",
  data() {
    return {
      friends: [{}, {}]
    }
  }
}
</script>

<style scoped>

</style>
