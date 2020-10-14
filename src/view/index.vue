<template>
  <div>
    index
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      active: 'home'
    }
  },
  created() {
    window.test = this
  }
}
</script>

<style scoped>

</style>
