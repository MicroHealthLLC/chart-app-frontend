<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex justify-space-between">
          <h3 v-if="(!isReadOnly && dashboard.id)">Update {{ dashboard.title }}</h3>
          <h3 v-else-if="dashboard.id">View {{ dashboard.title }}</h3>
          <h3 v-else>"Dashboard Title"</h3>
          <div>
            <v-btn v-if="!isReadOnly" @click="saveDashboard" class="px-5 mr-2 mb-2" color="primary" depressed
              small>Save</v-btn>
            <v-btn v-else @click="editForm" class="px-5 mr-2 mb-2" color="primary" depressed small>{{ !dashboard.cards ? 'Add' : 'Edit' }}</v-btn>
            <v-btn v-if="isReadOnly" class="mb-2" @click="resetAndGoBack" small outlined>Close</v-btn>
            <v-btn v-if="!isReadOnly" class="mb-2" @click="cancelForm" small outlined>Cancel</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="staged.length == 0">
        <h3>Drag and drop a chip from the right panel to add components</h3>
      </v-col>
    </v-row>
    <v-row>
      <!-- DASHBOARD CARDS -->
      <v-col :cols="isReadOnly ? 12 : 10">
        <draggable :list="staged" group="universalGroup" :disabled="isReadOnly" class="drag-area row">
          <v-col :cols="dashboardCols(staged, index)" v-for="(item, index) in staged" :key="index" ><!--  :height="dashboardCardHeight(staged)" -->
            <v-card :ref="`card${index}`">
              <DashboardCardHeatMap :heatMap="item" v-if="checkChartType(item) == 'heatMap'"/>
              <DashboardCardGauge :gauge="item" v-if="checkChartType(item) == 'gauge'" :staged="staged" />
              <DashboardCard_test :report="item" v-if="checkChartType(item) == 'report'" />
            </v-card>
          </v-col>
        </draggable>
      </v-col>

      <!-- DASHBOARD SELECT AREA -->
      <v-col cols="2" v-if="!isReadOnly">
        <v-card height="max-content">
          <h4 class="pt-4 pl-2">Available Modules</h4>
          <v-list>
            <v-subheader>Reports</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <draggable :list="channelReports" :group="{ name: 'universalGroup', pull: 'clone', put: false }" class="d-flex flex-wrap">
                    <v-chip v-for="(item, index) in channelReports" :key="index" class="mr-2 mt-2" color="orange lighten-1" text-color="grey lighten-4">{{ item.title
                    }}</v-chip>
                  </draggable>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider class="mx-4"></v-divider>
          <v-list>
            <v-subheader>Gauges</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <draggable :list="channelGauges" :group="{ name: 'universalGroup', pull: 'clone', put: false }" class="d-flex flex-wrap">
                    <v-chip v-for="(item, index) in channelGauges" :key="index" class="mr-2 mt-2" color="red lighten-1" text-color="grey lighten-4">{{ item.title
                    }}</v-chip>
                  </draggable>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider class="mx-4"></v-divider>
          <v-list>
            <v-subheader>Heat Maps</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <draggable :list="channelHeatMaps" :group="{ name: 'universalGroup', pull: 'clone', put: false }" class="d-flex flex-wrap">
                    <v-chip v-for="(item, index) in channelHeatMaps" :key="index" class="mr-2 mt-2" color="green 
                    lighten-1" text-color="grey lighten-4">{{ item.title }}</v-chip>
                  </draggable>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import draggable from "vuedraggable"

import DashboardCardHeatMap from "../components/DashboardCardHeatMap.vue"
import DashboardCardGauge from '../components/DashboardCardGauge.vue';
import DashboardCard_test from "../components/DashboardCard_test.vue"

import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";
import gaugeMixin from "../mixins/gauge-mixin";

export default {
  name: "Dashboard",
  components: {
    draggable,
    DashboardCardHeatMap,
    DashboardCardGauge,
    DashboardCard_test
  },
  data() {
    return {
      isReadOnly: true,
      staged: [],
      draggedItem: null
    }
  },
  mixins: [datasetMixin, reportMixin, gaugeMixin],
  methods: {
    ...mapActions([
      "fetchReports",
      "fetchDataSets",
      "fetchGauges",
      "fetchHeatMaps",
      "fetchDashboards",
      "fetchDashboard",
      "updateDashboardById"
    ]),
    saveDashboard() {
      this.isReadOnly = true
      console.log(this.dashboard)
      console.log(this.staged)
      let data = {
        id: this.dashboard.id,
        cards: JSON.stringify(this.staged)
      }
      this.updateDashboardById(data)
    },
    cancelForm() {
      this.isReadOnly = true
    },
    resetAndGoBack() {
      this.$router.go(-1)
    },
    editForm() {
      this.isReadOnly = false
    },
    removeAt(idx) {
      this.staged.splice(idx, 1);
    },
    dashboardCardHeight(staged) {
      if (staged && staged.length > 0) {
        return staged.length > 4 ? '25vh' :
          staged.length > 2 ? '40vh' : '80vh'
      }
    },
    dashboardCols(staged, index) {
      if (staged && staged.length > 0) {
        if(staged.length == 2) {
          return 12
        }
        else if (staged.length % 2 == 0) {
          return 6
        }
        else {
          return index == 0 ? 12 : 6
        }
      }
    },
    checkChartType(item) {
      let objs = Object.keys(item)
      if (objs.includes('reportGroup')) {
        return "report"
      } else if (objs.includes('segmentStops')) {
        return "gauge"
      } else return "heatMap"
    }
  },
  computed: {
    ...mapGetters(["dashboard", "dashboards", "reports", "dataSets", "heatMaps", "currentChannels"]),
    channelReports() {
      if (this.reports && this.reports.length > 0 && this.currentChannels && this.currentChannels[0]) {
        let reports = this.reports.filter(t => t.channelId == this.currentChannels[0].channelId)
        if (this.switch1) {
          reports.filter(r => r.createdBy == `${this.user.given_name} ${this.user.family_name}`)
        }
        return reports
      } else return []
    },
  },
  async mounted() {
    this.fetchReports()
    this.fetchDataSets()
    this.fetchGauges()
    this.fetchHeatMaps()
    if (this.$route.params.dashboardId) {
      await this.fetchDashboard(this.$route.params.dashboardId)
      this.staged = this.dashboard.cards ? this.dashboard.cards : []
    }
    if (this.staged.length == 0) {
      this.isReadOnly = false
    }
    console.log(this.$refs.card0)
  },
  afterMount() {
    console.log(this.$refs.card0)
  },
  watch: {
    staged() {
      console.log(this.staged)
    }
  }
};
</script>

<style scoped>
.drag-area{
  height: 80vh !important;
}
</style>
