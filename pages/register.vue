<template>
  <section>
    <h2>Register as a coach</h2>
    <CoachForm @form-submitted="saveData" />
  </section>
</template>

<script>
import CoachForm from "@/components/CoachForm.vue";

export default {
  components: { CoachForm },
  methods: {
    saveData(formData) {
      this.$store.dispatch('coaches/addCoach', formData);
      this.$router.push('/coaches');
    }
  }
};
</script>