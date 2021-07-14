<template>
  <BaseCard>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" v-model.trim="message" />
      </div>
      <p class="errors" v-if="!formIsValid">
        Please enter a valid email and non-empty message.
      </p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </BaseCard>
</template>

<script>
import { ref, useRoute, useStore, useRouter } from "@nuxtjs/composition-api";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const email = ref("");
    const message = ref("");
    const formIsValid = ref(true);

    function validateForm() {
      return (
        email.value !== "" && email.value.includes("@") && message.value !== ""
      );
      // formIsValid.value = true;
      // if(email.value === '' || !email.value.includes('@') || message.value === '') {
      //   return false;
      // }
      // formIsValid.value = true;
    }

    async function submitForm() {
      const isValid = validateForm();
      if (!isValid) {
        return;
      }

      const request = {
        userEmail: email.value,
        message: message.value,
        coachId: route.value.params.id
      };

      await store.dispatch("requests/contactCoach", request);
      router.replace("/coaches");
    }

    return {
      email,
      message,
      formIsValid,
      validateForm,
      submitForm
    };
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
