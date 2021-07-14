<template>
  <BaseCard>
    <section v-if="hasRequests">
      <header>
        <h1>Requests Received</h1>
      </header>
      <ul>
        <li v-for="request in requests" :key="request.id">
          <LazyRequest :request="request" />
        </li>
      </ul>
    </section>
    <section v-else>
      <p>You haven't received any requests yet</p>
    </section>
  </BaseCard>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api';

export default {
  middleware: 'authenticatedAndIsCoach',
  async asyncData({ store }) {
    await store.dispatch('requests/fetchRequests');
  },
  setup() {
    const store = useStore();

    const requests = computed(() => {
      return store.getters["requests/requests"];
    });

    const hasRequests = computed(() => {
      return store.getters["requests/hasRequests"];
    });

    return {
      requests,
      hasRequests,
    }
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
