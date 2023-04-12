<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex justify-space-between">
          <h3
            v-if="!isReadOnly && dashboard.id"
            class="d-flex align-center"
          >
            Update
            <v-text-field
              v-model="dashboard.title"
              class="ml-2"
            >
              {{
                dashboard.title
              }}
            </v-text-field>
          </h3>
          <h3 v-else-if="dashboard.id">
            View {{ dashboard.title }}
          </h3>
          <h3 v-else>
            "Dashboard Title"
          </h3>
          <div>
            <v-btn
              v-if="isReadOnly && staged.length > 0"
              class="px-3 mr-2 mb-2"
              color="green white--text"
              depressed
              small
              @click="fullscreenDashboard"
            >
              View Presentation<v-icon
                class="ml-2"
              >
                mdi-presentation
              </v-icon>
            </v-btn>
            <v-btn
              v-if="!isReadOnly"
              class="px-5 mr-2 mb-2"
              color="primary"
              depressed
              small
              @click="saveDashboard"
            >
              Save
            </v-btn>
            <v-btn
              v-else
              class="px-5 mr-2 mb-2"
              color="primary"
              depressed
              small
              @click="editForm"
            >
              {{
                !dashboard.cards && staged.length == 0 ? "Add" : "Edit"
              }}
            </v-btn>
            <v-btn
              v-if="isReadOnly"
              class="mb-2"
              small
              outlined
              @click="resetAndGoBack"
            >
              Close
            </v-btn>
            <v-btn
              v-if="!isReadOnly"
              class="mb-2"
              small
              outlined
              @click="cancelForm"
            >
              Cancel
            </v-btn>
          </div>
        </div>
        <v-divider />
      </v-col>
    </v-row>
    
    <fullscreen
      v-model="fullscreen"
      :class="fullscreen ? 'fullscreen-window pa-5' : 'pa-5'"
    >
      <v-row>
        <!-- DASHBOARD SELECT AREA -->
        <v-col
          v-if="!isReadOnly"
          cols="12"
        >
          <v-card height="max-content">
            <h4 class="pt-4 pl-2">
              Available Modules
            </h4>
            <v-row>
              <v-col cols="4">
                <v-list dense>
                  <v-subheader>Reports</v-subheader>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <draggable
                          :list="channelReports"
                          :group="{
                            name: 'universalGroup',
                            pull: 'clone',
                            put: false,
                          }"
                          class="d-flex flex-wrap"
                        >
                          <v-chip
                            v-for="(item, index) in channelReports"
                            :key="index"
                            class="mr-2 mt-2"
                            color="orange lighten-1"
                            text-color="grey lighten-4"
                          >
                            {{ item.title }}
                          </v-chip>
                        </draggable>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                class="my-6"
                vertical
              />
              <v-col cols="4">
                <v-list dense>
                  <v-subheader>Gauges</v-subheader>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <draggable
                          :list="channelGauges"
                          :group="{
                            name: 'universalGroup',
                            pull: 'clone',
                            put: false,
                          }"
                          class="d-flex flex-wrap"
                        >
                          <v-chip
                            v-for="(item, index) in channelGauges"
                            :key="index"
                            class="mr-2 mt-2"
                            color="red lighten-1"
                            text-color="grey lighten-4"
                          >
                            {{ item.title }}
                          </v-chip>
                        </draggable>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-divider
                class="my-6"
                vertical
              />
              <v-col cols="4">
                <v-list dense>
                  <v-subheader>Heat Maps</v-subheader>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <draggable
                          :list="channelHeatMaps"
                          :group="{
                            name: 'universalGroup',
                            pull: 'clone',
                            put: false,
                          }"
                          class="d-flex flex-wrap"
                        >
                          <v-chip
                            v-for="(item, index) in channelHeatMaps"
                            :key="index"
                            class="mr-2 mt-2"
                            color="green 
                                  lighten-1"
                            text-color="grey lighten-4"
                          >
                            {{ item.title }}
                          </v-chip>
                        </draggable>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
            <v-divider class="mx-4 mb-4" />
            <v-subheader>Presentation Background Color</v-subheader>
            <v-color-picker
              v-model="background"
              hide-canvas
              hide-inputs
              hide-mode-switch
              hide-sliders
              show-swatches
              mode="rgba"
              swatches-max-height="60"
            />
            <v-divider class="ma-4" />
            <v-btn
              small
              color="error"
              depressed
              outlined
              class="ml-3 mb-3"
              @click="deleteDialog = true"
            >
              Delete
              Dashboard
            </v-btn>
          </v-card>
        </v-col>

        <!-- DASHBOARD CARDS -->
        <v-col cols="12">
          <draggable
            :list="staged"
            :group="{
              name: 'universalGroup',
              pull: false,
              put: true
            }"
            :disabled="isReadOnly"
            class="drag-area"
          >
            <dashboard
              :id="'dashExample'"
              @currentBreakpointUpdated="logBreak"
            >
              <dash-layout
                v-for="layout in dlayouts"
                :key="layout.breakpoint"
                v-bind="layout"
              >
                <dash-item
                  v-for="item, index in layout.items"
                  :key="item.id"
                  v-bind.sync="item"
                  @resizeEnd="setResized"
                >
                  <!-- :locked="!fullscreen" -->
                  <v-card
                    v-if="staged[index]"
                    :ref="`card${index}`"
                    :class="checkChartType(staged[index]) == 'report' ? 'pa-4' : ''"
                  >
                    <DashboardCardHeatMap
                      v-if="checkChartType(staged[index]) == 'heatMap'"
                      :heat-map="staged[index]"
                      :is-read-only="isReadOnly"
                      :fullscreen="fullscreen"
                      @deleteItem="deleteItem"
                    />
                    <DashboardCardGauge
                      v-if="checkChartType(staged[index]) == 'gauge'"
                      :gauge="staged[index]"
                      :staged="staged"
                      :is-read-only="isReadOnly"
                      :fullscreen="fullscreen"
                      :resized="resized"
                      @deleteItem="deleteItem"
                    />
                    <DashboardCardReport
                      v-if="checkChartType(staged[index]) == 'report'"
                      :report="staged[index]"
                      :is-read-only="isReadOnly"
                      :fullscreen="fullscreen"
                      @deleteItem="deleteItem"
                    />
                  </v-card>
                </dash-item>
              </dash-layout>
            </dashboard>
          </draggable>
          <!-- <draggable :list="staged" group="universalGroup" :disabled="isReadOnly" class="drag-area row">
            <v-col :cols="dashboardCols(staged, index)" v-for="(item, index) in staged" :key="index">
              <v-card :ref="`card${index}`">
                <DashboardCardHeatMap :heatMap="item" v-if="checkChartType(item) == 'heatMap'" :isReadOnly="isReadOnly" @deleteItem="deleteItem" :fullscreen="fullscreen" />
                <DashboardCardGauge :gauge="item" v-if="checkChartType(item) == 'gauge'" :staged="staged" :isReadOnly="isReadOnly" @deleteItem="deleteItem" :fullscreen="fullscreen" />
                <DashboardCardReport :report="item" v-if="checkChartType(item) == 'report'" :isReadOnly="isReadOnly" @deleteItem="deleteItem" :fullscreen="fullscreen" />
              </v-card>
            </v-col>
          </draggable> -->
        </v-col>


        <!-- Delete Prompt -->
        <v-dialog
          v-model="deleteDialog"
          max-width="400"
        >
          <v-card>
            <v-card-title>Delete this dashboard?</v-card-title>
            <v-divider class="mx-4 mb-2" />
            <v-card-text>Are you sure you would like to delete this dashboard?</v-card-text>
            <v-card-actions class="d-flex justify-end">
              <v-btn
                small
                outlined
                color="secondary"
                @click="deleteDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                small
                depressed
                color="error"
                @click="deleteDashboard"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </fullscreen>
    <div class="ml-10">
      <span v-if="staged.length == 0">
        <h3>Drag and drop a chip from the right panel to add components</h3>
      </span>
      <!-- <span v-if="staged.length > 0 && !isReadOnly">
        <h2>Drag and drop cards to reorder</h2>
      </span> -->
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { Dashboard, DashLayout, DashItem } from "vue-responsive-dash";
import draggable from "vuedraggable";

