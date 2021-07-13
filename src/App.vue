<template>
  <v-app>
    <Sidebar />
    <v-main class="main-container mx-auto">
      <router-view class="pa-5" />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
export default {
  components: { Sidebar },
  name: "App",

  data: () => ({
    //
  }),
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
