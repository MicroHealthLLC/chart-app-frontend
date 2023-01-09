<template>
  <!-- <v-row > -->
    <!-- <v-col cols="12" sm="5" v-for="(report, i) in channelReports" :key="i"> --> 
      <span>    
      <v-card class="pa-4 mb-4" v-if="data && data.length > 0">         
        <v-btn @click="fullscreenReport" class="chart-menu" icon >
          <v-icon>mdi-fullscreen</v-icon>    
        </v-btn>
         <Component               
          ref="chart"
          :is="graphType(report)"
          :chartData="data"
          :chartColors="colors.find((scheme) => scheme.id == report.colorSchemeId).scheme"
          :graphType="report.chartType"
          :height="350"
          :title="report.title"
          class="mb-4"
        >
        </Component> 
        <div class="d-flex justify-end mb-4">
          <v-btn
            v-if="circleChart"
            @click="changeChartData"
            outlined
            small
            >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
          >         
        </div>
        
      </v-card>
       <v-dialog v-model="fullscreen" fullscreen eager>
            <v-card>
              <v-toolbar class="px-5" color="info" dark>
                <h3>{{ report.title }}</h3>
                <v-spacer></v-spacer>
                <v-btn @click="fullscreen = false" icon
                  ><v-icon>mdi-close-thick</v-icon></v-btn
                >
              </v-toolbar>
              <Component
                v-if="fullscreen"
                ref="fullscreenchart"
                :is="graphType(report)"
                :chartData="data"
                :chartColors="colors.find((scheme) => scheme.id == report.colorSchemeId).scheme"
                :graphType="report.chartType"
                :height="screenHeight"
                :title="report.title"
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

export default {
  name: "DashboardCard_test",
  props: {
    report: Object  
  },
  data() {
    return {
      formValid: true,
      showForm: false, 
      hhh: [],
      submitAttempted: false,
      deleteDialog: false,
      fullscreen: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
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
      data: []
    };
  },
  mixins: [datasetMixin, reportMixin],
  computed: {
    ...mapGetters([
      "activeDataSet",
      "activeReport",
      "channels",
      "currentChannel",
      "currentChannels",
    //   "channelReports",
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
    /* channelReports(){
    if (this.reports && this.reports.length > 0 &&  this.currentChannels &&  this.currentChannels[0]){
      console.log(this.currentChannels[0])
          return this.reports.filter(t => t.channelId == this.currentChannels[0].channelId)
        } else return []
      }, */
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
      "updateChannelById"
    ]),
    ...mapMutations(["SET_REPORT_DATASET", "SET_STATUS_CODE", "SET_REPORT"]),
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    addDashboard(){
      this.showForm = true
    },
    // log(e){
    // console.log(e)
    // }, 
    changeFSChartData() {
      this.$refs.fullscreenchart.index =
        (this.$refs.fullscreenchart.index + 1) %
        (Object.keys(this.$refs.fullscreenchart.chartData[0]).length - 1);
    },
    resetAndGoBack(){
      this.$router.go(-1)
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
      /* if (this.channelReports && this.channelReports.length) {
        console.log(this.dataSet)
        let dataSetIds = this.channelReports.map(t => t.dataSetId)
        console.log(dataSetIds)
        
        for (var i = 0; i < this.channelReports.length; i++) { */
      await this.fetchDataSet(this.report.dataSetId)
      let ds = this.dataSet
      //console.log(this.report)
      let headers = Object.keys(ds.dataValues.items[0].data[0])
      headers.forEach((k, j) => {
        if (k == this.report.xAxis) {
          /* console.log(k)
          console.log("true", this.report.xAxis) */
          this.arrayMove(headers, j, 0)
        }
      })
      let newHeaders = []
      //console.log(this.report)
      if (this.report.columns && this.report.columns.length > 0) {

        newHeaders = JSON.parse(this.report.columns)
      } else {
        newHeaders = headers.map((item) => ({
          text: item,
          value: item,
        }));
      }
      /* newHeaders = headers.map((item) => ({
        text: item,
        value: item,
      })); */
      //console.log(newHeaders)
      this.data = this.createMasterData(ds.dataValues.items)
      this.data = this.filterData(newHeaders, this.data)
      this.SET_REPORT_DATASET(ds);
      //}

      //}
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
  // computed: {
  //   ...mapGetters([
  //     "activeDataSet",
  //     "activeReport",
  //     "channels",
  //     "currentChannel",
  //     "currentChannels",
  //   //   "channelReports",
  //     "currentChannel",
  //     "colors",
  //     "reports",
  //     "channelDataSets",
  //     "dataSets",
  //     "dataSet",
  //     "reportLoaded",
  //     "tags",
  //     "statusCode",
  //     "user",
  //   ]),
  //  circleChart() {
  //     return (
  //       this.activeReport.chartType == "donut" ||
  //       this.activeReport.chartType == "pie" ||
  //       this.activeReport.chartType == "polar-area"
  //     );
  //   },
  //   /* channelReports(){
  //   if (this.reports && this.reports.length > 0 &&  this.currentChannels &&  this.currentChannels[0]){
  //     console.log(this.currentChannels[0])
  //         return this.reports.filter(t => t.channelId == this.currentChannels[0].channelId)
  //       } else return []
  //     }, */
  //   newChannelReport() {
  //     return this.$route.params.reportId == "new";
  //   },
  //   screenHeight() {
  //     return window.innerHeight - 200;
  //   },
  //   /* createdBy() {
  //     if (this.activeReport && this.activeReport.id && this.user && this.user.attributes) {
  //       return `${this.user.attributes.given_name} ${this.user.attributes.family_name} on ${new Date(this.activeReport.createdAt).toLocaleString()}`;
  //     } else {
  //       return `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
  //     }
  //   },
  //   updatedBy() {
  //     if (this.activeReport && this.activeReport.id) {
  //       return `${this.user.attributes.given_name}  ${this.user.attributes.family_name} on ${new Date(this.activeReport.updatedAt).toLocaleString()}`;
  //     } else {
  //       return `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
  //     }
  //   }, */
  // },
  mounted() {
    // this.updateChartData();    
    this.fetchReports();
    this.fetchDataSets();
    this.updateChartData(); 
    console.log(this.report)   
  },
  watch: {
   dataSets() {
      this.dataSetChoices = [...this.dataSets];
    },    
    data(){
      if(this.data.length > 0){
        return this.data 
      }    
    }, 
  },
};
</script>

<style scoped>
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 350px;
  min-height: 180px;
  }
.no-content-msg{
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
}
</style>
