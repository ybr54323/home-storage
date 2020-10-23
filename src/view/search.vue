<template>
  <div>
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
