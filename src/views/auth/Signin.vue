<template>
  <v-row>
    <v-col>
      <div class="" :load="log(user)">
        <v-card class="pt-0 pr-5 pb-5 pl-5 card" :loading="loading">
          <v-alert
            v-model="hasError"
            type="error"
            transition="scroll-y-transition"
            dismissible
            >{{ error }}</v-alert
          >
          <v-card-title class="d-flex flex-column">
            <h2 class="text-body-1">
              <span class="beWell"
                >Welcome to mRMS
                <v-icon color="orange darken-2"
                  >mdi-chart-box-outline</v-icon
                ></span
              >
            </h2></v-card-title
          >
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <label class="d-block text-left">Email</label>
              <v-text-field
                class="pt-0"
                v-model="username"
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) =>
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'Not a valid email address',
                ]"
                required
                validate-on-blur
              ></v-text-field>
              <label class="d-block text-left">Password</label>
              <v-text-field
                class="pt-0"
                v-model="password"
                type="password"
                :rules="[(v) => !!v || 'Password is required']"
                required
              ></v-text-field>
              <p class="mt-4">
                Forgot password?
                <span @click="resetPW" class="reset">Reset</span>
              </p>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn
              color="var(--mh-blue)"
              @click="userLogin"
              :loading="loading"
              :disabled="loading"
              :dark="!loading"
              block
              >Login</v-btn
            >
            <p class="mt-4">
              No account? <router-link to="/signup">Create Account</router-link>
            </p>
          </v-card-actions>
          <!-- <v-img class="shrink" contain src="../assets/mh-logo.png" max-width="180"></v-img> -->
        </v-card>
      </div>
    </v-col>
  </v-row>
  <!-- <v-row class="fill-height">
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
  </v-row> -->
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      test: "test",
      error: "",
      valid: true,
      hasError: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    log(e) {
      if (e) {
        console.log(e);
      }
    },
    resetPW() {
      this.$router.push("/reset-password");
    },
    async userLogin() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        await this.login({
          username: this.username,
          password: this.password,
        });
        this.$router.push("/");
      } catch (error) {
        this.hasError = true;
        this.error = error.message;
      }
    },
  },
  computed: {
    ...mapGetters(["loading", "user"]),
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 350px;
}
.beWell {
  font-family: inherit;
  font-weight: 600;
}
.reset {
  cursor: pointer;
  color: royalblue;
}
</style>
<!-- <script>
import { Auth } from "aws-amplify";

export default {
  name: "Login",
  methods: {
    fedSignIn() {
      Auth.federatedSignIn()
    }
  },
  mounted() {
    this.fedSignIn()
  },
};
</script> -->
