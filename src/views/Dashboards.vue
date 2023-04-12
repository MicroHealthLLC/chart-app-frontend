<template>
  <div>
    <v-dialog
      v-model="showForm"
      width="30%"
    >
      <v-card class="pa-4 modal">
        <DashboardForm @closeDashboardForm="closeDashboardForm" />
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showSlideShowForm"
      width="50%"
    >
      <v-card class="pa-4">
        <SlideShows @toggleSlideShow="toggleSlideShow" />
      </v-card>
    </v-dialog>

    <div class="d-flex justify-space-between">
      <h3>
        <v-icon
          class="mr-2 pb-2"
          color="cyan"
        >
          mdi-monitor-dashboard
        </v-icon>Dashboards
      </h3>
      <v-btn
        class="mb-2"
        color="success"
        small
        @click="toggleSlideShow"
      >
        Create Slide Show
      </v-btn>
      
      <!-- <v-switch v-model="switch1" label="Show My Dashboard"></v-switch> -->
      <v-btn
        class="mb-2"
        color="primary"
        small
        @click="showAddDashboardForm"
      >
        Add Dashboard <v-icon small>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <v-divider class="mb-4" />

    <v-container
      v-if="channelDashboards.length > 0"
      class="pl-5"
    >
      <v-row>
        <v-col
          v-for="dashboard in channelDashboards"
          :key="dashboard.id"
          xl="2"
          lg="3"
          md="4"
          sm="6"
        >
          <v-card
            width="250px"
            min-width="250px"
            height="250px"
            tile
            elevation="4"
            @click.prevent="toDashboard(dashboard.id)"
          >
            <v-card-title class="pb-0">
              {{ dashboard.title }}
            </v-card-title>
            <v-card-text
              v-if="dashboard.createdBy"
            >
              By: {{ dashboard.createdBy }}
            </v-card-text>
            <v-row justify="center">
              <v-icon
                class="pt-4 dashboard-icon"
                x-large
              >
                mdi-monitor-dashboard
              </v-icon>
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
    <div
      v-if="channelDashboards.length == 0"
      class="placeholder d-flex flex-column justify-center align-center"
    >
      <p class="font-weight-light">
        No Dashboards on this Channel yet...
      </p>
      <v-btn
        text
        small
        class="mb-4"
        color="primary"
        @click="showAddDashboardForm"
      >
        Add a Dashboard
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";
import gaugeMixin from "../mixins/gauge-mixin";
import DashboardForm from "../components/DashboardForm.vue";
import SlideShows from "./SlideShows.vue";

export default {
  name: "Dashboards",
  components: {
    DashboardForm,
    SlideShows
  },
  mixins: [datasetMixin, reportMixin, gaugeMixin],

  data() {
    return {
      formValid: true,
      showForm: false,
      //switch1: true,
      submitAttempted: false,
      deleteDialog: false,
      fullscreen: false,
      showSlideShowForm: false,
      colorScheme: [],
      dataSetChoices: [],
      data: [],
    };
  },
  methods: {
    ...mapActions([
      "fetchReports",
      "fetchDataSets",
      "fetchGauges",
      "fetchHeatMaps",
      "fetchDashboards",
      "fetchDashboard",
    ]),
    ...mapMutations([]),
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    showAddDashboardForm() {
      this.showForm = true;
    },
    closeDashboardForm() {
      this.showForm = false;
    },
    log(e) {
      console.log(e);
    },
    resetAndGoBack() {
      this.$router.go(-1);
      this.$refs.form.reset();
    },
    toDashboard(dashboardId) {
      this.fetchDashboard(dashboardId);
      this.$router.push(`dashboards/${dashboardId}`);
    },
    toggleSlideShow() {
      //this.$router.push(`dashboards/slideshows`);
      this.showSlideShowForm = this.showSlideShowForm ? false : true;
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
      "dashboard",
    ]),
    screenHeight() {
      return window.innerHeight - 200;
    },
    channelDashboards() {
      if (
        this.dashboards &&
        this.dashboards.length > 0 &&
        this.currentChannels &&
        this.currentChannels[0].channelId
      ) {
        return this.dashboards.filter(
          (t) => t.channelId == this.currentChannels[0].channelId
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else return [];
    },
  },
  watch: {},
  
  async beforeMount() {
    await this.fetchDashboards();
    if (this.dataSets && this.dataSets.length < 1) {
      await this.fetchDataSets();
    }
    if (this.activeReport && this.activeReport.id) {
      // await this.fetchReport(this.$route.params.reportId);
      this.updateChartData();
    }
    this.fetchGauges();
    this.fetchHeatMaps();
  },
  async mounted() {
    if (this.$route.name == "Report") {
      this.dataSetChoices = [...this.dataSets];
    } else {
      this.dataSetChoices = [...this.dataSets]; // was ...this.channelDataSets
    }
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
