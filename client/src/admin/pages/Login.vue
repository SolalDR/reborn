<template>
  <div class="login-page md-primary">
    <md-card class="login">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-header>
            <div class="md-title">Login</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="last-name">Password</label>
                  <md-input
                  name="last-name"
                  type="password"
                  id="last-name"
                  autocomplete="family-name"
                  v-model="form.password.value" />
                </md-field>
              </div>
            </div>
            <p>
              {{this.form.error}}
            </p>

          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
          </md-card-actions>
        </md-card>
      </form>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      sending: false,
      form: {
        error: null,
        password: {
          value: '',
        },
      },
    };
  },

  methods: {
    validateUser() {
      this.sending = true;
      this.$socket.on('admin:authenticate', (response) => {
        if (response.valid) {
          this.$store.commit('admin/updateToken', response.token);
          this.$router.push('/admin');
        } else {
          this.form.error = 'Le mot de passe est faux';
          this.sending = false;
        }
      });
      this.$socket.emit('admin:authenticate', this.form.password.value);
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
  min-height: 100vh;
}

.login {
  margin: auto;
  width: 350px;
}
</style>
