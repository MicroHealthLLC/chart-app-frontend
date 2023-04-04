<template>
  <v-row>
    <v-col
      class="col-12"
    >
      <h3>{{ activeDashboard.title }}</h3>
      <v-divider />
    </v-col>
    <v-col
      v-for="(report, index) in activeDashboard.reports"
      :key="index"
      :class="[{ 'col-md-12': index === 0 }, 'col-md-6']"
    >
      <v-card class="pa-4 mb-4">
        <Component
          :is="graphType(report)"
          :chart-data="report.data_set.data"
          :options="chartOptions"
          :graph-type="report.chart_type"
          :height="350"
          :index="dataIndex"
          class="mb-4"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import RadarChart from "../components/RadarChart";
import DoughnutChart from "../components/DoughnutChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import Table from "../components/Table";

export default {
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ["", ""],
        },
        // bezierCurve: false,
      },
      dataIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["activeDashboard"]),
  },
  methods: {
    ...mapActions(["fetchDashboard"]),
    graphType(report) {
      if (report.chart_type === "line") {
        return LineChart;
      } else if (report.chart_type === "bar") {
        return BarChart;
      } else if (report.chart_type === "radar") {
        return RadarChart;
      } else if (report.chart_type === "donut") {
        return DoughnutChart;
      } else if (report.chart_type === "pie") {
        return PieChart;
      } else if (report.chart_type === "polar-area") {
        return PolarAreaChart;
      } else if (report.chart_type === "table") {
        return Table;
      } else {
        return LineChart;
      }
    },
  },
  beforeMount() {
    this.fetchDashboard(this.$route.params.dashboardId);
  },
};
</script>

<style></style>
