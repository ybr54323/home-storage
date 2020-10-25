<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">

    </div>
  </div>

</template>

<script>
export default {
  name: "editGroup",
  data() {
    return {
      type: 1,
    }
  },
  created() {
    const {type} = this.$route.query
    this.type = +type
  },
  methods: {

  }
}
</script>

<style scoped>

</style>