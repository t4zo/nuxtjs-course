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
      <div :style="{textAlign: 'center', marginTop: '20px'}">
        <p v-if="!!error">An error occurred</p>
        <p v-if="isLoading">Authenticating...</p>
      </div>
    </form>
  </base-card>
</template>

<script>
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseButton from "~/components/ui/BaseButton.vue";

export default {
  components: { BaseCard, BaseButton },
  middleware: 'unauthenticated',
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === "login" ? "Login" : "Signup";
    },
    switchModeButtonCaption() {
      return this.mode === "login" ? "Signup" : "Login";
    }
  },
  methods: {
    async handleSubmitForm() {
      this.formIsValid = true;

      if (
        this.user.email.trim() === "" ||
        !this.user.email.trim().includes("@") ||
        this.user.password.trim().length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === "signup") {
          await this.$store.dispatch("auth/signup", this.user);
          this.$router.replace("/coaches");
        } else {
          await this.$store.dispatch("auth/login", this.user);
          const redirectUrl = this.$route.query.redirectUrl || 'coaches';
          this.$router.replace(`/${redirectUrl}`);
        }
      } catch (err) {
        this.error = err.message || "Failed to authenticate";
        setTimeout(() => {
          this.error = null;
        }, 4000);
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode === "login" ? "signup" : "login";
    }
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
