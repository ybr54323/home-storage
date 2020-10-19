<template>
  <div>
    <van-nav-bar
        title="通讯录"
        left-arrow
    >
      <template #right>
        <router-link to="/search">
          <van-icon name="search" size="18"></van-icon>
        </router-link>
      </template>
    </van-nav-bar>
    <van-search autofocus v-model="form.searchInput" placeholder="请输入搜索关键词"/>
    <div class="con">


    </div>

  </div>
</template>

<script>

export default {
  name: "search",
  data() {
    return {
      form: {
        searchInput: ''
      }
    }
  },
  created() {

  },
  methods: {}


}
</script>

<style scoped>

</style>
