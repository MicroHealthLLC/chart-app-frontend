<template>
  <div>
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

    

    <div class="d-flex justify-space-between">
        <h3><v-icon class="mr-2 pb-2" color="cyan">mdi-monitor-dashboard</v-icon>Dashboard</h3>
        <v-btn class="mb-2" color="primary" small @click="addDashboard">Add to Dashboard <v-icon
          small>mdi-plus</v-icon></v-btn>
      </div>  
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col cols="12" sm="5" v-for="(report, i) in channelReports" :key="i">
          <DashboardCard_test :report="report" />
        </v-col>
      </v-row>
      </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import DashboardCard_test from "../components/DashboardCard_test.vue";
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
      hhh: [], //replace once backend value is added
      showForm: false, 
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
    log(e){
    console.log(e)
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
    /* removeReport() {
      this.deleteReport(this.activeReport.id);
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
    }, */
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
      "reports",
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
    screenHeight() {
      return window.innerHeight - 200;
    },
    /* graphType() {
      if (this.activeReport.chartType === "line") {
        return this.LineChart;
      } else if (this.activeReport.chartType === "bar") {
        return this.BarChart;
      } else if (this.activeReport.chartType === "radar") {
        return this.RadarChart;
      } else if (this.activeReport.chartType === "donut") {
        return this.DoughnutChart;
      } else if (this.activeReport.chartType === "pie") {
        return this.PieChart;
      } else if (this.activeReport.chartType === "polar-area") {
        return this.PolarAreaChart;
      } else if (this.activeReport.chartType === "table") {
        return this.Table;
      } else {
        return this.LineChart;
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
    }, */
    
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
  
  },
};
</script>

<style scoped>
.margin-auto {
 margin: auto !important;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
/* .modal {
  margin-top: ;
} */
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