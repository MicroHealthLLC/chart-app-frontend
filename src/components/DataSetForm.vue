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
    <v-col>
      <v-alert
        v-if="!formValid && submitAttempted"
        type="error"
        dense
        dismissible
        >Please fix highlighted fields below before sumbitting Report</v-alert
      >
      <!-- Form Fields -->
      <v-form v-model="formValid" ref="form">
        <div class="grid">
          <div>
            <v-text-field
              v-model="activeDataSet.title"
              label="Title"
              dense
              required
              :rules="[(v) => !!v || 'Title is required']"
            ></v-text-field>
          </div>
          <div>
            <v-select
              label="Channel"
              prepend-icon="mdi-playlist-star"
              :items="channels"
              item-text="title"
              multiple
              small-chips
              dense
            ></v-select>
          </div>
          <div>
            <v-text-field
              v-model="activeDataSet.description"
              label="Description"
              dense
            ></v-text-field>
          </div>
          <div>
            <v-file-input
              placeholder="Please choose a file..."
              type="file"
              @change.native="onChange"
              @click:clear="clear"
              dense
              required
              :rules="[(v) => !!v || 'Data File is required']"
            />
            <xlsx-read :options="readOptions" :file="file">
              <xlsx-json
                :options="readOptions"
                @parsed="uploadData"
              ></xlsx-json>
            </xlsx-read>
          </div>
        </div>
      </v-form>
    </v-col>
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
            ref="chart"
            :is="graphType"
            :chartData="selected"
            :chartColors="colors[0].scheme"
            :height="600"
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
import { mapActions, mapGetters, mapMutations } from "vuex";

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
      headers: [],
      items: [],
      selected: [],
      formValid: true,
      submitAttempted: false,
    };
  },
  computed: {
    ...mapGetters(["activeDataSet", "channels", "colors"]),
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
    ...mapMutations(["SET_ACTIVE_DATA_SET"]),
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
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    saveDataSet() {
      this.$refs.form.validate();
      this.submitAttempted = true;

      if (this.formValid) {
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
      }
    },
  },
  mounted() {
    if (this.$route.name == "DataSet") {
      this.data = this.activeDataSet.data;
      this.uploadData(this.data);
    }
  },
  beforeDestroy() {
    // Reset form
    this.SET_ACTIVE_DATA_SET({ title: "", description: "", data: [] });
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
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
</style>
