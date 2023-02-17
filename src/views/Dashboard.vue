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
            <v-btn v-else @click="editForm" class="px-5 mr-2 mb-2" color="primary" depressed small>Edit</v-btn>
            <v-btn v-if="isReadOnly" class="mb-2" @click="resetAndGoBack" small outlined>Close</v-btn>
            <v-btn v-if="!isReadOnly" class="mb-2" @click="cancelForm" small outlined>Cancel</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <draggable :list="staged" group="universalGroup">
          <v-chip v-for="(item, index) in staged" :key="index" class="mr-2" close @click:close="removeAt(index)">{{ item.title }}</v-chip>
        </draggable>
        <div v-for="(i, idx) in staged" :key="idx">
          <v-card class="pa-2 ma-2">
          <p>{{ i.title }} {{ idx }}</p>
        </v-card>
        </div>
      </v-col>
      <v-col cols="2">
        <v-card height="85vh">
          <v-list>
          <v-subheader>Reports</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <draggable :list="channelReports" :group="{ name: 'universalGroup', pull: 'clone', put: false }">
                  <v-chip v-for="(item, index) in channelReports" :key="index" color="orange lighten-1">{{ item.title }}</v-chip>
                </draggable>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list>
          <v-subheader>Gauges</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <draggable :list="channelGauges" :group="{ name: 'universalGroup', pull: 'clone', put: false }">
                  <v-chip v-for="(item, index) in channelGauges" :key="index" color="red lighten-1">{{ item.title }}</v-chip>
                </draggable>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list>
        <!-- <v-list>
          <v-subheader>Gauges</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><v-chip v-for="(item, index) in sourceList" :key="index" :data-item="item" @dragStart="handleDragStart" @dragEnd="handleDragEnd" draggable color="red lighten-1">{{ item }}</v-chip></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list> -->
          <v-subheader>Heat Maps</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <draggable :list="channelHeatMaps" :group="{ name: 'universalGroup', pull: 'clone', put: false }">
                  <v-chip v-for="(item, index) in channelHeatMaps" :key="index" color="green 
                  lighten-1">{{ item.title }}</v-chip>
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
import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";
import gaugeMixin from "../mixins/gauge-mixin";

export default {
  name: "Dashboard",
  components: {
    draggable
  },
  data() {
    return {
      isReadOnly: true,
      staged: [],
      sourceList: ["a", "b", "c"],
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
      "fetchDashboards"
    ]),
    saveDashboard() {

    },
    cancelForm() {
      this.isReadOnly = true
    },
    resetAndGoBack() {

    },
    editForm() {
      this.isReadOnly = false
    },
    removeAt(idx) {
      this.staged.splice(idx, 1);
    },
    /* handleDragStart(event) {
      console.log(event)
      this.draggedItem = event.target
      event.dataTransfer.setData('text', this.draggedItem.dataset.item)
      event.dataTransfer.effectAllowed = 'move'
    },
    handleDragEnd() {
      this.draggedItem = null
    },
    handleDrop(event) {
      event.preventDefault()
      const data = event.dataTransfer.getData('text')
      const index = this.sourceList.indexOf(data)
      if (index !== -1) {
        this.sourceList.splice(index, 1)
        this.staged.push(data)
      }
    } */
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
  mounted() {
    this.fetchReports()
    this.fetchDataSets()
    this.fetchGauges()
    this.fetchHeatMaps()
  }
};
</script>

<style scoped>

</style>
