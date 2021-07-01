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
          <BaseButton link :to="contactLink">Contact</BaseButton>
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
import BaseBadge from "~/components/ui/BaseBadge.vue";
import BaseButton from "~/components/ui/BaseButton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";

export default {
  components: { BaseCard, BaseButton, BaseBadge },
  computed: {
    fullName() {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },
    contactLink() {
      return `${this.$route.path}/contact`;
    },
  },
  data() {
    // console.log(this.$route);
    return {
      coach: null,
    };
  },
  created() {
    console.log(this.$store.getters["coaches/coaches"])
    this.coach = this.$store.getters["coaches/getCoachById"](
      this.$route.params.id
    );
  },
};
</script>