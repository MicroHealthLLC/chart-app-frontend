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
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              outlined
              dense
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" width="100%">Login</v-btn>
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
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style scoped>
.login-card {
  border: 1px solid gray;
}
</style>
