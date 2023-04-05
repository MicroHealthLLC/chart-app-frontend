<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3 v-if="activeReport && activeReport.title">
          {{ activeReport.title }}
        </h3>
        <h3
          v-else
          class="placeholder-title"
        >
          (Report Title)
        </h3>
        <div>
          <v-btn
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            @click="saveReport"
          >
            Save
          </v-btn>
          <v-btn
            class="mb-2"
            outlined
            small
            @click="resetAndGoBack"
          >
            Close
          </v-btn>
        </div>
      </div>

      <v-divider class="mb-4" />

      <v-alert
        v-if="!formValid && submitAttempted"
        type="error"
        dense
        dismissible
      >
        Please fix highlighted fields below before sumbitting Report
      </v-alert>

      <v-card
        v-if="
          data &&
            data.length > 0 &&
            activeReport.colorSchemeId &&
            activeReport.chartType
        "
        class="pa-4 mb-4"
      >
        <v-btn
          class="chart-menu"
          icon
          @click="fullscreenReport"
        >
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <span v-if="yAxisValue" class="d-flex">
          <h5>Y-Axis</h5>
            <v-btn @click="sortChart('asc', yAxisValue)" x-small class="mx-4"><v-icon dense>mdi-sort-ascending</v-icon></v-btn>
            <v-btn @click="sortChart('desc', yAxisValue)" x-small><v-icon dense>mdi-sort-descending</v-icon></v-btn>
        </span>
        <!-- Chart -->
        <Component
          :is="graphType"
          ref="chart"
          :chart-data="data"
          :chart-colors="colorScheme"
          :graph-type="activeReport.chartType"
          :height="350"
          :title="activeReport.title"
          class="mb-4"
        />
        <span v-if="xAxisValue" class="d-flex justify-end">
            <h5>X-Axis</h5>
            <v-btn @click="sortChart('asc', xAxisValue)" x-small class="mx-4"><v-icon dense>mdi-sort-ascending</v-icon></v-btn>
            <v-btn @click="sortChart('desc', xAxisValue)" x-small><v-icon dense>mdi-sort-descending</v-icon></v-btn>
        </span>
        
        <!-- Placeholder -->
        <!-- This div has a v-else directive -->
        <!-- <div
        
          class="place-holder d-flex justify-center align-center ma-4"
        >
          <p class="text-center placeholder-text mb-0">
            <v-icon class="placeholder-icon">mdi-chart-areaspline</v-icon>
            Please load a data set to view preview...
          </p>
        </div> -->
        <!-- Category Toggle Button -->
        <div class="d-flex justify-end mb-4">
          <v-btn
            v-if="circleChart"
            outlined
            small
            @click="changeChartData"
          >
            Next Category <v-icon
              small
            >
              mdi-arrow-right
            </v-icon>
          </v-btn>
          <!-- <v-btn
            v-if="
               activeReport.dataSet &&
               activeReport.dataSet.dataValues && activeReport.dataSet.dataValues[0] &&
              Object.keys(activeReport.dataSet.dataValues[0]).length > 2 &&
              circleChart
            "
            @click="changeChartData"
            outlined
            small
            >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
          > -->
        </div>
      </v-card>
      <!-- <v-card v-else-if="$store.getters.loading" class="pa-4 mb-4 text-center">
        <v-progress-circular  :size="70" indeterminate color="primary"
          class="m-2">
        </v-progress-circular>
      </v-card> -->

      <span class="d-flex justify-space-between">
        <h3>Report Details</h3>
        <h5 v-if="activeReport.createdBy">By: {{ activeReport.createdBy }}</h5>
      </span>
      <v-divider class="mb-8" />
      <!-- Form Fields -->
      <v-form
        v-if="activeReport"
        ref="form"
        v-model="formValid"
      >
        <div class="grid">
          <div>
            <v-text-field
              v-model="activeReport.title"
              label="Title"
              dense
              required
              :rules="[(v) => !!v || 'Title is required']"
            />
          </div>
          <div>
            <v-select
              v-model="activeReport.reportGroupId"
              dense
              label="Folder"
              :items="reportGroups"
              item-text="title"
              item-value="id"
            />
          </div>

          <div class="description">
            <v-textarea
              v-model="activeReport.description"
              label="Description"
              rows="1"
              auto-grow
              dense
            />
          </div>
          <!-- <div>
            <v-text-field v-if="activeReport.createdBy" :value="activeReport.createdBy" label="Created By" dense
              readonly></v-text-field>
          </div> -->
          <!-- <div>
            <v-select
              v-model="activeReport.channelId"
              :items="channels"
              item-text="title"
              item-value="id"
              label="Channel"
              dense
              required
              :rules="[(v) => !!v || 'Channel is required']"
              :readonly="newChannelReport"
            ></v-select>
          </div> -->
          <!-- <div>
            <v-text-field v-if="activeReport.updatedBy" :value="activeReport.updatedBy" label="Last Updated By" dense
              readonly></v-text-field>
          </div> -->
          <div>
            <v-select
              v-model="activeReport.dataSetId"
              :items="dataSetChoices"
              item-text="title"
              item-value="id"
              label="Data Set"
              dense
              required
              :rules="[(v) => !!v || 'Data Set is required']"
              @change="updateChartData"
            />
          </div>
          <div>
            <v-select
              v-model="activeReport.chartType"
              :items="chartTypes"
              item-text="text"
              item-value="value"
              label="Chart Type"
              dense
            />
          </div>
          <div>
            <v-select
              v-model="selectedHeaders"
              :items="headers"
              label="Target Columns"
              multiple
              small
              dense
              return-object
              @change="onChangeSelected"
            />
          </div>
          <div>
            <v-select
              v-model="activeReport.colorSchemeId"
              label="Color Scheme"
              :items="colors"
              item-text="title"
              item-value="id"
              dense
              @change="updateColors"
            />
          </div>
          <div>
            <v-select
              v-model="xAxisValue"
              :items="xAxisKeys"
              label="X-Axis"
              dense
              @change="onChangeXAxis"
              clearable
            />
          </div>
          <div>
            <v-select
              v-model="yAxisValue"
              :items="yAxisKeys"
              label="Y-Axis"
              dense
              @change="onChangeYAxis"
              clearable
            />
            <v-select
              v-if="yAxisValue || xAxisValue"
              v-model="yAction"
              label="Action"
              dense
              clearable
              :items="['Count', 'Count Unique Values', 'Sum', 'Average']"
              @change="onChangeYAction"
              @click:clear="onClearYAction"
            />
          </div>
          <!-- <div class="tags">
            <v-select
              v-model="activeReport.tags"
              :items="tags"
              item-text="title"
              item-value="id"
              chips
              color="info"
              label="Tags"
              multiple
              deletable-chips
              return-object
              dense
            >
            </v-select>
          </div> -->
        </div>
      </v-form>
      <!-- Delete Button -->
      <div
        v-if="activeReport && activeReport.id"
        class="d-flex justify-end mt-4"
      >
        <v-btn
          small
          color="error"
          depressed
          outlined
          @click="deleteDialog = true"
        >
          Delete Report
        </v-btn>
      </div>
      <!-- Delete Prompt -->
      <v-dialog
        v-model="deleteDialog"
        max-width="400"
      >
        <v-card>
          <v-card-title>Delete this report?</v-card-title>
          <v-divider class="mx-4 mb-2" />
          <v-card-text>Are you sure you would like to delete this report?</v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn
              small
              outlined
              color="secondary"
              @click="deleteDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              small
              depressed
              color="error"
              @click="deleteReport"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Fullscreen Report Modal -->
      <v-dialog
        v-model="fullscreen"
        fullscreen
        eager
      >
        <v-card>
          <v-toolbar
            class="px-5"
            color="info"
            dark
          >
            <h3>{{ activeReport.title }}</h3>
            <v-spacer />
            <v-btn
              icon
              @click="fullscreen = false"
            >
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
          </v-toolbar>
          <Component
            :is="graphType"
            v-if="fullscreen && colorScheme"
            ref="fullscreenchart"
            :chart-data="data"
            :chart-colors="colorScheme"
            :graph-type="activeReport.chartType"
            :height="screenHeight"
            :title="activeReport.title"
            class="pa-6"
          />
          <!-- Category Toggle Button -->
          <div class="d-flex justify-end pr-6">
            <v-btn
              v-if="circleChart"
              outlined
              small
              @click="changeFSChartData"
            >
              Next Category <v-icon
                small
              >
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
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
import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";

