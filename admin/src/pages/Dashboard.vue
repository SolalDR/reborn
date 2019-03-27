<template>
  <admin title="Dashboard">
    <span class="md-title">Bienvenue dans votre dashboard</span>
  </admin>
</template>

<script>
import Admin from './../layout/Admin';

export default {
  name: 'Dashboard',

  components: {
    Admin,
  },

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login {
  margin: auto;
}
</style>
