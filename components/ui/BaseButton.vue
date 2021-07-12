<template>
  <div>
    <NuxtLink v-if="isLink" :to="to" :class="mode" :type="type">
      <slot></slot>
    </NuxtLink>
    <button v-else :class="mode" @click="handleClick" :type="type">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  emits: ['click'],
  props: {
    mode: {
      type: String,
      required: false,
      default: "",
    },
    isLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    type: {
      type: String,
      required: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>