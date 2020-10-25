<template>
  <div>
    <van-nav-bar
        v-if="this.$route.path!=='/login'"
        :title="title"
        :right-text="rightText"
        @click-right="onClickRight"
        @click-left="onClickLeft"
        left-arrow
    >
    </van-nav-bar>
    <van-nav-bar
        v-else
        :title="title"
    >
    </van-nav-bar>
  </div>
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
