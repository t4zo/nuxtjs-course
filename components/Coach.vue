<template>
  <div>
    <h3>{{ fullName }}</h3>
    <h4>${{ coach.hourlyRate }}/hour</h4>
    <div>
      <BaseBadge
        v-for="area in coach.areas"
        :key="area"
        :type="area"
        :title="area"
      ></BaseBadge>
    </div>
    <div class="actions">
      <BaseButton isLink mode="outline" :to="coachDetailLink">Details</BaseButton>
      <BaseButton isLink :to="coachContactLink">Contact</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: { BaseBadge, BaseButton },
  props: ["coach"],
  computed: {
    fullName() {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },
    coachContactLink() {
      return `${this.$route.path}/${this.coach.id}/contact`;
    },
    coachDetailLink() {
      return `${this.$route.path}/${this.coach.id}`;
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>