<template>
  <!-- <v-row > -->
  <!-- <v-col cols="12" sm="5" v-for="(report, i) in channelReports" :key="i"> -->
  <span>
    <!-- <v-skeleton-loader v-if="$store.getters.loading" class="mx-auto" type="card, article"></v-skeleton-loader> -->

    <span v-if="data && data.length > 0">
      <fullscreen
        v-if="!fullscreen"
        v-model="fullscreenR"
        :class="fullscreenR ? 'pa-6' : ''"
      >
        <span :class="!report.yAxis ? 'd-flex align-center mb-5' : 'd-flex align-center'">
          <h4>{{ report.title }}</h4>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-4"
                icon
                v-bind="attrs"
                @click.prevent="toReport(report.id)"
                v-on="on"
              >
                <v-icon small>fa-solid fa-up-right-from-square</v-icon>
              </v-btn>
            </template>
            <span>Go to Report</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-4"
                icon
                v-bind="attrs"
                @click="reveal = true"
                v-on="on"
              ><v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </template>
            <span>See Notes</span>
          </v-tooltip>
          <v-tooltip
            v-if="!isReadOnly"
            top
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-4"
                icon
                v-bind="attrs"
                @click.prevent="$emit('deleteItem', report.id)"
                v-on="on"
              ><v-icon
                small
                color="red"
              >fa-trash</v-icon>
              </v-btn>
            </template>
            <span>Remove from Dashboard</span>
          </v-tooltip>
        </span>
        <!-- <fullscreen v-if="!fullscreen" v-model="fullscreenR"> -->
        <span v-if="fullscreenR">
          <v-btn
            class="chart-menu"
            icon
            @click="fullscreenReport"
          >
            <v-icon>{{ fullscreenR ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
          </v-btn>
          <span v-if="report.yAxis" class="d-flex mt-8 mb-0">
            <h5>Y-Axis</h5>
            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="toggleSortY" x-small class="ml-2" v-bind="attrs" v-on="on">
                <v-icon dense>{{ sortDirectionY === 'asc' ? 'mdi-sort-descending' : 'mdi-sort-ascending' }}</v-icon>
              </v-btn>
            </template>
            <span>{{ sortDirectionY === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}</span>
            </v-tooltip>
          </span>
          <Component
            :is="graphType(report)"
            ref="chart"
            :chart-data="data"
            :chart-colors="
              colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
            "
            :graph-type="report.chartType"
            class="mb-4"
            :height="screenHeight"
          />
          <span v-if="report.xAxis" class="d-flex justify-end">
            <h5>X-Axis</h5>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="toggleSortX" x-small class="ml-2" v-bind="attrs" v-on="on">
                  <v-icon dense>{{ sortDirectionX === 'asc' ? 'mdi-sort-descending' : 'mdi-sort-ascending' }}</v-icon>
              </v-btn>
              </template>
              <span>{{ sortDirectionX === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}</span>
            </v-tooltip>
          </span>
          <div class="d-flex justify-end mb-4">
            <v-btn
              v-if="circleChart"
              outlined
              small
              @click="changeChartData"
            >Next Category<v-icon
              small
            >mdi-arrow-right</v-icon></v-btn>
          </div>
        </span>
        <span v-else>
          <v-btn
            class="chart-menu"
            icon
            @click="fullscreenReport"
          >
            <v-icon>{{ fullscreenR ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
          </v-btn>
          <span v-if="report.yAxis" class="d-flex">
            <h5>Y-Axis</h5>
            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="toggleSortY" x-small class="ml-2" v-bind="attrs" v-on="on">
                <v-icon dense>{{ sortDirectionY === 'asc' ? 'mdi-sort-descending' : 'mdi-sort-ascending' }}</v-icon>
              </v-btn>
            </template>
            <span>{{ sortDirectionY === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}</span>
            </v-tooltip>
          </span>
          <Component
            :is="graphType(report)"
            ref="chart"
            :chart-data="data"
            :chart-colors="
              colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
            "
            :graph-type="report.chartType"
            :height="reportHeight"
          />
          <span v-if="report.xAxis" class="d-flex justify-end">
            <h5>X-Axis</h5>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click="toggleSortX" x-small class="ml-2" v-bind="attrs" v-on="on">
                    <v-icon dense>{{ sortDirectionX === 'asc' ? 'mdi-sort-descending' : 'mdi-sort-ascending' }}</v-icon>
                </v-btn>
                </template>
                <span>{{ sortDirectionX === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}</span>
              </v-tooltip>
          </span>
          <div class="d-flex justify-end mb-4">
            <v-btn
              v-if="circleChart"
              outlined
              small
              @click="changeChartData"
            >Next Category<v-icon
              small
            >mdi-arrow-right</v-icon></v-btn>
          </div>
        </span>
      </fullscreen>
      
      <span v-else-if="fullscreen && !fullscreenD">
        <span class="d-flex align-center">
          <h4>{{ report.title }}</h4>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-4"
                icon
                v-bind="attrs"
                @click.prevent="toReport(report.id)"
                v-on="on"
              >
                <v-icon small>fa-solid fa-up-right-from-square</v-icon>
              </v-btn>
            </template>
            <span>Go to Report</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-4"
                icon
                v-bind="attrs"
                @click="reveal = true"
                v-on="on"
              ><v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </template>
            <span>See Notes</span>
          </v-tooltip>
        </span>
        <span v-if="report.yAxis" class="d-flex">
            <!-- <h5>Y-Axis</h5>
            <v-btn @click="sortChart('asc', report.yAxis)" x-small class="mx-4"><v-icon dense>mdi-sort-ascending</v-icon></v-btn>
            <v-btn @click="sortChart('desc', report.yAxis)" x-small><v-icon dense>mdi-sort-descending</v-icon></v-btn> -->
            <h5>Y-Axis</h5>
            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="toggleSortY" x-small class="ml-2" v-bind="attrs" v-on="on">
                <v-icon dense>{{ sortDirectionY === 'asc' ? 'mdi-sort-descending' : 'mdi-sort-ascending' }}</v-icon>
              </v-btn>
            </template>
            <span>{{ sortDirectionY === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}</span>
            </v-tooltip>
          </span>
        <!-- <v-btn @click="fullscreenDialog" class="chart-menu" icon>
          <v-icon>mdi-arrow-expand</v-icon>
        </v-btn> -->
        <Component
          :is="graphType(report)"
          ref="chart"
          :chart-data="data"
          :chart-colors="
            colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
          "
          :graph-type="report.chartType"
          class="mb-4"
          :height="reportHeight"
        />
        <span v-if="report.xAxis" class="d-flex justify-end">
          <!-- <h5>X-Axis</h5>
          <v-btn @click="sortChart('asc', report.xAxis)" x-small class="mx-4"><v-icon dense>mdi-sort-ascending</v-icon></v-btn>
          <v-btn @click="sortChart('desc', report.xAxis)" x-small><v-icon dense>mdi-sort-descending</v-icon></v-btn> -->
          <h5>X-Axis</h5>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="toggleSortX" x-small class="ml-2" v-bind="attrs" v-on="on">
                <v-icon dense>{{ sortDirectionX === 'asc' ? 'mdi-sort-descending' : 'mdi-sort-ascending' }}</v-icon>
            </v-btn>
            </template>
            <span>{{ sortDirectionX === 'asc' ? 'Sort Descending' : 'Sort Ascending' }}</span>
          </v-tooltip>
        </span>
        <div class="d-flex justify-end mb-4">
          <v-btn
            v-if="circleChart"
            outlined
            small
            @click="changeChartData"
          >Next Category<v-icon
            small
          >mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </span>
      <!-- <v-dialog v-model="fullscreenD" fullscreen eager> -->

      <!-- </v-dialog> -->
      <!-- 
      <div v-else-if="fullscreen && fullscreenD"> -->
      <!-- <v-toolbar class="px-5" color="info" dark>
          <h3>{{ report.title }}</h3>
          <v-spacer></v-spacer>
          <v-btn @click="fullscreenD = false" icon><v-icon>mdi-close-thick</v-icon></v-btn>
        </v-toolbar> -->
      <!-- <v-btn @click="fullscreenD = false" class="chart-menu" icon>
          <v-icon>mdi-arrow-collapse</v-icon>
        </v-btn>
        <Component ref="fullscreenchart" :is="graphType(report)" :chartData="data" :chartColors="
          colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
        " :graphType="report.chartType" :title="report.title" class="pa-6">
        </Component>

        <div class="d-flex justify-end pr-6">
          <v-btn v-if="circleChart" @click="changeFSChartData" outlined small>Next Category <v-icon
              small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div> -->
      <!-- <v-card v-else height="100vh">
          <v-toolbar class="px-5" color="info" dark>
            <h3>{{ report.title }}</h3>
            <v-spacer></v-spacer>
            <v-btn @click="fullscreenR = false" icon><v-icon>mdi-close-thick</v-icon></v-btn>
          </v-toolbar>
          <Component v-if="fullscreenR" ref="fullscreenchart" :is="graphType(report)" :chartData="data" :chartColors="
            colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
          " :graphType="report.chartType" :height="screenHeight" :title="report.title" class="pa-6">
          </Component>
          
          <div class="d-flex justify-end pr-6">
            <v-btn v-if="circleChart" @click="changeFSChartData" outlined small>Next Category fullscreenReport<v-icon
                small>mdi-arrow-right</v-icon></v-btn>
          </div>
        </v-card> -->
    </span>

    <v-card
      v-if="reveal"
      class="transition-fast-in-fast-out v-card--reveal"
      style="height: 100%"
    >
      <v-card-text class="pb-0">
        {{ report.description }}
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-0 mt-2"
              icon
              v-bind="attrs"
              @click="reveal = false"
              v-on="on"
            ><v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <span>Hide Notes</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </span>
  <!-- </v-col> -->
  <!-- </v-row> -->
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
import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";

import collect from 'collect.js';

export default {
  name: "DashboardCardReport",
  mixins: [datasetMixin, reportMixin],
  props: {
    report: Object,
    isReadOnly: Boolean,
    fullscreen: Boolean,
  },
  data() {
    return {
      formValid: true,
      showForm: false,
      hhh: [],
      submitAttempted: false,
      deleteDialog: false,
      fullscreenR: false,
      fullscreenD: false,
      reportHeight: 0,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      chartTypes: [
        { text: "Line", value: "line" },
        { text: "Curve", value: "curve" },
        { text: "Area", value: "area" },
        { text: "Bar", value: "bar" },
        { text: "Radar", value: "radar" },
        { text: "Donut", value: "donut" },
        { text: "Pie", value: "pie" },
        { text: "Polar Area", value: "polar-area" },
        { text: "Table", value: "table" },
      ],
      //report: {},
      colorScheme: [],
      data: [],
      reveal: false,
      sortDirectionY: 'asc',
      sortDirectionX: 'asc',
    };
  },
  computed: {
    ...mapGetters([
      "activeDataSet",
      "activeReport",
      "channels",
      "currentChannel",
      "currentChannels",
      "currentChannel",
      "colors",
      "reports",
      "channelDataSets",
      "dataSets",
      "dataSet",
      "reportLoaded",
      "tags",
      "statusCode",
      "user",
    ]),
    circleChart() {
      return (
        this.report.chartType == "donut" ||
        this.report.chartType == "pie" ||
        this.report.chartType == "polar-area"
      );
    },
    newChannelReport() {
      return this.$route.params.reportId == "new";
    },
    screenHeight() {
      console.log(window)
      return window.innerHeight - 110;
    },
  },
  methods: {
    ...mapActions([
      "fetchReport",
      "fetchReports",
      "fetchDataSets",
      "fetchDataSet",
      "fetchTags",
      "addReport",
      "updateReportById",
      "deleteReport",
      "updateChannelById",
    ]),
    ...mapMutations(["SET_REPORT_DATASET", "SET_STATUS_CODE", "SET_REPORT"]),
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    toReport(id) {
      this.$router.replace(`/${this.currentChannels[0].name}/reports/${id}`);
    },
    addDashboard() {
      this.showForm = true;
    },
    // log(e){
    // console.log(e)
    // },
    changeFSChartData() {
      this.$refs.fullscreenchart.index =
        (this.$refs.fullscreenchart.index + 1) %
        (Object.keys(this.$refs.fullscreenchart.chartData[0]).length - 1);
    },
    resetAndGoBack() {
      this.$router.go(-1);
      this.$refs.form.reset();
    },
    graphType(report) {
      if (report.chartType === "line") {
        return LineChart;
      } else if (report.chartType === "bar") {
        return BarChart;
      } else if (report.chartType === "radar") {
        return RadarChart;
      } else if (report.chartType === "donut") {
        return DoughnutChart;
      } else if (report.chartType === "pie") {
        return PieChart;
      } else if (report.chartType === "polar-area") {
        return PolarAreaChart;
      } else if (report.chartType === "table") {
        return Table;
      } else {
        return LineChart;
      }
    },
    async updateChartData() {
      await this.fetchDataSet(this.report.dataSetId);

      /* GET KEYS FROM ALL DATA */
      let uniqueKeys = []
      let newKeys = this.dataSet.dataValues.items.map(s => Object.keys(s.data))

      newKeys.forEach(arr => {
        arr.forEach(key => {
          if (!uniqueKeys.includes(key)) {
            uniqueKeys.push(key)
          }
        })
      })
      let headers = uniqueKeys.filter(k => k != '$id')

      headers.forEach((k, j) => {
        if (k == this.report.xAxis) {
          this.arrayMove(headers, j, 0);
        }
        if (k == this.report.yAxis) {
          this.arrayMove(headers, j, 1);
        }
      });
      let newHeaders = [];
      //console.log(this.report)
      if (this.report.columns && this.report.columns.length > 0) {
        newHeaders = JSON.parse(this.report.columns);
      } else {
        newHeaders = headers.map((item) => ({
          text: item,
          value: item,
        }));
      }

      this.data = this.createMasterData(this.dataSet.dataValues.items);
      this.data = this.filterData(newHeaders, this.data);
      if (this.report.yAction) {
        this.onChangeYAction()
      }
      this.SET_REPORT_DATASET(this.dataSet);
    },
    onChangeYAction() {
      const data = collect(this.data)
      let xLabel = Object.keys(this.data[0])[0]
      let yLabel = Object.keys(this.data[0])[1]
      let newArray = [];
      if (this.report.yAction == 'Count Unique Values') {
        const counted = data.countBy(row => row[xLabel])

        for (const key in counted.items) {
          let newObj = {
            [xLabel]: key,
            [`Count Unique Values (${yLabel})`]: +counted.items[key].toFixed(2)
          };
          newArray.push(newObj);
        }
        this.data = newArray
      } else if (this.report.yAction == 'Count') {
        const counted = data.countBy(row => row[xLabel])

        for (const key in counted.items) {
          let newObj = {
            [xLabel]: key,
            [`Count (${xLabel})`]: +counted.items[key].toFixed(2)
          };
          newArray.push(newObj);
        }
        this.data = newArray
      } else if (this.report.yAction == 'Sum') {
        let grouped = data.groupBy(xLabel)

        for (const item in grouped.items) {
          let newObj = {
            [xLabel]: item,
            [`Sum (${yLabel})`]: +grouped.items[item].reduce((acc, item) => acc + parseFloat(item[yLabel]), 0).toFixed(2)
          };
          newArray.push(newObj);
        }
        this.data = newArray
      } else if (this.report.yAction == 'Average') {
        let grouped = data.groupBy(xLabel)
  
        for (const item in grouped.items) {
          let sum = grouped.items[item].reduce((acc, item) => acc + parseFloat(item[yLabel]), 0);
          let count = grouped.items[item].count();
          let average = sum / count;
          let newObj = {
            [xLabel]: item,
            [`Average (${yLabel})`]: +average.toFixed(2)
          };
          newArray.push(newObj);
        }
        this.data = newArray
      } else if (this.report.yAction == 'Median') {
        let grouped = data.groupBy(xLabel)
              
        for (const item in grouped.items) {
          let values = grouped.items[item].pluck(yLabel).map(item => parseFloat(item)).toArray().sort((a, b) => b - a)
          let median = collect(values).median();
          let newObj = {
            [xLabel]: item,
            [`Median (${yLabel})`]: +median.toFixed(2)
          };
          newArray.push(newObj);
        }
        this.data = newArray
      } else if (this.report.yAction == 'Maximum') {
        let grouped = data.groupBy(xLabel)

        for (const item in grouped.items) {
          let max = grouped.items[item].reduce((max, item) => {
            let val = parseFloat(item[yLabel])
            return val > max ? val : max
          }, -Infinity)

          let newObj = {
            [xLabel]: item,
            [`Maximum (${yLabel})`]: +max.toFixed(2)
          };
          newArray.push(newObj);
        }

        this.data = newArray
      } else if (this.report.yAction == 'Minimum') {
        let grouped = data.groupBy(xLabel)

        for (const item in grouped.items) {
          let min = grouped.items[item].reduce((min, item) => {
            let val = parseFloat(item[yLabel])
            return val < min ? val : min
          }, Infinity)

          let newObj = {
            [xLabel]: item,
            [`Minimum (${yLabel})`]: +min.toFixed(2)
          };
          newArray.push(newObj);
        }

        this.data = newArray
      }
    },
    sortChart(direction, axis) {
      const data = collect(this.data)
      const newArray = [];

      /* Sorts based on Axis and Direction */
      let sorted = direction === 'asc' ? (axis == this.report.yAxis ? data.sortBy(item => parseFloat(item[`${this.report.yAction} (${axis})`])) : data.sortBy(item => parseFloat(item[axis]))) :
      direction === 'desc' ? (axis == this.report.yAxis ? data.sortByDesc(item => parseFloat(item[`${this.report.yAction} (${axis})`])) : data.sortByDesc(item => parseFloat(item[axis]))) : ''

      sorted.items.forEach(item => newArray.push(item))
      this.data = newArray
    },
    toggleSortY() {
      this.sortDirectionY = this.sortDirectionY === 'asc' ? 'desc' : 'asc';
      this.sortChart(this.sortDirectionY, this.report.yAxis);
    },
    toggleSortX() {
      this.sortDirectionX = this.sortDirectionX === 'asc' ? 'desc' : 'asc';
      this.sortChart(this.sortDirectionX, this.report.xAxis);
    },
    fullscreenReport() {
      this.fullscreenR = this.fullscreenR ? false : true;
      /* setTimeout(() => {
        this.$refs.fullscreenchart.loadChart();
      }, 100); */
    },
    fullscreenDialog() {
      this.fullscreenD = true
    },
    updateColors(selectedSchemeId) {
      this.colorScheme = this.colors.find(
        (color) => selectedSchemeId == color.id
      ).scheme;
    },
  },
  watch: {
    dataSets() {
      this.dataSetChoices = [...this.dataSets];
    },
    data() {
      if (this.data.length > 0) {
        return this.data;
      }
    },
    report() {
      this.updateChartData();
    },
    fullscreenR() {
      console.log(this.fullscreenR)
      /* if (this.fullscreenR) {
        this.reportHeight = this.screenHeight
      } else {
        this.reportHeight = 400
      } */
      this.updateChartData()
    },
  },
  mounted() {
    this.fetchReports();
    this.fetchDataSets();
    this.updateChartData();
    setTimeout(() => {
        if (this.$parent.$parent.$el.clientHeight != 0) {
          this.reportHeight = this.$parent.$parent.$el.clientHeight - 100
        }
        console.log(this.reportHeight)
      }, 100);
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 80vh;

}

.fullscreen {
  background: whitesmoke;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 350px;
  min-height: 180px;
}

.no-content-msg {
  font-size: larger;
  font-style: italic;
  font-weight: 400;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.margin-auto {
  margin: auto !important;
}

.description,
.tags {
  grid-column: 1 / span 2;
}

.placeholder-title {
  color: gray;
}

.place-holder {
  height: 300px;
}

.placeholder-text,
.placeholder-icon {
  color: #1976d2;
}

.chart-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}</style>
