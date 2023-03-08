<template>
  <v-row>
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3>Create Slide Show</h3>
        <div>
          <!-- <v-btn class="px-5 mr-2 mb-2" @click="saveDashboard" color="primary" depressed small>Save</v-btn> -->
          <v-btn class="mb-2" small outlined @click="closeSlideShowForm">Close</v-btn>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- <v-alert v-if="!formValid && submitAttempted" class="mt-2 mb-0" type="error" dense dismissible>Please fix
        highlighted fields below before submitting
        Dashboard</v-alert> -->
    </v-col>

    <v-col cols="12">

      <fullscreen v-model="fullscreen">
        <v-carousel v-if="fullscreen" v-model="model" height="99vh">
          <v-carousel-item v-for="(dashboard, i) in selectedDashboards" :key="i">
            <v-row :style="{ background: dashboard.background, height: 'max-content' }">
              <v-col cols="12"><v-card width="max-content" class="px-2 mx-auto mt-4">
                  <h2>{{ dashboard.title }}</h2>
                  <h4>By: {{ dashboard.createdBy }}</h4>
                </v-card></v-col>

              <v-col :cols="dashboardCols(JSON.parse(dashboard.cards), index)"
                v-for="(item, index) in JSON.parse(dashboard.cards)" :key="index">
                <v-card :ref="`card${index}`" class="pa-4 ma-2">
                  <DashboardCardHeatMap :heatMap="item" v-if="checkChartType(item) == 'heatMap'"
                    :isReadOnly="isReadOnly" />
                  <DashboardCardGauge :gauge="item" v-if="checkChartType(item) == 'gauge'"
                    :staged="JSON.parse(dashboard.cards)" :isReadOnly="isReadOnly" />
                  <DashboardCardReport :report="item" v-if="checkChartType(item) == 'report'" :isReadOnly="isReadOnly" />
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </fullscreen>
      <v-row justify="center">
        <v-col cols="10">
          <v-select v-model="selectedDashboards" :items="filteredDashboards" item-value="id" item-text="title" label="Select" solo
            multiple chips return-object hint="Select the Dashboards for the Presentation" persistent-hint></v-select>
          <v-checkbox v-model="crossChanDB" label="See All Channels Dashboards"></v-checkbox>
          <v-btn @click="fullscreen = true">Show Slide Show</v-btn>
        </v-col>
      </v-row>


    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dashboardMixin from '../mixins/dashboard-mixin';
import DashboardCardHeatMap from '../components/DashboardCardHeatMap.vue';
import DashboardCardGauge from '../components/DashboardCardGauge.vue';
import DashboardCardReport from '../components/DashboardCardReport.vue';

export default {
  name: "SlideShows",
  components: {
    DashboardCardGauge,
    DashboardCardHeatMap,
    DashboardCardReport
  },
  props: {
    /* dashboards: Array, */
  },
  mixins: [dashboardMixin],
  data() {
    return {
      fullscreen: false,
      selectedDashboards: [],
      crossChanDB: false,
      model: 0,
      isReadOnly: true,
    }
  },
  computed: {
    ...mapGetters([
      "dashboards",
      "currentChannels",
    ]),
    filteredDashboards() {
      if (this.dashboards) {
        return this.crossChanDB ? this.dashboards : this.dashboards.filter((t) => t.channelId == this.currentChannels[0].channelId) 
      } else {
        return []
      }
      
    },
    
  },
  methods: {
    ...mapActions(["fetchDashboards"]),
    closeSlideShowForm() {
      this.$emit("toggleSlideShow")
    },
    fullscreenSS() {
      this.fullscreen = true;
      this.closeSlideShowForm()
    },
  },
  /* async mounted() {
    await this.fetchDashboards()
    console.log(this.dashboards)
  }, */
  watch: {
    selectedDashboards() {
      console.log(this.selectedDashboards)
    }
  }
}
</script>

<style>
.v-responsive {
  overflow-y: auto;
  overflow-x: hidden;

}
</style>