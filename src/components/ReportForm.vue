<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3 v-if="activeReport && activeReport.title">{{ activeReport.title }}</h3>
        <h3 v-else class="placeholder-title">(Report Title)</h3>
        <div>
          <v-btn
            class="px-5 mr-2 mb-2"
            color="primary"
            @click="saveReport"
            depressed
            small
            >Save</v-btn
          >
          <v-btn class="mb-2" @click="resetAndGoBack" outlined small
            >Close</v-btn
          >
        </div>
      </div>

      <v-divider class="mb-4"></v-divider>

      <v-alert
        v-if="!formValid && submitAttempted"
        type="error"
        dense
        dismissible
        >Please fix highlighted fields below before sumbitting Report</v-alert
      >

      <v-card v-if="(data && data.length > 0)" class="pa-4 mb-4">
        <v-btn @click="fullscreenReport" class="chart-menu" icon>
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <!-- Chart -->
        <Component
          ref="chart"
          :is="graphType"
          :chartData="data"
          :chartColors="colorScheme"
          :graphType="activeReport.chartType"
          :height="350"
          :title="activeReport.title"
          class="mb-4"
        >
        </Component>
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
            @click="changeChartData"
            outlined
            small
            >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
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

      <h3>Report Details</h3>
      <v-divider class="mb-8"></v-divider>
      <!-- Form Fields -->
      <v-form v-if="activeReport" v-model="formValid" ref="form"
        ><div class="grid">
          <div>
            <v-text-field
              v-model="activeReport.title"
              label="Title"
              dense
              required
              :rules="[(v) => !!v || 'Title is required']"
            ></v-text-field>
          </div>
          <div>
            <v-select
              dense
              v-model="activeReport.reportGroupId"
              label="Report Group"
              :items="reportGroups"
              item-text="title"
              item-value="id"         
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
          <div>
            <v-text-field
              v-if="activeReport.createdAt"
              :value="activeReport.createdBy ? `${activeReport.createdBy} on ${new Date(this.activeReport.createdAt).toLocaleString()}` : `${new Date(this.activeReport.createdAt).toLocaleString()}`"
              :label="activeReport.createdBy ? 'Created By' : 'Created On'"
              dense
              readonly
            ></v-text-field>
          </div>
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
          <div>
            <v-text-field
              v-if="activeReport.updatedAt"
              :value="`${activeReport.updatedBy} on ${new Date(this.activeReport.updatedAt).toLocaleString()}`"
              label="Last Updated By"
              dense
              readonly
            ></v-text-field>
          </div>
          <div>
            <v-select
              v-model="activeReport.dataSetId"
              :items="dataSetChoices"
              item-text="title"
              item-value="id"
              label="Data Set"
              dense
              @change="updateChartData"
              required
              :rules="[(v) => !!v || 'Data Set is required']"
            ></v-select>
          </div>
          <div>
            <v-select
              v-model="activeReport.chartType"
              :items="chartTypes"
              item-text="text"
              item-value="value"
              label="Chart Type"
              dense
            ></v-select>
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
            >
            </v-select>
          </div>
          <div>
            <v-select v-model="xAxisValue" :items="xAxisKeys" label="X-Axis" dense @change="onChangeAxis"></v-select>
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
          <div>
            <v-select
              v-model="activeReport.colorSchemeId"
              label="Color Scheme"
              :items="colors"
              item-text="title"
              item-value="id"
              dense
              @change="updateColors"
            ></v-select>
          </div>
        </div>
      </v-form>
      <!-- Delete Button -->
      <div v-if="activeReport && activeReport.id" class="d-flex justify-end mt-4">
        <v-btn
          @click="deleteDialog = true"
          small
          color="error"
          depressed
          outlined
          >Delete Report</v-btn
        >
      </div>
      <!-- Delete Prompt -->
      <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
          <v-card-title>Delete this report?</v-card-title>
          <v-divider class="mx-4 mb-2"></v-divider>
          <v-card-text
            >Are you sure you would like to delete this report?</v-card-text
          >
          <v-card-actions class="d-flex justify-end">
            <v-btn
              @click="deleteDialog = false"
              small
              outlined
              color="secondary"
              >Cancel</v-btn
            >
            <v-btn @click="deleteReport" small depressed color="error"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Fullscreen Report Modal -->
      <v-dialog v-model="fullscreen" fullscreen eager>
        <v-card>
          <v-toolbar class="px-5" color="info" dark>
            <h3>{{ activeReport.title }}</h3>
            <v-spacer></v-spacer>
            <v-btn @click="fullscreen = false" icon
              ><v-icon>mdi-close-thick</v-icon></v-btn
            >
          </v-toolbar>
          <Component
            v-if="fullscreen && colorScheme"
            ref="fullscreenchart"
            :is="graphType"
            :chartData="data"
            :chartColors="colorScheme"
            :graphType="activeReport.chartType"
            :height="screenHeight"
            :title="activeReport.title"
            class="pa-6"
          >
          </Component>
          <!-- Category Toggle Button -->
          <div class="d-flex justify-end pr-6">
            <v-btn
              v-if="circleChart"
              @click="changeFSChartData"
              outlined
              small
              >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
            >
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

