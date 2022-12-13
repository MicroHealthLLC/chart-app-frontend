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
        <li v-if="(report && report.dataSetId)">
          <strong>Data Set:</strong><span class="blueFont"> {{ dataSets.filter(d => d && d.id == report.dataSetId )[0].title }}</span>
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
      return this.report.chartType === "line"
        ? "mdi-chart-line"
        : this.report.chartType === "bar"
        ? "mdi-chart-bar"
        : this.report.chartType === "pie"
        ? "mdi-chart-pie"
        : this.report.chartType === "donut"
        ? "mdi-chart-donut"
        : this.report.chartType === "table"
        ? "mdi-table-large"
        : this.report.chartType === "curve"
        ? "mdi-chart-bell-curve-cumulative"
        : this.report.chartType === "polar-area"
        ? "mdi-chart-pie"
        : this.report.chartType === "radar"
        ? "mdi-hexagon-slice-2"
        : "mdi-chart-line";
    },
  },
  async beforeMount() {
    if(this.dataSets && this.dataSets.length < 1){
      await this.fetchDataSets();
    }
  },
  methods: {
    ...mapActions([
       "fetchDataSets",
     ]),
     /* log(e){
      console.log(e)
     }, */
    toReport() {
      this.$router.push(
        `/channels/${this.report.channelId}/reports/${this.report.id}`
      );
    },
  },
  watch: {
    dataSets() {
      console.log(this.dataSets)
    },
    report() {
      console.log(this.report)
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
.blueFont {
  color: #1976d2;
}
</style>
