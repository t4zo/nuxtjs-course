<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
export default {
  async beforeCreate() {
    await this.$store.dispatch('auth/autoLogin');
  }
}
</script>
