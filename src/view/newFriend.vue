<template>
  <div>
    <nav-bar></nav-bar>
    <div class="con">
      <div class="op-con" v-for="message in friendMessage" :key="message.id">
        <profile-bar :profile="{
          id: message.source_user_id,
          name: message.source_user_name,
          avatarUrl: message.source_user_avatar_url
        }"
                     @profile-detail-click="onViewDetail"
        ></profile-bar>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/navBar'
import ProfileBar from "@/components/profileBar";
import {mapGetters} from 'vuex'

export default {
  name: "newFriend",
  data() {
    return {}
  },
  components: {
    NavBar,
    ProfileBar
  },
  computed: {
    ...mapGetters([
      'friendMessage'
    ])
  },
  methods: {
    onViewDetail(e, user) {
      const {id, name, avatarUrl} = user
      this.$router.push({path: '/profile', query: {id, name, avatarUrl, type: 4}})
    }
  }
}
</script>

<style scoped>

</style>