import DashboardCardHeatMap from "../components/DashboardCardHeatMap.vue";
import DashboardCardGauge from "../components/DashboardCardGauge.vue";
import DashboardCardReport from "../components/DashboardCardReport.vue";

import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";
import gaugeMixin from "../mixins/gauge-mixin";

export default {
  name: "DashboardView",
  components: {
    draggable,
    DashboardCardHeatMap,
    DashboardCardGauge,
    DashboardCardReport,
    Dashboard,
    DashLayout,
    DashItem
  },
  mixins: [datasetMixin, reportMixin, gaugeMixin],
  data() {
    return {
      isReadOnly: true,
      staged: [],
      draggedItem: null,
      deleteDialog: false,
      fullscreen: false,
      background: '#EEEEEEFF',
      resized: false,
      dlayouts: [
        {
          breakpoint: "xl",
          numberOfCols: 12,
          items: [
            /* {
              id: "1",
              x: 0,
              y: 0,
              width: 3,
              height: 3
            },
            { id: "2", x: 3, y: 0, width: 3, height: 3 },
            { id: "3", x: 6, y: 0, width: 3, height: 3 },
            { id: "4", x: 0, y: 3, width: 3, height: 3 },
            { id: "5", x: 3, y: 3, width: 3, height: 3 },
            { id: "6", x: 6, y: 3, width: 3, height: 3 },
            { id: "7", x: 0, y: 6, width: 3, height: 3 } */
          ]
        },
        {
          breakpoint: "lg",
          breakpointWidth: 1200,
          numberOfCols: 10,
          rowHeight: 85,
          items: [
            /* {
              id: "1",
              x: 0,
              y: 0,
              width: 9,
              height: 3
            },
            { id: "2", x: 0, y: 3, width: 3, height: 3 },
            { id: "3", x: 3, y: 3, width: 3, height: 3 },
            { id: "4", x: 6, y: 3, width: 3, height: 3 },
            { id: "5", x: 3, y: 3, width: 3, height: 3 },
            { id: "6", x: 6, y: 3, width: 3, height: 3 },
            { id: "7", x: 0, y: 6, width: 3, height: 3 } */
          ]
        },
        {
          breakpoint: "md",
          breakpointWidth: 996,
          numberOfCols: 8,
          rowHeight: 160,
          items: [
            /* {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1
            },
            { id: "2", x: 1, y: 0, width: 2, height: 1 },
            { id: "3", x: 0, y: 1, width: 2, height: 1 },
            { id: "4", x: 3, y: 0, width: 2, height: 2 },
            { id: "5", x: 5, y: 0, width: 1, height: 2 },
            { id: "6", x: 6, y: 0, width: 2, height: 1 },
            { id: "7", x: 7, y: 1, width: 1, height: 1 } */
          ]
        },
        {
          breakpoint: "sm",
          breakpointWidth: 768,
          numberOfCols: 4,
          items: [
            /* {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1
            },
            { id: "2", x: 1, y: 0, width: 2, height: 1 },
            { id: "3", x: 0, y: 1, width: 2, height: 1 },
            { id: "4", x: 3, y: 0, width: 1, height: 2 },
            { id: "5", x: 2, y: 1, width: 1, height: 1 } */
          ]
        },
        {
          breakpoint: "xs",
          breakpointWidth: 480,
          numberOfCols: 2,
          items: [
            /* {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1
            },
            { id: "2", x: 1, y: 0, width: 1, height: 1 },
            { id: "3", x: 0, y: 1, width: 2, height: 1 } */
          ]
        },
        {
          breakpoint: "xxs",
          breakpointWidth: 0,
          numberOfCols: 1,
          items: [
            /* {
              id: "1",
              x: 0,
              y: 0,
              width: 1,
              height: 1
            },
            { id: "2", x: 0, y: 1, width: 1, height: 1 } */
          ]
        }
      ]
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
      "updateDashboardById",
      "removeDashboard",
    ]),
    logBreak(event) {
      console.log(event)
    },
    setStagedLayouts() {
      this.dlayouts.forEach(d => {
        let countX = 0;
        let countY = 0;
        switch (d.breakpoint) {
          case 'xxs':
            d.items = this.staged.map((s, i) => ({
              id: i + 1,
              x: 0,
              y: i * 2,
              width: 2,
              height: 2,
              resizeEdges: "left right",
            }))
            break;
          case 'xs':
            d.items = this.staged.map((s, i) => ({
              id: i + 1,
              x: 0,
              y: i * 2,
              width: 2,
              height: 2,
              resizeEdges: "left right",
            }))
            break;
          case 'sm':
            for (let i = 0; i < this.staged.length; i++) {
              if (countX > 2) {
                countX = 0;
                countY += 2;
              }
              d.items[i] = {
                id: i + 1,
                x: countX,
                y: countY,
                width: 2,
                height: 2,
                resizeEdges: "left right",
              }
              countX += 2;
            }
            break;
          case 'md':
            for (let i = 0; i < this.staged.length; i++) {
              if (countX > 4) {
                countX = 0;
                countY += 4;
              }
              d.items[i] = {
                id: i + 1,
                x: countX,
                y: countY,
                width: 4,
                height: 4,
                resizeEdges: "left right",
              }
              countX += 4;
            }
            break;
          case 'lg':
            for (let i = 0; i < this.staged.length; i++) {
              if (countX > 5) {
                countX = 0;
                countY += 5;
              }
              d.items[i] = {
                id: i + 1,
                x: countX,
                y: countY,
                width: 5,
                height: 5,
                resizeEdges: "left right",
              }
              countX += 5;
            }
            break;
          case 'xl':
            for (let i = 0; i < this.staged.length; i++) {
              if (countX > 9) {
                countX = 0;
                countY += 3;
              }
              d.items[i] = {
                id: i + 1,
                x: countX,
                y: countY,
                width: 3,
                height: 3,
                resizeEdges: "left right",
              }
              countX += 3;
            }
            break;

          default:
            break;
        }
      })
    },
    setResized() {
      this.resized = true;
      setTimeout(() => {
        this.resized = false;
      }, 1000);
    },
    saveDashboard() {
      this.isReadOnly = true;
      console.log(this.dashboard);
      console.log(this.staged);
      let data = {
        id: this.dashboard.id,
        title: this.dashboard.title,
        cards: JSON.stringify(this.staged),
        background: this.background,
      };
      this.updateDashboardById(data);
    },
    deleteDashboard() {
      this.removeDashboard({ id: this.dashboard.id });
      this.$router.push(`/${this.$route.params.channelId}/dashboards`);
    },
    deleteItem(id) {
      this.staged = this.staged.filter(s => s.id !== id)
      //this.staged.splice(event.oldIndex, 1);
    },
    async cancelForm() {
      this.isReadOnly = true;
      await this.fetchDashboard(this.dashboard.id);
      this.staged = this.dashboard.cards ? this.dashboard.cards : [];
      /* if (this.$route.params.dashboardId) {
        await this.fetchDashboard(this.$route.params.dashboardId)
        this.staged = this.dashboard.cards ? this.dashboard.cards : []
      } */
    },
    resetAndGoBack() {
      this.$router.go(-1);
    },
    editForm() {
      this.isReadOnly = false;
    },
    dashboardCardHeight(staged) {
      if (staged && staged.length > 0) {
        return staged.length > 4 ? "25vh" : staged.length > 2 ? "40vh" : "80vh";
      }
    },
    dashboardCols(staged, index) {
      if (staged && staged.length > 0) {
        if (staged.length == 2) {
          return 12;
        } else if (staged.length % 2 == 0) {
          return 6;
        } else {
          return index == 0 ? 12 : 6;
        }
      }
    },
    checkChartType(item) {
      let objs = Object.keys(item);
      if (objs.includes("reportGroup")) {
        return "report";
      } else if (objs.includes("segmentStops")) {
        return "gauge";
      } else return "heatMap";
    },
    fullscreenDashboard() {
      this.fullscreen = true
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
    filterLayoutItems(items, idx) {
      return items.filter(item => item && this.staged[idx])
    }
  },
  computed: {
    ...mapGetters([
      "dashboard",
      "dashboards",
      "reports",
      "dataSets",
      "heatMaps",
      "currentChannels",
    ]),
    channelReports() {
      if (
        this.reports &&
        this.reports.length > 0 &&
        this.currentChannels &&
        this.currentChannels[0]
      ) {
        let reports = this.reports.filter(
          (t) => t.channelId == this.currentChannels[0].channelId
        );
        if (this.switch1) {
          reports.filter(
            (r) =>
              r.createdBy == `${this.user.given_name} ${this.user.family_name}`
          );
        }
        return reports;
      } else return [];
    },
  },
  watch: {
    async fullscreen() {
      this.fetchReports();
      this.fetchDataSets();
      this.fetchGauges();
      this.fetchHeatMaps();
      if (this.$route.params.dashboardId) {
        await this.fetchDashboard(this.$route.params.dashboardId);
        this.staged = this.dashboard.cards ? this.dashboard.cards : [];
      }
      if (this.staged.length == 0) {
        this.isReadOnly = false;
      }
    },
    staged() {
      this.setStagedLayouts()
    },
    dlayouts() {
      console.log(this.dlayouts)
    }
  },
  async mounted() {
    if (this.$route.params.dashboardId) {
      await this.fetchDashboard(this.$route.params.dashboardId);
      this.staged = this.dashboard.cards ? this.dashboard.cards : [];
    }
    this.setStagedLayouts()
    if (this.staged.length == 0) {
      this.isReadOnly = false;
    }
    if (this.dashboard.background) {
      this.background = this.dashboard.background
    }

    this.fetchReports();
    this.fetchDataSets();
    this.fetchGauges();
    this.fetchHeatMaps();
  },
};
</script>

<style scoped>
.drag-area {
  height: 90% !important;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.fullscreen-window {
  overflow-y: auto;
  overflow-x: hidden;
  background: v-bind(background)
}
</style>
