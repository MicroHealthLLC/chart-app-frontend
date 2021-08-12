<template>
  <v-row>
    <v-col class="col-9">
      <!-- Public Dashboards -->
      <h3>Public Dashboards</h3>
      <v-divider class="mb-4"></v-divider>
      <div v-if="dashboards.length > 0" class="grid">
        <DashboardCard
          v-for="(dashboard, index) in dashboards"
          :dashboard="dashboard"
          :key="index"
        ></DashboardCard>
      </div>
      <div v-else class="placeholder d-flex flex-column justify-center align-center">
        <p class="font-weight-light">No Public Dashboards to show...</p>
        <v-btn text small color="primary">Add a Dashboard</v-btn>
      </div>
      <!-- Personal Dashboards -->
      <h3 class="mt-4">Personal Dashboards</h3>
      <v-divider class="mb-4"></v-divider>
      <div class="placeholder d-flex flex-column justify-center align-center">
        <p class="font-weight-light">No Personal Dashboards to show...</p>
        <v-btn text small color="primary">Add a Dashboard</v-btn>
      </div>
      <!-- Group Dashboards -->
      <h3 class="mt-4">Group Dashboards</h3>
      <v-divider class="mb-4"></v-divider>
      <div class="placeholder d-flex flex-column justify-center align-center">
        <p class="font-weight-light">No Group Dashboards to show...</p>
        <v-btn text small color="primary">Add a Dashboard</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DashboardCard from "./../components/DashboardCard"

export default {
  components: {
    DashboardCard
  },
  methods: {
    ...mapActions(["fetchDashboards"]),
  },
  computed: {
    ...mapGetters(["dashboards"]),
  },
  beforeMount() {
    this.fetchDashboards();
  },
};
</script>

<style scoped>
.placeholder {
  height: 150px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
</style>
