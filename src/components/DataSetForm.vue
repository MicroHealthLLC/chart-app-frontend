<template>
  <v-row>
    <!-- Title -->
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3>Add Data Set</h3>
        <div>
          <v-btn
            @click="saveDataSet"
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            >Save</v-btn
          >
          <v-btn class="mb-2" to="/" small outlined>Cancel</v-btn>
        </div>
      </div>
      <v-divider></v-divider>
    </v-col>
    <!-- Form Fields -->
    <v-col class="col-6">
      <v-text-field
        v-model="activeDataSet.title"
        label="Title"
        dense
      ></v-text-field>
      <v-text-field
        v-model="activeDataSet.description"
        label="Description"
        dense
      ></v-text-field>
    </v-col>
    <v-col class="col-6">
      <v-select
        label="Channel"
        prepend-icon="mdi-playlist-star"
        :items="channels"
        item-text="title"
        multiple
        small-chips
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
    <!-- Chart Preview -->
    <v-col class="col-12">
      <v-card class="d-flex flex-column preview-container">
        <!-- Chart Buttons -->
        <v-btn-toggle class="ma-4" color="primary" mandatory>
          <v-btn @click="toggleDataTable" small>Data Table</v-btn>
          <v-btn @click="toggleLineChart" small>Line</v-btn>
          <v-btn @click="toggleBarChart" small>Bar</v-btn>
          <v-btn @click="toggleRadarChart" small>Radar</v-btn>
          <v-btn @click="toggleDonutChart" small>Donut</v-btn>
          <v-btn @click="togglePieChart" small>Pie</v-btn>
          <v-btn @click="togglePolarAreaChart" small>Polar Area</v-btn>
        </v-btn-toggle>
        <!-- Table Preview -->
        <div
          class="ma-4"
          v-if="headers.length > 0 && chartType === 'Data Table'"
        >
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :item-key="headers[0].text"
            :single-select="false"
            show-select
          ></v-data-table>
        </div>
        <!-- Chart Previews -->
        <div
          v-else-if="data.length > 0 && chartType !== 'Data Table'"
          class="ma-4"
        >
          <Component
            :is="graphType"
            :chartData="selected"
            :options="chartOptions"
            :height="600"
            :index="index"
          ></Component>
          <v-btn
            v-if="circleChart"
            class="float-right"
            @click="changeChartData"
            outlined
            small
            >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
        <!-- Placeholder Message -->
        <div v-else class="d-flex flex-grow-1 justify-center align-center ma-4">
          <p class="text-center placeholder-text">
            <v-icon class="placeholder-icon">mdi-chart-areaspline</v-icon>
            Please load a data set to view preview...
          </p>
        </div>
      </v-card>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DataSetForm",
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
    ...mapGetters(["activeDataSet", "channels"]),
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
    ...mapActions(["addDataSet", "updateDataSet"]),
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    clear() {
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
    saveDataSet() {
      let dataSet = {
        title: this.activeDataSet.title,
        description: this.activeDataSet.description,
        data: this.data,
      };

      if (this.activeDataSet.id) {
        dataSet.id = this.activeDataSet.id;
        this.updateDataSet(dataSet);
      } else {
        this.addDataSet(dataSet);
      }
    },
  },
  mounted() {
    if (this.$route.name == "DataSet") {
      this.data = this.activeDataSet.data;
      this.uploadData(this.data);
    }
  },
  watch: {
    activeDataSet() {
      this.data = this.activeDataSet.data;
      this.uploadData(this.data);
    },
  },
};
</script>

<style scoped>
.preview-container {
  height: 750px;
}
.placeholder-text,
.placeholder-icon {
  color: #1976d2;
}
</style>