export default {
  name: "ReportForm",
  data() {
    return {
      formValid: true,
      submitAttempted: false,
      deleteDialog: false,
      fullscreen: false,
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
    };
  },
  mixins: [datasetMixin, reportMixin],
  methods: {
    ...mapActions([
      "fetchReport",
      "fetchDataSets",
      "fetchDataSet",
      "fetchTags",
      "addReport",
      "updateReportById",
      "removeReport",
      "updateChannelById"
    ]),
    ...mapMutations(["SET_REPORT_DATASET", "SET_STATUS_CODE", "SET_REPORT"]),
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    log(e){
    console.log(e)
    }, 
    changeFSChartData() {
      this.$refs.fullscreenchart.index =
        (this.$refs.fullscreenchart.index + 1) %
        (Object.keys(this.$refs.fullscreenchart.chartData[0]).length - 1);
    },
    resetAndGoBack(){
      this.$router.go(-1)
      this.$refs.form.reset();
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
          columns: JSON.stringify(this.selectedHeaders),
          // dataSet: this.activeReport.dataSet,
          // tag_ids: this.activeReport.tags.map((tag) => tag.id),
          colorSchemeId: this.activeReport.colorSchemeId,
          // last_updated_by: `${this.user.first_name} ${this.user.last_name}`,
        };

        if (this.activeReport.id) {
          data.id = this.activeReport.id;
          data.reportGroupId = this.activeReport.reportGroupId
          data.updatedBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
          this.updateReportById(data);

           // this.updateChannelById({
          //  id:  this.activeReport.channelId,
          //  reports: [this.activeReport]
          // });
        } else {
          console.log(data)
          data.createdBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
          // data.user_id = this.user.id;
           this.addReport(data);
        }
      }
    },
    async updateChartData() {
      await this.fetchDataSet(this.activeReport.dataSetId)
      let headers = Object.keys(this.dataSet.dataValues.items[0].data[0])

      headers.forEach((k, i) => {
        if (k == this.xAxisValue) {
          this.arrayMove(headers, i, 0)
        }
      })
      this.headers = headers
      let newHeaders = []
      if (this.activeReport.columns && this.activeReport.columns.length > 0) {
        newHeaders = this.activeReport.columns
      } else {
        newHeaders = headers.map((item) => ({
          text: item,
          value: item,
        }));
      }
      console.log(newHeaders)
      this.data = this.createMasterData(this.dataSet.dataValues.items)
      this.selectedHeaders = newHeaders
      this.data = this.filterData(this.selectedHeaders, this.data)
      this.updateColors(this.activeReport.colorSchemeId)
      this.SET_REPORT_DATASET(this.dataSet);
    },
    onChangeSelected() {
      this.selectedHeaders.forEach((s, i) => {
        if (typeof s == "string") {
          this.selectedHeaders[i] = ({ text: s, value: s, })
        }
      })
      this.xAxisKeys = this.selectedHeaders.map(h => h.text || h)
      /* if (this.dataSet && this.dataSet.dataValues && this.dataSet.dataValues.items && this.dataSet.dataValues.items.length > 0) { */
        this.data = this.filterData(this.selectedHeaders, this.createMasterData(this.dataSet.dataValues.items))
      /* } */
    },
    onChangeAxis() {
      this.xAxisKeys = this.selectedHeaders.map(h => h.text || h)     
      this.moveArrByKey(this.xAxisKeys, this.xAxisValue)
      this.selectedHeaders = this.xAxisKeys.map(x => ({
        text: x,
        value: x
      }))
      this.data = this.filterData(this.selectedHeaders, this.createMasterData(this.dataSet.dataValues.items))
    },
    moveArrByKey(keys, selected = "Date") {
      keys.forEach((k, i) => {
        if (k == selected) {
          this.arrayMove(keys, i, 0)
        }
      })
    },
    deleteReport() {
      this.removeReport({ id: this.activeReport.id });
      this.$router.push(`/channels/${this.$route.params.channelId}/reports`);
    },
    fullscreenReport() {
      console.log(this.$refs.fullscreenchart)
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
      "reportGroups",
      "user",
    ]),
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
    /* createdBy() {
      if (this.activeReport && this.activeReport.id && this.user && this.user.attributes) {
        return `${this.user.attributes.given_name} ${this.user.attributes.family_name} on ${new Date(this.activeReport.createdAt).toLocaleString()}`;
      } else {
        return `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
      }
    },
    updatedBy() {
      if (this.activeReport && this.activeReport.id) {
        return `${this.user.attributes.given_name}  ${this.user.attributes.family_name} on ${new Date(this.activeReport.updatedAt).toLocaleString()}`;
      } else {
        return `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
      }
    }, */
  },
  async beforeMount() {
    if(this.dataSets && this.dataSets.length < 1){
      await this.fetchDataSets();
    } 
    
  },
  mounted() {
    /* if (this.$route.name == "Report") {
      this.dataSetChoices = [...this.dataSets];
    } else { */
      this.dataSetChoices = [...this.dataSets.filter(d => d.channelId == this.currentChannels[0].channelId)]; // was ...this.channelDataSets
    /* } */
    
      if (this.$route.params.reportId == "add-report") {
        this.activeReport.id = ""
        this.dataSet.id = ""
      }  
  },
  watch: {
    activeReport() {
      if (this.$route.params.reportId != "add-report" && this.activeReport.id){ 
        this.colorScheme = this.colors.find((scheme) => scheme.id == this.activeReport.colorSchemeId).scheme
        if (this.activeReport.xAxis) {
        this.xAxisValue = this.activeReport.xAxis
      }
      if (this.activeReport.columns) {
        this.selectedHeaders = this.activeReport.columns
      }
        this.updateChartData();
        this.onChangeSelected()
      }
      if (!this.activeReport) {
        this.SET_REPORT(this.newReport)
        console.log("No Active Report")
      }
    },
    selectedHeaders() {
      if (this.selectedHeaders.length != 0) {
        this.onChangeSelected()
      }
    },
    dataSets() {
      //this.dataSetChoices = [...this.dataSets];
    },
    /* dataSet() {
      if (this.dataSet.xAxis) {
        this.xAxisValue = this.dataSet.xAxis
      }
    }, */
    data() {
      console.log(this.data)
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
