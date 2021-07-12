<template>
  <section>
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