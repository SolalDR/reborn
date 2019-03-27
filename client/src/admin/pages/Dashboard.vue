<template>
  <div>
    <span class="md-title">Bienvenue dans votre dashboard</span>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',

  data() {
    return {
      sending: false,
      form: {
        username: {
          value: '',
        },
        password: {
          value: '',
        },
      },
    };
  },

  methods: {
    validateUser() {
      this.sending = true;
      setTimeout(() => {
        this.$router.push('/dashboard');
      });
      return true;
    },
  },
};
</script>
