<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3>{{ activeReport.title }}</h3>
        <div>
          <v-btn
            class="px-5 mr-2 mb-2"
            color="primary"
            @click="saveReport"
            depressed
            small
            >Save</v-btn
          >
          <v-btn class="mb-2" outlined small>Back</v-btn>
        </div>
      </div>

      <v-divider class="mb-4"></v-divider>

      <v-card class="pa-4 mb-4">
        <Component
          v-if="activeReport.id || activeReport.data_set.id"
          ref="chart"
          :is="graphType"
          :chartData="activeReport.data_set.data"
          :graphType="activeReport.chart_type"
          :height="600"
          :title="activeReport.title"
          class="mb-4"
        >
        </Component>

        <div
          v-else
          class="place-holder d-flex justify-center align-center ma-4"
        >
          <p class="text-center placeholder-text mb-0">
            <v-icon class="placeholder-icon">mdi-chart-areaspline</v-icon>
            Please load a data set to view preview...
          </p>
        </div>

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
          <v-text-field
            v-model="activeReport.title"
            label="Title"
            dense
          ></v-text-field>
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
            v-model="activeReport.channel_id"
            :items="channels"
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
          <v-select
            v-model="activeReport.data_set_id"
            :items="dataSets"
            item-text="title"
            item-value="id"
            label="Data Set"
            dense
            @change="updateChartData"
          ></v-select>
        </div>
        <div>
          <v-select
            v-model="activeReport.chart_type"
            :items="chartTypes"
            item-text="text"
            item-value="value"
            label="Chart Type"
            dense
          ></v-select>
        </div>
        <div class="description">
          <v-textarea
            v-model="activeReport.description"
            label="Description"
            rows="1"
            auto-grow
            dense
          ></v-textarea>
        </div>
        <div class="tags">
          <v-select
            v-model="activeReport.tags"
            :items="tags"
            item-text="title"
            item-value="title"
            chips
            label="Tags"
            multiple
            dense
          >
          </v-select>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import RadarChart from "../components/RadarChart";
import DoughnutChart from "../components/DoughnutChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import Table from "../components/Table";

export default {
  name: "Report",
  data() {
    return {
      chartTypes: [
        { text: "Line", value: "line" },
        { text: "Curve", value: "curve" },
        { text: "Bar", value: "bar" },
        { text: "Radar", value: "radar" },
        { text: "Donut", value: "donut" },
        { text: "Pie", value: "pie" },
        { text: "Polar Area", value: "polar-area" },
        { text: "Table", value: "table" },
      ],
    };
  },
  methods: {
    ...mapActions([
      "fetchDataSets",
      "fetchReport",
      "fetchTags",
      "addReport",
      "updateReport",
    ]),
    ...mapMutations(["SET_ACTIVE_REPORT", "SET_REPORT_DATA_SET"]),
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    saveReport() {
      if (this.activeReport.id) {
        this.updateReport(this.activeReport);
      } else {
        this.addReport(this.activeReport);
      }
    },
    updateChartData() {
      let dataSet = this.dataSets.find(
        (dataSet) => dataSet.id == this.activeReport.data_set_id
      );
      this.SET_REPORT_DATA_SET(dataSet);
    },
  },
  computed: {
    ...mapGetters([
      "activeDataSet",
      "activeReport",
      "channels",
      "channelReports",
      "dataSets",
      "tags",
    ]),
    graphType() {
      if (this.activeReport.chart_type === "line") {
        return LineChart;
      } else if (this.activeReport.chart_type === "bar") {
        return BarChart;
      } else if (this.activeReport.chart_type === "radar") {
        return RadarChart;
      } else if (this.activeReport.chart_type === "donut") {
        return DoughnutChart;
      } else if (this.activeReport.chart_type === "pie") {
        return PieChart;
      } else if (this.activeReport.chart_type === "polar-area") {
        return PolarAreaChart;
      } else if (this.activeReport.chart_type === "table") {
        return Table;
      } else {
        return LineChart;
      }
    },
    circleChart() {
      return (
        this.activeReport.chart_type == "donut" ||
        this.activeReport.chart_type == "pie" ||
        this.activeReport.chart_type == "polar-area"
      );
    },
  },
  beforeMount() {
    if (this.$route.name == "Report" && this.$route.params.reportId != "new") {
      this.fetchReport(this.$route.params.reportId);
    } else if (this.$route.name == "Report") {
      this.SET_ACTIVE_REPORT({
        title: "",
        description: "",
        chart_type: "line",
        data_set: { data: [] },
        channel_id: parseInt(this.$route.params.channelId),
      });
    } else {
      this.SET_ACTIVE_REPORT({
        title: "",
        description: "",
        chart_type: "line",
        data_set: { data: [] },
      });
    }
    // TODO: Combine API calls below into one
    this.fetchDataSets();
    this.fetchTags();

    // this.chartOptions.title.text[0] = this.activeReport.title;
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
.description,
.tags {
  grid-column: 1 / span 2;
}
.place-holder {
  height: 300px;
}
.placeholder-text,
.placeholder-icon {
  color: #1976d2;
}
</style>
