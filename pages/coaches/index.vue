<template>
  <div>
    <section>
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="refreshCoaches"
            >Refresh</BaseButton
          >
          <BaseButton
            isLink
            to="/auth?redirect=register"
            v-if="!isAuthenticated"
          >
            Login to Register as Coach</BaseButton
          >
          <BaseButton isLink to="/register" v-if="!isCoach && isAuthenticated"
            >Register as Coach</BaseButton
          >
        </div>
        <div v-if="hasCoaches">
          <ul>
            <li v-for="coach in filteredCoaches" :key="coach.id">
              <Coach :coach="coach" />
            </li>
          </ul>
        </div>
        <div v-else>
          <h3>No Coaches Found.</h3>
        </div>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import { reactive, useStore, computed } from "@nuxtjs/composition-api";

export default {
  async asyncData({ store }) {
    await store.dispatch("coaches/fetchCoaches");
  },
  setup() {
    const store = useStore();

    const activeFilters = reactive({
      frontend: true,
      backend: true,
      career: true
    });

    const filteredCoaches = computed(() => {
      const coaches = store.getters["coaches/coaches"];

      return coaches?.filter(
        coach =>
          (activeFilters.frontend && coach.areas.includes("frontend")) ||
          (activeFilters.backend && coach.areas.includes("backend")) ||
          (activeFilters.career && coach.areas.includes("career"))
      );
    });

    const isAuthenticated = computed(() => {
      return store.getters["auth/isAuthenticated"];
    });

    const isCoach = computed(() => {
      return store.getters["coaches/isCoach"];
    });

    const hasCoaches = computed(() => {
      return store.getters["coaches/hasCoaches"];
    });

    function setFilters(filters) {
      activeFilters.frontend = filters.frontend;
      activeFilters.backend = filters.backend;
      activeFilters.career = filters.career;
    }

    function refreshCoaches() {
      store.dispatch("coaches/fetchCoaches");
    }

    return {
      activeFilters,
      filteredCoaches,
      isAuthenticated,
      isCoach,
      hasCoaches,
      setFilters,
      refreshCoaches
    };
  }
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
