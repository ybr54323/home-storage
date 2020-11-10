<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="con">
        <div class="good-bar">
          {{userGood}}
        </div>
        <van-collapse v-model="activeNames">
          <van-collapse-item title="你的物品" name="good">
            <profile-bar v-for="g in userGood" :key="g.id" :profile="{
                            id: g.id,
                            name: g.name,
                            avatarUrl: g.good_img_url,
                            des: g.des
                          }"
                         @profile-detail-click="onViewGoodDetail(g)"
            >
            </profile-bar>
          </van-collapse-item>
        </van-collapse>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ProfileBar from '../components/profileBar'

export default {
  name: "Index",
  data() {
    return {
      isLoading: false,
      activeNames: ['good']
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
  methods: {
    onRefresh() {

    },
    onViewGoodDetail(good) {
      const {id, name, des, good_img_url, create_date, delete_date, owner_user_id} = good
      this.$router.push({
        path: '/good_detail',
        query: {
          id,
          name,
          des,
          good_img_url,
          create_date,
          delete_date,
          owner_user_id
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
