<template>
  <div>
    <p>Home</p>
    <nuxt-link to="/auth">Auth</nuxt-link>
    <nuxt-link to="/register">Register</nuxt-link>
    <nuxt-link to="/requests">Requests</nuxt-link>
  </div>
</template>

<style scoped>
div {
  display: grid;
  place-content: center;
  height: calc(100vh - 80px);
}
</style>
