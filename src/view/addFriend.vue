<template>
  <div class="">
    <van-search v-model="searchInput" placeholder="请输入用户手机号 / 用户名"/>
    <div class="con search-con" @click="searchByPhone" v-if="searchInput">
      <div class="icon-rect">
        <van-icon name="search" size="25" color="#fff"/>
      </div>
      <span class="text-search">手机号搜索: </span> {{searchInput}}
    </div>
    <div class="con" v-if="done">
      <profile-bar
          v-if="res"
          :id="res.id"
          :avatar-url="res.avatar_url"
          :name="res.name"
          @profile-detail-click="onClick"
      ></profile-bar>
      <van-empty v-else description="没有搜索到"></van-empty>
    </div>
  </div>

</template>

<script>
import {searchByPhone, searchByName} from "@/sevice/user";
import ProfileBar from '../components/profileBar'

export default {
  name: "addFriend",
  data() {
    return {
      done: 0,
      searchInput: '',
      res: null
    }
  },
  components: {
    ProfileBar
  },
  methods: {
    searchByPhone() {
      searchByPhone(this.searchInput)
          .then(res => {
            const {data: {user}} = res
            this.done = 1
            this.res = user
          })
          .catch()
    },
    searchByName() {
      searchByName(this.searchInput)
          .then()
          .catch()
    },
    onClick(user) {
      this.$router.push({
        path: '/profile',
        query: {
          type: 'user',
          ...user
        }
      })
    }
  }
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
