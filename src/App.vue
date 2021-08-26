<template>
  <v-app>
    <Sidebar />
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
    ...mapActions(["fetchChannels"]),
    ...mapMutations(["CLOSE_SNACKBAR"]),
  },
  computed: {
    ...mapGetters(["channels", "snackbar"]),
  },
  created() {
    this.fetchChannels();
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
/* .card {
  height: calc(100vh - 40px);
  overflow-y: auto;
  overflow-x: hidden;
} */
</style>
