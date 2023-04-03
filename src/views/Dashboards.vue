<template>
  <div>
      <v-dialog v-model="showForm" width="30%" >
      <v-card class="px-4 py-4 modal">
        <DashboardForm @closeDashboardForm="closeDashboardForm" />
      </v-card> 
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
          <v-card @click.prevent="toDashboard(dashboard.id)" width="250px" min-width="250px" height="250px" tile elevation="4">
              <v-card-title class="pb-0">{{ dashboard.title }}</v-card-title>
              <v-card-text v-if="dashboard.createdBy">By: {{ dashboard.createdBy }}</v-card-text>
              <v-row justify="center">
                  <v-icon class="pt-4 dashboard-icon" x-large >mdi-monitor-dashboard</v-icon>
              </v-row>
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
import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";
import gaugeMixin from "../mixins/gauge-mixin";
import DashboardForm from "../components/DashboardForm.vue";

export default {
  name: "Dashboards",
  components: {
    DashboardForm,
},

  data() {
    return {
      formValid: true,
      showForm: false,
      //switch1: true, 
      submitAttempted: false,
      deleteDialog: false,
      fullscreen: false,
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
    closeDashboardForm() {
      this.showForm = false
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
    screenHeight() {
      return window.innerHeight - 200;
    },
    
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

.dashboard-icon {
  font-size: 120px !important;
  color: #00bcd4 !important;
}

</style>