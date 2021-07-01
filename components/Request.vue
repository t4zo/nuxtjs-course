<template>
  <div>
    <div>
      <a :href="emailLink">{{ request.userEmail }}</a>
    </div>
    <p>{{ request.message }}</p>
  </div>
</template>

<script>
export default {
  props: ["request"],
  computed: {
    emailLink() {
      return `mailto: ${this.request.userEmail}`;
    },
  },
};
</script>

<style scoped>
a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>