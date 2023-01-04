<template>
  <div>
    <div class="d-flex justify-space-between">
        <h3><v-icon class="mr-2 pb-2" color="cyan">mdi-monitor-dashboard</v-icon>Dashboards</h3>
        <v-btn class="mb-2" color="primary" small @click.prevent="toNewReport">Add Dashboard <v-icon
          small>mdi-plus</v-icon></v-btn>
      </div>  
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col cols="12" sm="5" v-for="(report, i) in channelReports" :key="i">
          <DashboardCard_test :report="report"/>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import DashboardCard_test from "../components/DashboardCard_test.vue";
import RadarChart from "../components/RadarChart";
import DoughnutChart from "../components/DoughnutChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import Table from "../components/Table";
import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";

export default {
  name: "Dashboards",
  components: {
      DashboardCard_test
  },
  /* props: {
    report: Object  
  }, */
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
    /*saveReport() {
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


    }, */
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
      "currentChannels",
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
      "reports"
    ]),
    channelReports() {
      if (this.reports && this.reports.length > 0 && this.currentChannels && this.currentChannels[0]) {
        console.log(this.currentChannels[0])

        return this.reports.filter(t => t.channelId == this.currentChannels[0].channelId)
      } else return []
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
    console.log(this.channelReports)
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