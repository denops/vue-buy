<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  async created() {
    const res = await this.$axios.get('/api/authapi');
    console.log(res)
  },
}
</script>

