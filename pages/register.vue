<template>
  <section>
    <CoachForm @form-submitted="saveData" />
  </section>
</template>

<script>
import { useRouter,  useStore } from '@nuxtjs/composition-api';

export default {
  middleware: "authenticated",
  setup() {
    const store = useStore();
    const router = useRouter();

    async function saveData(formData) {
      await store.dispatch("coaches/addCoach", formData);
      router.push("/coaches");
    }

    return {
      saveData
    };
  }
};
</script>
