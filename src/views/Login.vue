<template>
  <div class="login">
    <v-container class="background" fluid>
      <div class="box">
        <v-col>
          <h3>Entrar na Conta</h3>
          <v-text-field
            type="email"
            v-model="user.email"
            :error="triedLogin && !user.email"
            label="Email"
          ></v-text-field>

          <v-text-field
            type="password"
            v-model="user.password"
            :error="triedLogin &&!user.password"
            label="Senha"
          ></v-text-field>

          <div class="buttons">
            <v-btn class="button" color="#a0db8e" :loading="loading" @click="doLogin">Entrar</v-btn>
            <v-btn class="button" @click="$router.push('/register')">Criar Conta</v-btn>
          </div>
        </v-col>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { email: "", password: "" },
      triedLogin: false,
      loading: false
    };
  },

  methods: {
    async doLogin() {
      this.loading = true;
      this.triedLogin = true;

      await this.$store.dispatch("auth/login", this.user);

      this.loading = false;
    }
  }
};
</script>

<style lang="sass" scoped>
.login
  height: 100vh
  min-height: 500px

  .background
    height: 100%
    background-image: url("../assets/login-background.jpg")
    background-size: cover
    display: flex
    justify-content: center
    align-items: center

    .box
      width: 300px
      height: 300px
      background: white
      border-radius: 10px
      text-align: center

      .buttons
        margin-top: 25px
        display: flex
        flex-direction: column

        .button:not(:first-child)
          margin-top: 10px
</style>