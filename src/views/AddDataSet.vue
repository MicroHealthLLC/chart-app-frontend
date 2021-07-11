<template>
  <v-row>
    <v-col class="col-12"
      ><h2 class="d-inline-block">Add Data Set</h2>
      <div class="float-right">
        <v-btn class="px-5 mr-2" color="primary" depressed small>Save</v-btn>
        <v-btn small outlined>Cancel</v-btn>
      </div>
    </v-col>
    <v-col class="col-6">
      <v-text-field
        v-model="chartOptions.title.text[0]"
        label="Title"
        dense
      ></v-text-field>
      <v-text-field label="Description" dense></v-text-field>
    </v-col>
    <v-col class="col-6">
      <v-select
        label="Channel"
        prepend-icon="mdi-playlist-star"
        dense
      ></v-select>
      <v-file-input
        placeholder="Please choose a file..."
        type="file"
        @change.native="onChange"
        @click:clear="clear"
        dense />
      <xlsx-read :options="readOptions" :file="file">
        <xlsx-json
          :options="readOptions"
          @parsed="uploadData"
        ></xlsx-json> </xlsx-read
    ></v-col>
    <v-col class="col-12">
      <v-btn-toggle color="primary" mandatory>
        <v-btn class="mt-4" @click="toggleDataTable" small>Data Table</v-btn>
        <v-btn class="mt-4" @click="toggleLineChart" small>Line</v-btn>
        <v-btn class="mt-4" @click="toggleBarChart" small>Bar</v-btn>
        <v-btn class="mt-4" @click="toggleRadarChart" small>Radar</v-btn>
        <v-btn class="mt-4" @click="toggleDonutChart" small>Donut</v-btn>
        <v-btn class="mt-4" @click="togglePieChart" small>Pie</v-btn>
        <v-btn class="mt-4" @click="togglePolarAreaChart" small
          >Polar Area</v-btn
        >
      </v-btn-toggle>

      <div class="chart mt-4">
        <div v-if="headers.length > 0 && chartType === 'Data Table'">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :item-key="headers[0].text"
            :single-select="false"
            show-select
          ></v-data-table>
        </div>
        <Component
          v-else-if="data.length > 0 && chartType !== 'Data Table'"
          :is="graphType"
          :chartData="selected"
          :options="chartOptions"
          :height="600"
          :index="index"
        ></Component>
        <div v-else class="fill-height d-flex justify-center align-center">
          <p class="text-center placeholder-text">
            <v-icon class="placeholder-icon">mdi-chart-areaspline</v-icon>
            Please load a data set to view preview...
          </p>
        </div>
        <v-btn
          v-if="circleChart"
          class="float-right"
          @click="changeChartData"
          outlined
          small
          >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
// import DataTable from "../components/DataTable";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import RadarChart from "../components/RadarChart";
import DoughnutChart from "../components/DoughnutChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import { XlsxRead } from "vue-xlsx";
import { XlsxJson } from "vue-xlsx";

export default {
  name: "AddDataSet",
  components: {
    LineChart,
    BarChart,
    RadarChart,
    DoughnutChart,
    PieChart,
    PolarAreaChart,
    XlsxRead,
    XlsxJson,
  },
  data() {
    return {
      file: null,
      data: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ["", ""],
        },
        bezierCurve: false,
      },
      chartType: "Data Table",
      readOptions: {
        cellDates: true,
        raw: false,
        dateNF: "mm/dd/yyyy",
      },
      index: 0,
      headers: [],
      items: [],
      selected: [],
    };
  },
  computed: {
    graphType() {
      if (this.chartType === "Line") {
        return LineChart;
      } else if (this.chartType === "Bar") {
        return BarChart;
      } else if (this.chartType === "Radar") {
        return RadarChart;
      } else if (this.chartType === "Doughnut") {
        return DoughnutChart;
      } else if (this.chartType === "Pie") {
        return PieChart;
      } else if (this.chartType === "Polar Area") {
        return PolarAreaChart;
      } else {
        return LineChart;
      }
    },
    circleChart() {
      return (
        (this.chartType == "Doughnut" ||
          this.chartType == "Pie" ||
          this.chartType == "Polar Area") &&
        this.data.length > 0
      );
    },
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    clear() {
      console.log("CLEAR!!!");
      this.file = null;
      this.data = [];
      this.selected = [];
      this.headers = [];
      this.items = [];
    },
    toggleDataTable() {
      this.chartType = "Data Table";
    },
    toggleLineChart() {
      this.chartType = "Line";
    },
    toggleBarChart() {
      this.chartType = "Bar";
    },
    toggleRadarChart() {
      this.chartType = "Radar";
    },
    toggleDonutChart() {
      this.chartType = "Doughnut";
    },
    togglePieChart() {
      this.chartType = "Pie";
    },
    togglePolarAreaChart() {
      this.chartType = "Polar Area";
    },
    uploadData(data) {
      console.log(data);

      const keys = Object.keys(data[0]);

      this.headers = keys.map((item) => ({
        text: item,
        value: item,
      }));

      this.items = data;

      this.selected = data;

      this.data = data;
    },
    changeChartData() {
      this.index = (this.index + 1) % (Object.keys(this.data[0]).length - 1);
    },
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 600px;
}
.placeholder-text,
.placeholder-icon {
  color: #1976d2;
}
</style>
