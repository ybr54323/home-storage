<template>
  <div class="">
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <van-search v-model="searchInput" placeholder="请输入用户手机号 / 用户名"/>
    <van-cell @click="searchByPhone" v-if="searchInput">
      <div class="icon-rect">
        <van-icon name="search" size="25" color="#fff"/>
      </div>
      <span class="text-search">手机号搜索: </span> {{searchInput}}
    </van-cell>
    <div class="con" v-if="done">
      <profile-bar
          v-if="res"
          :profile="res"
          @profile-detail-click="onClick"
      ></profile-bar>
      <van-empty v-else description="没有搜索到"></van-empty>
    </div>
  </div>

</template>

<script>
import {searchByPhone, searchByName} from "@/sevice/user";
import ProfileBar from '../components/profileBar'
import {mapGetters} from 'vuex'

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
    ProfileBar,
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'friend'
    ])
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
    onClick(user) {
      const {id} = user
      // 检查是否为自己
      const isMe = this.userInfo.id === id
      // 检查是否已经为好友
      const isFriend = this.friend.some(f => {
        return f.id === id
      })
      if (isMe) {
        this.$router.push({
          path: '/mine'
        })
        return
      }
      if (isFriend) {
        this.$router.push({
          path: '/profile',
          query: {
            type: '6',
            ...user
          }
        })
        return
      }
      this.$router.push({
        path: '/profile',
        query: {
          type: '2',
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
