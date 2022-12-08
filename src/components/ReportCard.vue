<template>
  <v-card class="report-card" @click="toReport">
    <v-card-title>
      <v-icon class="mr-4" color="info">{{ chartIcon }}</v-icon>
      <span class="text-subtitle-2 font-weight-bold">
        {{ report.title }}
      </span>
    </v-card-title>
    <v-card-text>
      <ul class="mb-4 text-caption">
        <li v-if="(report.dataSetId && report.data_set && report.data_set.data)">
          <strong>Data Set:</strong> {{ dataSets.data.filter(d => d.id == report.dataSetId).title }}
        </li>
        <li v-else><strong>Data Set:</strong> None</li>
        <li><strong>Channel:</strong> {{ report.channel.title }}</li>
      </ul>
      <!-- <v-chip
        v-for="(tag, index) in report.tags"
        :key="index"
        class="mr-1"
        x-small
        color="info"
        >{{ tag.title }}</v-chip
      > -->
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ReportCard",
  props: {
    report: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters([
       "dataSets",
     ]),
    chartIcon() {
      return this.report.chart_type === "line"
        ? "mdi-chart-line"
        : this.report.chart_type === "bar"
        ? "mdi-chart-bar"
        : this.report.chart_type === "pie"
        ? "mdi-chart-pie"
        : this.report.chart_type === "donut"
        ? "mdi-chart-donut"
        : this.report.chart_type === "table"
        ? "mdi-table-large"
        : this.report.chart_type === "curve"
        ? "mdi-chart-bell-curve-cumulative"
        : this.report.chart_type === "polar-area"
        ? "mdi-chart-pie"
        : this.report.chart_type === "radar"
        ? "mdi-hexagon-slice-2"
        : "mdi-chart-line";
    },
  },
  beforeMount() {
    if(this.dataSets && this.dataSets.length < 1){
      this.fetchDataSets();
    }
  },
  methods: {
    ...mapActions([
       "fetchDataSets",
     ]),
    toReport() {
      this.$router.push(
        `/channels/${this.report.channelId}/reports/${this.report.id}`
      );
    },
  },
};
</script>

<style scoped>
.report-card {
  /* width: 32%; */
  border: 1px solid lightgray;
  border-left: 3px solid #1976d2 !important;
  margin-bottom: 10px;
}
.report-card ul,
.details {
  list-style: none;
  margin: 0;
  padding: 0;
  transition: ease;
}
.report-card:hover {
  transform: scale(1.05);
  cursor: pointer;
}
.v-card__title {
  word-break: normal;
  line-height: 1.5rem;
  flex-wrap: unset;
}
</style>
