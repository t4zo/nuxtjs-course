<template>
  <BaseCard>
    <section v-if="hasRequests">
      <header>
        <h1>Requests Received</h1>
      </header>
      <ul>
        <li v-for="request in requests" :key="request.id">
          <Request :request="request" />
        </li>
      </ul>
    </section>
    <section v-else>
      <p>You haven't received any requests yet</p>
    </section>
  </BaseCard>
</template>

<script>
import BaseCard from "~/components/ui/BaseCard.vue";
export default {
  components: { BaseCard },
  computed: {
    requests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

h3 {
  text-align: center;
}
</style>