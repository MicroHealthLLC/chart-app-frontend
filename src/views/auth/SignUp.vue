<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-center align-center main-container">
        <v-card
          class="pt-0 pr-5 pb-5 pl-5"
          max-width="600"
          :loading="loading"
        >
          <v-alert
            v-model="hasError"
            type="error"
            transition="scroll-y-transition"
            dismissible
          >
            {{ error }}
          </v-alert>
          <v-card-title class="d-flex flex-column">
            <p class="text-body-1">
              Create your <span class="bold">mRMS</span> account
            </p>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="signupform"
              v-model="valid"
            >
              <label class="d-block text-left">Email</label>
              <v-text-field
                v-model="email"
                class="pt-0"
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) =>
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'Not a valid email address',
                ]"
                required
                validate-on-blur
              />
              <v-text-field
                v-model="firstName"
                label="First Name"
                :rules="[(v) => !!v || 'First Name is required']"
                required
              />
              <v-text-field
                v-model="lastName"
                label="Last Name"
                :rules="[(v) => !!v || 'Last Name is required']"
                required
              />

              <label class="d-block text-left">Password</label>
              <v-text-field
                v-model="password"
                class="pt-0"
                type="password"
                :rules="[(v) => !!v || 'Password is required']"
                required
              />
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                :rules="[
                  (v) => !!v || 'Confirm Password is required',
                  (v) => v === password || 'Passwords must match',
                ]"
                required
                validate-on-blur
              />
              <v-text-field
                v-model="phoneNumber"
                class="pt-0"
                label="Phone Number"
                :rules="[(v) => !!v || 'Phone Number is required']"
                required
                validate-on-blur
                hint="Enter a valid 10 digit phone number"
                persistent-hint
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn
              :disabled="loading"
              :loading="loading"
              :dark="!loading"
              block
              @click="attemptSignUp"
            >
              Sign Up
            </v-btn>
            <p class="mt-4">
              Already have an account?
              <router-link to="/signin">
                Sign In
              </router-link>
            </p>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import "./viewStyles.css";
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confirmPassword: "",
      error: "",
      valid: true,
      hasError: false,
    };
  },
  methods: {
    ...mapActions(["login", "signUp"]),
    async attemptSignUp() {
      if (!this.$refs.signupform.validate()) {
        return;
      } else {
        try {
          await this.signUp({
            username: this.email,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            phoneNumber: this.cleanPhoneNum(this.phoneNumber),
          });

          this.$router.push({
            name: "SignUpVerify",
            params: { email: this.email, password: this.password },
          });
        } catch (error) {
          this.hasError = true;
          this.error = error.message;
        }
      }
    },
    cleanPhoneNum(phoneNumber) {
      let pn = phoneNumber.replace(/\D/g, "");
      return pn.length == 10 ? "+1".concat(pn) : "invalid phone number";
    },
  },
  computed: {
    ...mapGetters(["loading"]),
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
