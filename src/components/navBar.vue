<template>
  <van-nav-bar
      :title="title"
      :right-text="rightText"
      @click-right="onClickRight"
      @click-left="onClickLeft"
      left-arrow
  >
  </van-nav-bar>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    rightText: {
      type: String,
      required: false,
      default() {
        return ''
      }
    },
    onClickRight: {
      type: Function,
      required: false,
      default() {
        return ''
      }
    }
  },
  name: "navBar",
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
