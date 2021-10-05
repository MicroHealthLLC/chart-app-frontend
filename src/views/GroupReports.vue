<template>
  <v-row>
    <!-- Reports -->
    <v-col class="col-9">
      <h3>Group Reports</h3>

      <v-divider class="mb-4"></v-divider>

      <div v-if="reports.group.length > 0" class="grid">
        <ReportCard
          v-for="(report, index) in reports.group"
          :key="index"
          :report="report"
        >
        </ReportCard>
      </div>
      <div
        v-else
        class="placeholder d-flex flex-column justify-center align-center"
      >
        <p class="font-weight-light">No Group Reports to show...</p>
        <v-btn text small color="primary" to="/add-report">Add a Report</v-btn>
      </div>
    </v-col>
    <!-- Details -->
    <v-col class="col-3">
      <h3>Details</h3>

      <v-divider class="mb-4"></v-divider>

      <ul class="text-caption details">
        <li>
          <strong
            ><v-icon small>mdi-file-chart-outline</v-icon> Total
            Reports:</strong
          >
        </li>
        <li>
          <strong><v-icon small>mdi-menu</v-icon> Channels:</strong>
        </li>
        <li>
          <strong
            ><v-icon small>mdi-account-group</v-icon> Active Users:</strong
          >
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ReportCard from "../components/ReportCard";
export default {
  name: "GroupReports",
  components: { ReportCard },
  computed: {
    ...mapGetters(["reports"]),
  },
  methods: {
    ...mapActions(["fetchGroupReports"]),
  },
  beforeMount() {
    this.fetchGroupReports();
  },
};
</script>

<style scoped>
.details {
  list-style: none;
  margin: 0;
  padding: 0;
  transition: ease;
}
.v-card__title {
  line-height: 1;
  word-break: normal;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
.placeholder {
  height: 150px;
}
</style>
