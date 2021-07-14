<template>
  <base-card>
    <form @submit.prevent="handleSubmitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="user.email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
        />
      </div>
      <p v-if="!formIsValid">
        Please enter a valid email and password (must be at least 6 characters
        long)
      </p>
      <div class="form-actions">
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </div>
      <div :style="{ textAlign: 'center', marginTop: '20px' }">
        <p v-if="!!error">An error occurred</p>
        <p v-if="isLoading">Authenticating...</p>
      </div>
    </form>
  </base-card>
</template>

<script>
import { ref, reactive, computed, useRoute, useRouter, useStore } from "@nuxtjs/composition-api";

export default {
  middleware: "unauthenticated",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const user = reactive({
      email: "",
      password: ""
    });

    const formIsValid = ref(true);
    const mode = ref("login");
    const isLoading = ref(false);
    const error = ref(null);

    const submitButtonCaption = computed(() => {
      return mode.value === "login" ? "Login" : "Signup";
    });

    const switchModeButtonCaption = computed(() => {
      return mode.value === "login" ? "Signup" : "Login";
    });

    async function handleSubmitForm() {
      formIsValid.value = true;

      if (
        user.email.trim() === "" ||
        !user.email.trim().includes("@") ||
        user.password.trim().length < 6
      ) {
        formIsValid.value = false;
        return;
      }

      isLoading.value = true;

      try {
        if (mode.value === "signup") {
          await store.dispatch("auth/signup", user);
          router.replace("/coaches");
        } else {
          await store.dispatch("auth/login", user);
          const redirectUrl = route.value.query.redirectUrl || "coaches";
          router.replace(`/${redirectUrl}`);
        }
      } catch (err) {
        error.value = err.message || "Failed to authenticate";
        setTimeout(() => {
          error.value = null;
        }, 4000);
      }

      isLoading.value = false;
    }

    function switchAuthMode() {
      mode.value = mode.value === "login" ? "signup" : "login";
    }

    return {
      user,
      formIsValid,
      mode,
      isLoading,
      error,
      submitButtonCaption,
      switchModeButtonCaption,
      handleSubmitForm,
      switchAuthMode,
    };
  }
};
</script>
<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

.form-actions {
  display: flex;
  margin-top: 30px;
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
</style>
