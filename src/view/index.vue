<template>
  <div>
    <nav-bar></nav-bar>
    <div class="con"></div>
  </div>
</template>

<script>
import NavBar from '../components/navBar'

export default {
  name: "Index",
  data() {
    return {
      active: 'home'
    }
  },
  components: {
    NavBar
  },
  created() {
    window.test = this
  }
}
</script>

<style scoped>

</style>
