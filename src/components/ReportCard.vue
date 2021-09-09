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
        <li><strong>Data Set:</strong> {{ report.data_set.title }}</li>
        <li><strong>Channel:</strong> {{ report.channel.title }}</li>
      </ul>
      <v-chip
        v-for="(tag, index) in report.tags"
        :key="index"
        class="mr-1"
        x-small
        color="info"
        >{{ tag.title }}</v-chip
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ReportCard",
  props: {
    report: {
      type: Object,
    },
  },
  computed: {
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
  methods: {
    toReport() {
      this.$router.push(
        `/channels/${this.report.channel.id}/reports/${this.report.id}`
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
