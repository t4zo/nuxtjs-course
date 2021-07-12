<template>
  <header>
    <nav>
      <h1><NuxtLink to='/'>Find a Coach</NuxtLink></h1>
      <ul>
        <li><NuxtLink to='/coaches'>Coaches</NuxtLink></li>
        <li v-if="isLoggedIn"><NuxtLink to='/requests'>Requests</NuxtLink></li>
        <li v-else><NuxtLink to='/auth'>Login</NuxtLink></li>
        <li v-if="isLoggedIn" @click="logout">
          <base-button>Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import BaseButton from '~/components/ui/BaseButton.vue'

export default {
  components: { BaseButton },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.replace("/coaches");
    }
  }
};
</script>

<style lang='scss' scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    color: #f391e3;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;

    &:active,
    &:hover,
    &.router-link-active {
      border: 1px solid #f391e3;
    }
  }
}

h1 {
  margin: 0;

  a {
    color: white;
    margin: 0;

    &:active,
    &:hover,
    &.router-link-active {
      border-color: transparent;
    }
  }
}

header {
  nav {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      margin: 0 0.5rem;
    }
  }
}
</style>