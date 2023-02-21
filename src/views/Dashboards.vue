<template>
  <div>
      <v-dialog v-model="showForm" width="30%" >
      <v-card class="px-4 py-4 modal">
        <DashboardForm />
        <!-- <v-text-field outlined label="Enter title" v-model="dashboard.title">
          
        </v-text-field>
        <v-select
          v-model="dashboard.reports"       
          item-text="title"
          item-value="value"
          multiple        
          chips
          :items="channelReports"
          :disabled="!channelReports.length > 1"
          label="Select Reports"
          outlined
        ></v-select>
        <v-select
          v-model="dashboard.gauges"       
          item-text="title"
          item-value="value"
          multiple        
          chips
          :items="channelGauges"
          :disabled="!channelGauges.length > 1"
          label="Select Gauges"
          outlined
        ></v-select>
        <v-select
          v-model="dashboard.heatMaps"       
          item-text="title"
          item-value="value"
          multiple        
          chips
          :items="channelHeatMaps"
          :disabled="!channelHeatMaps.length > 1"
          label="Select Heat Maps"
          outlined
        ></v-select>
        <v-btn color="primary" large class="d-block margin-auto" >Add New Dashboard<v-icon
          small>mdi-plus</v-icon></v-btn> -->
      </v-card> 
      <!-- <span v-else>NO DATA</span> -->

    </v-dialog>

    

    <div class="d-flex justify-space-between">
      <h3><v-icon class="mr-2 pb-2" color="cyan">mdi-monitor-dashboard</v-icon>Dashboards</h3>
      <!-- <v-switch v-model="switch1" label="Show My Dashboard"></v-switch> -->
      <v-btn class="mb-2" color="primary" small @click="showAddDashboardForm">Add Dashboard <v-icon
          small>mdi-plus</v-icon></v-btn>
    </div>
    <v-divider class="mb-4"></v-divider>

    <v-container v-if="dashboards.length > 0" class="pl-5">
        <v-row>
        <v-col xl="2" lg="3" md="4" sm="6" v-for="(dashboard) in dashboards" :key="dashboard.id">
          <v-card width="250px" min-width="250px" @click.prevent="toDashboard(dashboard.id)" tile elevation="4">
            <v-card-title>{{ dashboard.title }}</v-card-title>
            <v-card-subtitle>By: {{ dashboard.createdBy }}</v-card-subtitle>
          </v-card>
        </v-col>
        <!-- <div class="d-flex justify-end btn-container">
          <v-btn
            v-if="reports.length >= 6"
            to="/public-reports"
            class="d-flex-end"
            color="primary"
            text
            >View All</v-btn
          >
        </div> -->
        </v-row>
       </v-container>
    <!-- <v-row v-if="switch1">
      <v-col cols="12" sm="5"
        v-for="(report, i) in channelReports.filter(r => r.createdBy == `${user.attributes.given_name} ${user.attributes.family_name}`)"
        :key="i" @click.prevent="toReport(report.id)">
        <DashboardCard_test :report="report" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" sm="5" v-for="(report, i) in channelReports" :key="i" @click.prevent="toReport(report.id)">
        <DashboardCard_test :report="report" />
      </v-col>
    </v-row>
    <v-divider class="mb-4"></v-divider>
    
    <v-row class="mb-2" v-if="switch1">
      <v-col xl="2" lg="3" md="4" sm="6"
        v-for="(gauge) in channelGauges.filter(r => r.createdBy == `${user.attributes.given_name} ${user.attributes.family_name}`)"
        :key="gauge.id">
        <v-card width="250px" min-width="250px" @click.prevent="toGauge(gauge.id)" tile elevation="4">
          <KPIGauge :gauge="gauge" :height="130" :width="200"
            :segmentStops="gauge.segmentStops.split(',').map(x => parseFloat(x))" :needleHeightRatio=".7" />
          <v-divider class="my-2"></v-divider>
          <v-card-title>{{ gauge.title }}</v-card-title>
          <v-card-subtitle>By: {{ gauge.createdBy }}</v-card-subtitle>
        </v-card>
      </v-col> -->
      <!-- <div class="d-flex justify-end btn-container">
              <v-btn
                v-if="reports.length >= 6"
                to="/public-reports"
                class="d-flex-end"
                color="primary"
                text
                >View All</v-btn
              >
            </div> -->
    <!-- </v-row>
    <v-row class="mb-2" v-else>
      <v-col xl="2" lg="3" md="4" sm="6" v-for="(gauge) in channelGauges" :key="gauge.id">
        <v-card width="250px" min-width="250px" @click.prevent="toGauge(gauge.id)" tile elevation="4">
          <KPIGauge :gauge="gauge" :height="130" :width="200"
            :segmentStops="gauge.segmentStops.split(',').map(x => parseFloat(x))" :needleHeightRatio=".7" />
          <v-divider class="my-2"></v-divider>
          <v-card-title>{{ gauge.title }}</v-card-title>
          <v-card-subtitle>By: {{ gauge.createdBy }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mb-4"></v-divider>
    
    <v-row class="mt-2">
      <v-col v-for="(heatMap) in channelHeatMaps" :key="heatMap.id" xl="2" lg="3" md="4" sm="6" xs="12">
        <v-card tile elevation="4">
          <v-row justify="center" class="mb-3">
            <v-col>
              <DashboardCardHeatMap :heatMap="heatMap" />
            </v-col>
          </v-row>
          <v-divider class="mb-2"></v-divider>
          <div @click.prevent="toHeatMap(heatMap.id)">
            <v-card-title>{{ heatMap.title }}</v-card-title>
            <v-card-text v-if="heatMap.createdBy">By: {{ heatMap.createdBy }}</v-card-text>
            <v-card-text class="pt-0" v-if="heatMap.dataSet">Dataset: {{ heatMap.dataSet.title }}</v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row> -->
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
//import DashboardCard_test from "../components/DashboardCard_test.vue";
//import KPIGauge from "../components/KPIGauge.vue";
//import KPIHeatMap from "../components/KPIHeatMap.vue";
import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";
import gaugeMixin from "../mixins/gauge-mixin";
import DashboardForm from "../components/DashboardForm.vue";
//import DashboardCardHeatMap from "../components/DashboardCardHeatMap.vue";

export default {
  name: "Dashboards",
  components: {
    DashboardForm,
    //DashboardCard_test,
    //KPIGauge,
    //KPIHeatMap,
    //DashboardCardHeatMap
},
  /* props: {
    report: Object  
  }, */
  data() {
    return {
      formValid: true,
      showForm: false,
      //switch1: true, 
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
    };
  },
  mixins: [datasetMixin, reportMixin, gaugeMixin],
  methods: {
    ...mapActions([
      "fetchReports",
      "fetchDataSets",
      "fetchGauges",
      "fetchHeatMaps",
      "fetchDashboards",
      "fetchDashboard"
    ]),
    ...mapMutations([]),
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    showAddDashboardForm(){
      this.showForm = true
    },
    log(e){
    console.log(e)
    }, 
    resetAndGoBack(){
      this.$router.go(-1)
      this.$refs.form.reset();
    },
    toDashboard(dashboardId) {
      this.fetchDashboard(dashboardId)
      this.$router.push(
        `dashboards/${dashboardId}`
      );
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
      "user",
      "reports",
      "dashboards",
      "dashboard"
    ]),
    /* channelReports() {
      if (this.reports && this.reports.length > 0 && this.currentChannels && this.currentChannels[0]) {
        let reports = this.reports.filter(t => t.channelId == this.currentChannels[0].channelId)
        if (this.switch1) {
          reports.filter(r => r.createdBy == `${this.user.given_name} ${this.user.family_name}`)
        }
        return reports
      } else return []
    }, */
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
    await this.fetchDashboards()
    if(this.dataSets && this.dataSets.length < 1){
      await this.fetchDataSets();
    } 
    if (this.activeReport && this.activeReport.id) {
      // await this.fetchReport(this.$route.params.reportId);
      this.updateChartData();
    }
    this.fetchGauges()
    this.fetchHeatMaps()
  },
  async mounted() {
    // this.colorScheme = this.colors.find(
    //   (scheme) => scheme.id == this.activeReport.colorSchemeId
    // ).scheme;
    /* if (this.activeReport && this.activeReport.id) {
      // await this.fetchReport(this.$route.params.reportId);
      this.updateChartData();
    } */
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
.mdi-table-large {
  background: linear-gradient(to right, #EF5350, #EF5350 38.4%, #FFCA28 38.4%, #FFCA28 63.5%, #66BB6A 63.5%);
  background-clip: text;
  color: rgba(0, 0, 0, 0.2) !important;
  font-size: 80px !important;
}
</style>