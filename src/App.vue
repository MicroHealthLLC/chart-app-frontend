<template>
  <v-app>
    <Sidebar v-if="$route.name != 'Signin'" />
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
    ...mapGetters(["channels", "snackbar", "statusCode", "user", "logout"]),
  },
  async mounted() {
   await this.fetchCurrentUser();
    if (this.user) {
      console.log(this.user)
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

<style>
:root {
  --mh-blue: #1d336f;
  --mh-green: #9ec64c;
  --mh-orange: #dd9036;
}
.theme--light.v-application {
  background-color: #f0f3f7;
}
.main-container {
  width: 100%;
  max-width: 1800px;
  background: white;
}
.v-main__wrap {
  background: white;
}
.v-application--wrap {
  background: white;
}
</style>