import collect from 'collect.js';

export default {
  name: "ReportForm",
  mixins: [datasetMixin, reportMixin],
  data() {
    return {
      formValid: true,
      submitAttempted: false,
      deleteDialog: false,
      fullscreen: false,
      reportGroupIds: [],
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
      colorScheme: [],
      dataSetChoices: [],
      data: [],
      headers: [],
      selectedHeaders: [],
      xAxisKeys: [],
      xAxisValue: "",
      yAxisKeys: [],
      yAxisValue: "",
      yAction: ''
    };
  },

  computed: {
    ...mapGetters([
      "activeDataSet",
      "activeReport",
      "channels",
      "currentChannel",
      "channelReports",
      "currentChannels",
      "colors",
      "channelDataSets",
      "dataSets",
      "dataSet",
      "reportLoaded",
      "tags",
      "statusCode",
      "reports",
      "reportGroups",
      "user",
    ]),
    channelReports() {
      if (this.reports && this.reports.length > 0) {
        return this.reports.filter(
          (t) => t.channelId == this.currentChannels[0].channelId
        );
      } else
        return this.reports.filter(
          (t) =>
            t.channelId == this.currentChannels[0].channelId && !t.reportGroupId
        );
    },
    graphType() {
      if (this.activeReport.chartType === "line") {
        return LineChart;
      } else if (this.activeReport.chartType === "bar") {
        return BarChart;
      } else if (this.activeReport.chartType === "radar") {
        return RadarChart;
      } else if (this.activeReport.chartType === "donut") {
        return DoughnutChart;
      } else if (this.activeReport.chartType === "pie") {
        return PieChart;
      } else if (this.activeReport.chartType === "polar-area") {
        return PolarAreaChart;
      } else if (this.activeReport.chartType === "table") {
        return Table;
      } else {
        return LineChart;
      }
    },
    circleChart() {
      return (
        this.activeReport.chartType == "donut" ||
        this.activeReport.chartType == "pie" ||
        this.activeReport.chartType == "polar-area"
      );
    },
    newChannelReport() {
      return this.$route.params.reportId == "new";
    },
    screenHeight() {
      return window.innerHeight - 200;
    },
  },
  methods: {
    ...mapActions([
      "fetchReport",
      "fetchDataSets",
      "fetchDataSet",
      "fetchTags",
      "addReport",
      "updateReportById",
      "updateReportGroupById",
      "removeReport",
      "updateChannelById",
    ]),
    ...mapMutations(["SET_REPORT_DATASET", "SET_STATUS_CODE", "SET_REPORT"]),
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    /* log(e){
    console.log(e)
    },  */
    changeFSChartData() {
      this.$refs.fullscreenchart.index =
        (this.$refs.fullscreenchart.index + 1) %
        (Object.keys(this.$refs.fullscreenchart.chartData[0]).length - 1);
    },
    resetAndGoBack() {
      //this.$router.go(-1)
      this.$refs.form.reset();
      if (this.$route.path === `/${this.currentChannels[0].name}/reports`) {
        this.$emit("closeAddReportForm");
      } else {
        this.$router.go(-1);
        //this.$router.push(`/${this.currentChannels[0].name}/reports`)
      }
    },
    saveReport() {
      this.$refs.form.validate();
      this.submitAttempted = true;

      if (this.formValid) {
        let data = {
          title: this.activeReport.title,
          reportGroupId: this.activeReport.reportGroupId,
          description: this.activeReport.description,
          channelId: this.currentChannels[0].channelId,
          chartType: this.activeReport.chartType,
          dataSetId: this.activeReport.dataSetId,
          xAxis: this.xAxisValue,
          yAxis: this.yAxisValue,
          yAction: this.yAction,
          columns: JSON.stringify(this.selectedHeaders),
          // dataSet: this.activeReport.dataSet,
          // tag_ids: this.activeReport.tags.map((tag) => tag.id),
          colorSchemeId: this.activeReport.colorSchemeId,
          // last_updated_by: `${this.user.first_name} ${this.user.last_name}`,
        };

        if (this.activeReport.id) {
          data.id = this.activeReport.id;
          data.reportGroupId = this.activeReport.reportGroupId;
          data.updatedBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
          this.updateReportById(data);
        } else {
          console.log(data);
          data.createdBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
          // data.user_id = this.user.id;
          this.addReport(data);
        }

        this.resetAndGoBack();
      }
    },
    async updateChartData() {
      await this.fetchDataSet(this.activeReport.dataSetId);

      /* GET KEYS FROM ALL DATA */
      let uniqueKeys = []
      let newKeys = this.dataSet.dataValues.items.map(s => Object.keys(s.data))
      console.log(newKeys)
      newKeys.forEach(arr => {
        arr.forEach(key => {
          if (!uniqueKeys.includes(key)) {
            uniqueKeys.push(key)
          }
        })
      })
      let headers = uniqueKeys.filter(k => k != '$id')

      headers.forEach((k, i) => {
        if (k == this.xAxisValue) {
          this.arrayMove(headers, i, 0);
        }
        if (k == this.yAxisValue) {
          this.arrayMove(headers, i, 1);
        }
      });
      console.log(this.headers)
      this.headers = headers;
      let newHeaders = [];
      if (this.activeReport.columns && this.activeReport.columns.length > 0) {
        newHeaders = this.activeReport.columns;
      } else {
        newHeaders = headers.map((item) => ({
          text: item,
          value: item,
        }));
      }
      //console.log(newHeaders)
      this.data = this.createMasterData(this.dataSet.dataValues.items);
      this.selectedHeaders = newHeaders;
      this.data = this.filterData(this.selectedHeaders, this.data);
      this.updateColors(this.activeReport.colorSchemeId);
      this.SET_REPORT_DATASET(this.dataSet);
    },
    onChangeSelected() {
      this.selectedHeaders.forEach((s, i) => {
        if (typeof s == "string") {
          this.selectedHeaders[i] = { text: s, value: s };
        }
      });
      this.xAxisKeys = this.selectedHeaders.map((h) => h.text || h);
      this.yAxisKeys = this.selectedHeaders.map((h) => h.text || h);
      /* if (this.dataSet && this.dataSet.dataValues && this.dataSet.dataValues.items && this.dataSet.dataValues.items.length > 0) { */
      this.data = this.filterData(
        this.selectedHeaders,
        this.createMasterData(this.dataSet.dataValues.items)
      );
    },
    onChangeXAxis() {
      this.xAxisKeys = this.selectedHeaders.map((h) => h.text || h);
      this.moveArrByKey(this.xAxisKeys, this.xAxisValue, 0);
      this.selectedHeaders = this.xAxisKeys.map((x) => ({
        text: x,
        value: x,
      }));
      this.data = this.filterData(
        this.selectedHeaders,
        this.createMasterData(this.dataSet.dataValues.items)
      );
    },
    onChangeYAxis() {
      /* console.log(this.xAxisKeys, this.xAxisValue)
      console.log(this.yAxisKeys, this.yAxisValue) */
      this.yAxisKeys = this.selectedHeaders.map((h) => h.text || h);
      this.moveArrByKey(this.yAxisKeys, this.yAxisValue, 1);
      this.selectedHeaders = this.yAxisKeys.map((y) => ({
        text: y,
        value: y,
      }));
      this.data = this.filterData(
        this.selectedHeaders,
        this.createMasterData(this.dataSet.dataValues.items)
      );
    },
    onChangeYAction() {
      const data = collect(this.data)
      const newArray = [];
      if (this.yAction == 'Count Unique Values') {
        const counted = data.countBy(row => row[this.xAxisValue])

        for (const key in counted.items) {
          let newObj = {
            [this.xAxisValue]: key,
            [`Count Unique Values (${this.yAxisValue})`]: counted.items[key].toString()
          };
          newArray.push(newObj);
        }
        this.data = newArray
      } else if (this.yAction == 'Sum') {
        //
      } else if (this.yAction == 'Average') {
        //
      } else if (this.yAction == 'Count') {
        const counted = data.countBy(row => row[this.xAxisValue])
        console.log(counted)
        for (const key in counted.items) {
          let newObj = {
            [this.xAxisValue]: key,
            [`Count (${this.xAxisValue})`]: counted.items[key].toString()
          };
          newArray.push(newObj);
        }
        this.data = newArray
      }
    },
    onClearYAction() {
      this.updateChartData()
    },
    sortChart(direction, axis) {
      const data = collect(this.data)
      const newArray = [];

      /* Sorts based on Axis and Direction */
      let sorted = direction == 'asc' ? (axis == this.yAxisValue ? data.sortBy(item => parseFloat(item[`${this.yAction} (${axis})`])) : data.sortBy(item => parseFloat(item[axis]))) : (axis == this.yAxisValue ? data.sortByDesc(item => parseFloat(item[`${this.yAction} (${axis})`])) : data.sortByDesc(item => parseFloat(item[axis])))

      sorted.items.forEach(item => newArray.push(item))
      this.data = newArray
    },
    moveArrByKey(keys, selected, axis) {
      keys.forEach((k, i) => {
        if (k == selected) {
          this.arrayMove(keys, i, axis);
        }
      });
    },
    deleteReport() {
      this.removeReport({ id: this.activeReport.id });
      this.$router.push(`/${this.$route.params.channelId}/reports`);
    },
    fullscreenReport() {
      //console.log(this.$refs.fullscreenchart)
      this.fullscreen = true;
      setTimeout(() => {
        this.$refs.fullscreenchart.loadChart();
      }, 100);
    },
    updateColors(selectedSchemeId) {
      this.colorScheme = this.colors.find(
        (color) => selectedSchemeId == color.id
      ).scheme;
    },
  },
  watch: {
    activeReport() {
      if (this.$route.params.reportId != "add-report" && this.activeReport.id) {
        this.colorScheme = this.colors.find(
          (scheme) => scheme.id == this.activeReport.colorSchemeId
        ).scheme;
        if (this.activeReport.xAxis) {
          this.xAxisValue = this.activeReport.xAxis;
        }
        if (this.activeReport.yAxis) {
          this.yAxisValue = this.activeReport.yAxis;
        }
        if (this.activeReport.columns) {
          this.selectedHeaders = this.activeReport.columns;
        }
       console.log(this.activeReport)
        this.xAxisKeys = this.selectedHeaders.map((h) => h.text || h);
        this.yAxisKeys = this.selectedHeaders.map((h) => h.text || h);
        this.updateChartData()
        if (this.activeReport.yAction) {
          setTimeout(() => {
            this.yAction = this.activeReport.yAction;
            this.onChangeYAction()
          }, 200);
        }
      }
      if (!this.activeReport) {
        this.SET_REPORT(this.newReport);
        console.log("No Active Report");
      }
    },
  },
  async beforeMount() {
    if (this.dataSets && this.dataSets.length < 1) {
      await this.fetchDataSets();
    }
  },
  async mounted() {
    await this.fetchDataSets();
    this.dataSetChoices = [
      ...this.dataSets.filter(
        (d) => d.channelId == this.currentChannels[0].channelId
      ),
    ];
    if (this.$route.params.reportId == "add-report") {
      this.activeReport.id = "";
      this.dataSet.id = "";
    }
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
}
</style>
