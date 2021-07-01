<template>
  <div>
    <section>
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline">Refresh</BaseButton>
          <BaseButton isLink to="/register" v-if="!isCoach">Register as Coach</BaseButton>
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
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import CoachFilter from "@/components/CoachFilter.vue";

export default {
  components: { BaseCard, BaseButton, CoachFilter },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];

      return coaches.filter(
        (coach) =>
          (this.activeFilters.frontend && coach.areas.includes("frontend")) ||
          (this.activeFilters.backend && coach.areas.includes("backend")) ||
          (this.activeFilters.career && coach.areas.includes("career"))
      );
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
  methods: {
    setFilters(filters) {
      this.activeFilters = filters;
    },
  },
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