<template>
  <v-app>
    <Sidebar v-if="$route.name != 'Login'" />
    <v-main class="main-container mx-auto">
      <v-snackbar v-model="snackbar.show" color="success" outlined text top
        >{{ snackbar.message
        }}<template v-slot:action="{ attrs }">
          <v-btn color="success" text v-bind="attrs" @click="CLOSE_SNACKBAR">
            Close
          </v-btn>
        </template></v-snackbar
      >
      <router-view class="pa-5" />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Sidebar from "./components/Sidebar";

export default {
  components: { Sidebar },
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["fetchChannels", "fetchCurrentUser"]),
    ...mapMutations(["CLOSE_SNACKBAR", "SET_STATUS_CODE"]),
  },
  computed: {
    ...mapGetters(["channels", "snackbar", "statusCode"]),
  },
  created() {
    if (localStorage.getItem("mRmsToken") && localStorage.getItem("mRmsId")) {
      this.fetchCurrentUser(localStorage.getItem("mRmsId"));
      this.fetchChannels();
    }
  },
  watch: {
    statusCode() {
      if (this.statusCode == 403) {
        this.$router.push("/forbidden");
        this.SET_STATUS_CODE(0);
      }
    },
  },
};
</script>

<style scoped>
.theme--light.v-application {
  background-color: #f0f3f7;
}
.main-container {
  width: 100%;
  max-width: 1400px;
}
</style>
