<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <van-cell is-link>
        <van-image
            :src="userInfo.avatarUrl"
            width="100"
            height="100"
            lazy-load
            fit="cover"
        ></van-image>
      </van-cell>
      <van-cell is-link>{{useInfo.name}}</van-cell>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Mine",
  data() {
    return {}
  },
  created() {
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {}
}
</script>

<style scoped>

</style>
