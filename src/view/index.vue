<template>
  <div>
    <nav-bar :on-click-right="onClickRight" :right-text="'+'">
    </nav-bar>
    <div class="con">
      <van-popup
          v-model="show"
          position="left"
          :style="{ width: '30%', height: '100vh'}"
      >
        <van-cell title="新建群组" @click="newGroup"></van-cell>
      </van-popup>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/navBar'

export default {
  name: "Index",
  data() {
    return {
      show: false,

      active: 'home'
    }
  },
  components: {
    NavBar
  },
  created() {
  },
  methods: {
    onClickRight() {
      this.show = true
    },
    newGroup() {
      this.$router.push({path: '/new_group'})
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
