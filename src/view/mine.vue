<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <profile-bar :profile="userInfo" :size="100"></profile-bar>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ProfileBar from '../components/profileBar'

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
  components: {
    ProfileBar
  }
}
</script>

<style scoped>

</style>
