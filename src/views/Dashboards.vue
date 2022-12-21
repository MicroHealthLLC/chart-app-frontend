<template>
  <v-row :load="log(activeReport)">
    <v-col  class="col-11">     
      <div class="d-flex justify-space-between">
            <h3><v-icon class="mr-2 pb-2" color="cyan">mdi-monitor-dashboard</v-icon>Dashboards</h3>
            <v-btn class="mb-2" color="primary" small @click.prevent="toNewReport">Add Dashboard <v-icon
              small>mdi-plus</v-icon></v-btn>
          </div>  
          <v-divider class="mb-4"></v-divider>
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
      <v-dialog v-model="fullscreen" fullscreen eager>
        <v-card>
         
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
  name: "Dashboards",
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
      data: []
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
      "deleteReport",
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
          description: this.activeReport.description,
          channelId: this.currentChannel.id,
          chartType: this.activeReport.chartType,
          dataSetId: this.activeReport.dataSetId,
          // dataSet: this.activeReport.dataSet,
          // tag_ids: this.activeReport.tags.map((tag) => tag.id),
          colorSchemeId: this.activeReport.colorSchemeId,
          // last_updated_by: `${this.user.first_name} ${this.user.last_name}`,
        };

        if (this.activeReport.id) {
          data.id = this.activeReport.id;
          this.updateReportById(data);

           // this.updateChannelById({
          //  id:  this.activeReport.channelId,
          //  reports: [this.activeReport]
          // });
        } else {
          console.log(data)
          // data.user_id = this.user.id;
           this.addReport(data);
        }
      }
    },
    async updateChartData() {
      try {
        await this.fetchDataSet(this.activeReport.dataSetId)
        let headers = Object.keys(this.dataSet.dataValues.items[0].data[0])
        headers.forEach((k, i) => {
          if (k == this.dataSet.xAxis) {
            this.arrayMove(headers, i, 0)
          }
        })
        let newHeaders = headers.map((item) => ({
          text: item,
          value: item,
        }));
        this.data = this.createMasterData(this.dataSet.dataValues.items)
        this.data = this.filterData(newHeaders, this.data)
        this.SET_REPORT_DATASET(this.dataSet);
      } catch (err) {
        console.log(err)
      }


    },
    removeReport() {
      this.deleteReport(this.activeReport.id);
      this.$router.push(`/channels/${this.$route.params.channelId}/reports`);
    },
    fullscreenReport() {
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
      "currentChannel",
      "colors",
      "channelDataSets",
      "dataSets",
      "dataSet",
      "reportLoaded",
      "tags",
      "statusCode",
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
    createdBy() {
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
    },
  },
  async beforeMount() {
    if(this.dataSets && this.dataSets.length < 1){
      await this.fetchDataSets();
    } 
    
  },
  async mounted() {
    // this.colorScheme = this.colors.find(
    //   (scheme) => scheme.id == this.activeReport.colorSchemeId
    // ).scheme;
    if (this.activeReport && this.activeReport.id) {
      // await this.fetchReport(this.$route.params.reportId);
      this.updateChartData();
    }
    if (this.$route.name == "Report") {
      this.dataSetChoices = [...this.dataSets];
    } else {
      this.dataSetChoices = [...this.dataSets]; // was ...this.channelDataSets
    }
  },
  watch: {
    activeReport() {
      // this.colorScheme = this.colors.find((scheme) => scheme.id == this.activeReport.colorSchemeId).scheme;
      //console.log(this.activeReport.colorSchemeId)
      console.log(this.$route) 

        console.log(this.newReport)
        if(!this.activeReport){
         this.SET_REPORT(this.newReport)
          console.log("No Active Report")
        }
    },
    dataSets() {
      this.dataSetChoices = [...this.dataSets];
    },
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