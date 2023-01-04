<template>
  <v-row >

    <!-- <v-col cols="12" sm="6">           
      <v-card   class="pa-4 mb-4 card" >   
        <v-row  align="center">
          <v-col>        
         <span class="no-content-msg">This Channel has no dashboard content.</span> 
         </v-col>
        </v-row>       
         <v-row  align="center">
          <v-col>
            <v-btn color="primary" large  class="margin-auto d-block" @click="addDashboard" >
               <v-icon smalll class="mr-1">mdi-monitor-dashboard</v-icon>Add Content
            </v-btn>
          </v-col>                   
        </v-row>
      </v-card> 

    </v-col> -->

    <v-col cols="12" sm="5" v-for="(report, i) in channelReports" :key="i">     
      <v-card   class="pa-4 mb-4"  v-if="data.length > 0">         
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

    </v-col>

    <v-dialog v-model="showForm" width="30%" >
      <v-card class="px-4 py-4 modal">      
        <v-select
          v-model="hhh"       
          item-text="title"
          item-value="value"
          multiple        
          chips
          :items="channelReports"
          :disabled="!channelReports.length > 1"
          label="Select dashboard content"
          outlined
        ></v-select>
        <v-btn color="primary" large class="d-block margin-auto" >Add To Dashboard<v-icon
          small>mdi-plus</v-icon></v-btn>
      </v-card> 
      <!-- <span v-else>NO DATA</span> -->

    </v-dialog>
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
  name: "DashboardCard_test",
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
      report: {},
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
        this.activeReport.chartType == "donut" ||
        this.activeReport.chartType == "pie" ||
        this.activeReport.chartType == "polar-area"
      );
    },
    channelReports(){
    if (this.reports && this.reports.length > 0 &&  this.currentChannels &&  this.currentChannels[0]){
      console.log(this.currentChannels[0])
          return this.reports.filter(t => t.channelId == this.currentChannels[0].channelId)
        } else return []
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
 
  mounted() {
    // this.updateChartData();    
    this.fetchReports();
    this.fetchDataSets();
    
  },
  watch: {
   dataSets() {
      this.dataSetChoices = [...this.dataSets];
    },
    channelReports(){
      if (this.channelReports && this.channelReports.length > 0){
        let dataSetIds = this.channelReports.map(t => t.dataSetId)
        for (var i = 0; i < this.channelReports.length; i++) {
            this.fetchDataSet(dataSetIds[i])
         }  
         if (this.dataSet  && this.dataSet.dataValues && this.dataSet.dataValues.items)   {
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
         }    
      }
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
