<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-center align-center main-container">
        <v-card
          class="pa-5"
          max-width="600"
        >
          <v-alert
            v-model="hasError"
            type="error"
            transition="scroll-y-transition"
            dismissible
          >
            {{ error }}
          </v-alert>
          <!-- <v-card-title class="d-flex flex-column"
              ><v-img src="../../assets/gauge.jpg" max-width="300"></v-img>
              <p class="text-body-1">Confirm Verification Code</p></v-card-title
            > -->
          <v-card-title class="d-flex flex-column">
            <p class="text-body-1">
              Confirm Verification Code
            </p>
          </v-card-title>
          <v-card-text>
            <v-form ref="verifyform">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[(v) => !!v || 'Email is required']"
                required
              />
              <v-text-field
                v-model="code"
                label="Confirmation Code"
                :rules="[(v) => !!v || 'Confirmation Code is required']"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn
              block
              :loading="loading"
              :disabled="loading"
              :dark="!loading"
              @click="confirmCode"
            >
              Submit
            </v-btn>
            <v-btn
              class="ml-0 mt-2"
              :loading="loading"
              :disabled="loading"
              color="secondary"
              outlined
              block
              @click="resendCode"
            >
              Resend Code
            </v-btn>
            <p class="mt-4">
              Already Verified? <router-link to="/signin">
                Login
              </router-link>
            </p>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "SignUpVerify",
  data() {
    return {
      email: "",
      password: "",
      code: "",
      error: "",
      hasError: false,
    };
  },
  methods: {
    ...mapActions(["confirmSignUp", "login", "resendConfirmationCode"]),
    ...mapMutations(["SET_SNACKBAR"]),
    async confirmCode() {
      if (!this.$refs.verifyform.validate()) {
        return;
      } else {
        try {
          await this.confirmSignUp({
            username: this.email,
            code: this.code,
          });

          if (this.password) {
            await this.login({ username: this.email, password: this.password });
            this.$router.push("/");
          } else {
            this.SET_SNACKBAR({
              show: true,
              message: "Email verified. Please login to your account.",
              color: "var(--mh-green)",
            });
            this.$router.push("/signin");
          }
        } catch (error) {
          this.hasError = true;
          this.error = error.message;
        }
      }
    },
    async resendCode() {
      if (!this.email) {
        this.hasError = true;
        this.error = "No Email provided";
        return;
      } else {
        try {
          await this.resendConfirmationCode(this.email);
        } catch (error) {
          this.hasError = true;
          this.error = error.message;
        }
      }
    },
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  mounted() {
    if (this.$route.params.email) {
      this.email = this.$route.params.email;
      this.password = this.$route.params.password;
    }
  },
  beforeDestroy() {
    this.email = "";
    this.password = "";
  },
};
</script>

<style scoped>
.main-container {
  height: 100vh;
}
a {
  text-decoration: none;
}
</style>
