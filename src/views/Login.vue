<template>
  <v-row class="fill-height">
    <v-col>
      <div class="d-flex justify-center align-center fill-height">
        <v-card class="login-card pa-4" elevation="10">
          <v-card-title class="mt-3 pb-0">
            <h4 class="text-center">
              Welcome to mRMS
              <v-icon color="primary"
                >mdi-chart-timeline-variant-shimmer</v-icon
              >
            </h4>
          </v-card-title>
          <v-divider class="mx-3"></v-divider>
          <v-card-subtitle class="text-caption">
            Please login with your email and password
          </v-card-subtitle>
          <v-card-text>
            <v-form v-model="formValid" ref="loginform">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                outlined
                dense
                required
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) => /.+@.+/.test(v) || 'E-mail must be valid',
                ]"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                dense
                required
                :rules="[(v) => !!v || 'Password  is required']"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn @click="login" color="primary" width="100%">Login</v-btn>
            <span
              v-show="failedLogin"
              class="mt-1 mr-auto text-caption error-text"
              >Invalid email or password</span
            >
          </v-card-actions>

          <div class="px-3 mt-5 mb-2">
            <span class="text-caption">Need help logging in?</span>
          </div>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      formValid: true,
      email: "",
      password: "",
      failedLogin: false,
    };
  },
  methods: {
    ...mapActions(["fetchChannels"]),
    ...mapMutations(["SET_SNACKBAR", "SET_USER"]),
    login() {
      this.$refs.loginform.validate();
      // Submit credentials to backend API
      if (this.formValid) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_BASE_API_URL}/v1/login`,
          data: { email: this.email, password: this.password },
        })
          .then((res) => {
            // Store JWT token and user id locally
            localStorage.setItem("mRmsToken", res.data.token);
            localStorage.setItem("mRmsId", res.data.user.id);
            //Configure Axios header to user token
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${localStorage.getItem("mRmsToken")}`;
            // Set current user
            this.SET_USER(res.data.user);
            // Set channels for sidebar navigation
            this.fetchChannels();
            // Display successful login message
            this.SET_SNACKBAR({
              show: true,
              message: `Welcome to mRMS ${res.data.user.first_name}!`,
            });
            // Navigate to home page
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
            this.failedLogin = true;
          });
      }
    },
  },
};
</script>

<style scoped>
.login-card {
  border: 1px solid gray;
  min-width: 350px;
}
.error-text {
  color: #ff5252;
}
</style>
