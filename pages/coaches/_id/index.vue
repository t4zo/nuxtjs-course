<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ coach.hourlyRate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton isLink :to="contactLink">Contact</BaseButton>
        </header>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge
          v-for="area in coach.areas"
          :key="area"
          :type="area"
          :title="area"
        ></BaseBadge>
        <p>{{ coach.description }}</p>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import {
  computed,
  reactive,
  useRoute,
  useStore
} from "@nuxtjs/composition-api";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const coachId = route.value.params.id;
    const coach = reactive(store.getters["coaches/getCoachById"](coachId));

    const fullName = computed(() => {
      return `${coach.firstName} ${coach.lastName}`;
    });

    const contactLink = computed(() => {
      return `${route.path}/contact`;
    });

    return {
      coach,
      fullName,
      contactLink
    };
  }
};
</script>
