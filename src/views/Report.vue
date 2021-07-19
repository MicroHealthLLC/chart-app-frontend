<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3>{{ report.title }}</h3>
        <v-btn class="mb-2" outlined small>Back</v-btn>
      </div>

      <v-divider class="mb-4"></v-divider>

      <v-card class="pa-4 mb-4">
        <Component
          :is="graphType"
          :chartData="activeDataSet"
          :options="chartOptions"
          :height="600"
          :index="index"
          class="mb-4"
        >
        </Component>

        <div class="d-flex justify-end mb-4">
          <v-btn v-if="circleChart" @click="changeChartData" outlined small
            >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
      </v-card>

      <h3>Report Details</h3>
      <v-divider class="mb-8"></v-divider>

      <div class="grid">
        <div>
          <v-select
            v-model="report.data_set"
            :items="dataSets"
            item-text="title"
            item-value="id"
            label="Data Set"
            dense
          ></v-select>
        </div>
        <div>
          <v-text-field
            value="Christopher Calderon"
            label="Created By"
            dense
          ></v-text-field>
        </div>
        <div>
          <v-select
            v-model="report.channel"
            :items="allChannels"
            item-text="title"
            item-value="id"
            label="Channel"
            dense
          ></v-select>
        </div>
        <div>
          <v-text-field
            value="Christopher Calderon"
            label="Last Updated By"
            dense
          ></v-text-field>
        </div>
        <div>
          <v-text-field value="data.xlsx" label="Document" dense></v-text-field>
        </div>
        <div>
          <v-select
            v-model="report.chart_type"
            :items="chartTypes"
            item-text="text"
            item-value="value"
            label="Chart Type"
            dense
          ></v-select>
        </div>
        <div>
          <v-select>
            
          </v-select>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import RadarChart from "../components/RadarChart";
import DoughnutChart from "../components/DoughnutChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";

export default {
  data() {
    return {
      report: {},
      allChannels: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ["", ""],
        },
        bezierCurve: false,
      },
      chartTypes: [
        { text: "Line", value: "line" },
        { text: "Bar", value: "bar" },
        { text: "Radar", value: "radar" },
        { text: "Donut", value: "donut" },
        { text: "Pie", value: "pie" },
        { text: "Polar Area", value: "polar-area" },
      ],
      index: 0,
    };
  },
  methods: {
    changeChartData() {
      this.index =
        (this.index + 1) % (Object.keys(this.activeDataSet[0]).length - 1);
    },
  },
  computed: {
    ...mapGetters(["activeDataSet", "channels", "channelReports", "dataSets"]),
    graphType() {
      if (this.report.chart_type === "line") {
        return LineChart;
      } else if (this.report.chart_type === "bar") {
        return BarChart;
      } else if (this.report.chart_type === "radar") {
        return RadarChart;
      } else if (this.report.chart_type === "donut") {
        return DoughnutChart;
      } else if (this.report.chart_type === "pie") {
        return PieChart;
      } else if (this.report.chart_type === "polar-area") {
        return PolarAreaChart;
      } else {
        return LineChart;
      }
    },
    circleChart() {
      return (
        this.report.chart_type == "donut" ||
        this.report.chart_type == "pie" ||
        this.report.chart_type == "polar-area"
      );
    },
  },
  mounted() {
    this.report = this.channelReports.find(
      (report) => report.id == this.$route.params.reportId
    );

    this.allChannels = [
      ...this.channels.public,
      ...this.channels.personal,
      ...this.channels.group,
    ];

    this.chartOptions.title.text[0] = this.report.title;
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
</style>
