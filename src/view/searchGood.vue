<template>
  <div>
    <slot name="nav-bar"></slot>
    <van-search autofocus v-model="form.searchInput" placeholder="请输入搜索关键词"/>
    <div class="con" v-if="done">
      <template v-if="dynamicUserGood.length">
        <profile-bar
            v-for="good in dynamicUserGood"
            :key="good.id"
            :profile="good"
            @profile-detail-click="skipGoodDetail"
        ></profile-bar>
      </template>
    </div>
    <div v-else>
      <van-empty description="没有搜索到"></van-empty>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ProfileBar from '../components/profileBar'


export default {
  name: "search",
  data() {
    return {
      form: {
        searchInput: ''
      },
      done: false,
      dynamicUserGood: [],
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userGood']),
  },
  watch: {
    'form.searchInput': {
      handler(curVal, oldVal) {
        if (curVal === oldVal) return
        if (!curVal) {
          this.$set(this, 'dynamicUserGood', [])
          return
        }
        this.$set(this, 'dynamicUserGood', this.userGood.filter(good => {
          const {name = '', des = ''} = good
          return name.indexOf(curVal) >= 0 || des.indexOf(curVal)
        }))
      }
    }
  },
  components: {
    ProfileBar
  },
  created() {
    this.getUserGood()
  },
  methods: {
    ...mapActions(['getUserGood']),
    skipGoodDetail(g) {
      this.$router.push({
        path: '/good_detail',
        query: {

        }
      })
    },

  }


}
</script>

<style scoped>
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
