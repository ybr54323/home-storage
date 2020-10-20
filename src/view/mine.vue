<template>
  <div>
    <nav-bar></nav-bar>
    <div class="con">
      <profile-bar :profile="userInfo" :size="100"></profile-bar>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NavBar from '../components/navBar'
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
    NavBar,
    ProfileBar
  }
}
</script>

<style scoped>

</style>
