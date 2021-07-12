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
  // created() {
  //   this.$store.dispatch('coaches/fetchCoaches');
  // },
  async asyncData({ $axios, store }) {
    const { data } = await $axios.get(
      `https://vuejs-course-d9ebe-default-rtdb.firebaseio.com/requests/${store.getters.getUserId}.json`
    );

    const originalRequests = Object.entries(data).map((e) => ( { [e[0]]: e[1] } ));
    const requests = [];
    for(const request of originalRequests) {
      for (const key in request) {
        requests.push({
          id: key,
          coachId: request[key].coachId,
          userEmail: request[key].userEmail,
          message: request[key].message,
        });
      }
    }

    store.dispatch("requests/setRequests", requests);
  },
  computed: {
    requests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    }
  }
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
