<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <div class="good-bar">
        {{userGood}}
        <profile-bar v-for="g in userGood" :key="g.id" :profile="{
          id: g.id,
          name: g.name,
          avatarUrl: g.good_avatar_url,
          des: g.des
        }">
        </profile-bar>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ProfileBar from '../components/profileBar'

export default {
  name: "Index",
  data() {
    return {
      show: false,
      active: 'home'
    }
  },
  components: {
    ProfileBar
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'userGood'
    ])
  },
  methods: {}
}
</script>

<style scoped>
.search-con {
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
}

.search-con:active {
  background-color: darkgrey;
}

.icon-rect {
  height: 50px;
  width: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: lawngreen;
  border-radius: 10px;
}

.text-search {
  margin: 0 0 0 10px;
}
</style>
