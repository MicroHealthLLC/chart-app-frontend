<template>
  <v-row>
    <v-col class="col-9">
      <div class="d-flex justify-space-between">
        <h3>
          {{ channel.title }}
        </h3>
        <v-btn
          class="px-5 mb-2"
          depressed
          color="primary"
          small
          :to="`/channels/${$route.params.channelId}/reports/new`"
          >New Report <v-icon right dark>mdi-plus</v-icon></v-btn
        >
      </div>

      <v-divider class="mb-4"></v-divider>

      <div v-if="channel.reports.length > 0" class="grid">
        <ReportCard
          v-for="(report, index) in channel.reports"
          :report="report"
          :key="index"
        ></ReportCard>
      </div>
      <div
        v-else
        class="placeholder d-flex flex-column justify-center align-center"
      >
        <p class="font-weight-light">No Personal Reports to show...</p>
        <v-btn text small color="primary">Add a Report</v-btn>
      </div>
    </v-col>
    <v-col class="col-3">
      <div class="d-flex justify-space-between">
        <h3 class="mb-2">Details</h3>
        <v-btn
          :to="`/channels/${$route.params.channelId}`"
          small
          color="primary"
          icon
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
      </div>

      <v-divider class="mb-4"></v-divider>
      <ul class="text-caption details">
        <li><strong>Category:</strong> {{ channel.category }}</li>
        <li>
          <strong
            ><v-icon small>mdi-file-chart-outline</v-icon> Total
            Reports:</strong
          >
          {{ channel.reports.length }}
        </li>
        <li>
          <strong> <v-icon small>mdi-text</v-icon> Description:</strong>
          {{ channel.description }}
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ReportCard from "./../components/ReportCard";

export default {
  name: "ChannelReports",
  components: {
    ReportCard,
  },
  computed: {
    ...mapGetters(["channel"]),
  },
  methods: {
    ...mapActions(["fetchChannel"]),
  },
  beforeMount() {
    this.fetchChannel(this.$route.params.channelId);
  },
  watch: {
    $route() {
      this.fetchChannel(this.$route.params.channelId);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
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
