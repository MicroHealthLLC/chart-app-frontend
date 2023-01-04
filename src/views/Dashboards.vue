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
    
     <DashboardCard_test/>
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
  },
  computed: {
    ...mapGetters([
      "activeDataSet",
      "activeReport",
      "channels",
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
    channelReports(){
    if (this.reports && this.reports.length > 0 &&  this.currentChannels &&  this.currentChannels[0]){
      console.log(this.currentChannels[0])
          return this.reports.filter(t => t.channelId == this.currentChannels[0].channelId)
        } else return []
      },
  },
  async mounted() {
    this.fetchReports();
    this.fetchDataSets();
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
.modal {
  margin-top: ;
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