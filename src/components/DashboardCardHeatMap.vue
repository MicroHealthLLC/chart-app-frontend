<template>
  <div>
    <span class="d-flex">
      <h4 class="pa-4">{{ heatMap.title }}</h4>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-0 mt-2"
            icon
            @click.prevent="toHeatMap(heatMap.id)"
            v-bind="attrs"
            v-on="on"
            ><v-icon small>fa-solid fa-up-right-from-square</v-icon>
          </v-btn>
        </template>
        <span>Go to KPI Heat Map</span>
      </v-tooltip>
      <v-tooltip top v-if="!isReadOnly">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-4 mt-2"
            icon
            @click.prevent="$emit('deleteItem', heatMap.id)"
            v-bind="attrs"
            v-on="on"
            ><v-icon small color="red">fa-trash</v-icon>
          </v-btn>
        </template>
        <span>Remove from Dashboard</span>
      </v-tooltip>
      <!-- <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-0 mt-2"
            icon
            @click="reveal = true"
            v-bind="attrs"
            v-on="on"
            ><v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <span>See Notes</span>
      </v-tooltip> -->
    </span>
    <v-btn @click="fullscreenHeatMap" class="chart-menu" icon>
      <v-icon>mdi-fullscreen</v-icon>
    </v-btn>
    <KPIHeatMap :heatMap="heatMap" :headers="cols" :dataItems="data" :isDashboard="true" />
    <v-dialog v-model="fullscreen" fullscreen eager>
      <v-card>
        <v-toolbar class="px-5" color="info" dark>
          <h3>{{ heatMap.title }}</h3>
          <v-spacer></v-spacer>
          <v-btn @click="fullscreen = false" icon>
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
        </v-toolbar>
          <v-row justify="space-around">
            <v-col cols="6">
              <KPIHeatMap :heatMap="heatMap" :headers="cols" :dataItems="data" />
            </v-col>
            <v-col cols="4">
              <v-card width="fit-content" class="pa-6 ma-8" v-html="heatMap.notes"></v-card>
            </v-col>
          </v-row>
      </v-card>
    </v-dialog>
    <!-- <v-card
      v-if="reveal"
      class="transition-fast-in-fast-out v-card--reveal"
      style="height: 100%"
    >
      <v-card-text class="pb-0" v-html="heatMap.notes">
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-0 mt-2"
              icon
              @click="reveal = false"
              v-bind="attrs"
              v-on="on"
              ><v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <span>Hide Notes</span>
        </v-tooltip>
      </v-card-actions>
    </v-card> -->
  </div>
</template>

<script>
import KPIHeatMap from "./KPIHeatMap.vue";
import datasetMixin from "../mixins/dataset-mixin";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardCardHeatMap",
  props: {
    heatMap: Object,
    isReadOnly: Boolean,
  },
  components: {
    KPIHeatMap,
  },
  data() {
    return {
      data: [],
      cols: [],
      fullscreen: false,
      reveal: false,
    };
  },
  mixins: [datasetMixin],
  computed: {
    ...mapGetters([
      "currentChannels",
      "channelDataSets",
      "dataSets",
      "dataSet",
      "user",
    ]),
  },
  methods: {
    ...mapActions(["fetchDataSet"]),
    toHeatMap(id) {
      this.$router.replace(`/${this.currentChannels[0].name}/heatMaps/${id}`);
    },
    fullscreenHeatMap() {
      this.fullscreen = true;
      /* setTimeout(() => {
				this.$refs.fullscreenchart.loadChart();
			}, 100); */
    },
  },
  async mounted() {
    await this.fetchDataSet(this.heatMap.dataSetId);
    this.data = this.createMasterData(this.dataSet.dataValues.items);
    console.log(this.data);
    console.log(this.heatMap);
    if (this.heatMap.columns && typeof this.heatMap.columns == "string") {
      this.cols = JSON.parse(this.heatMap.columns);
      this.heatMap.columns = JSON.parse(this.heatMap.columns);
    } else {
      this.cols = this.heatMap.columns;
    }
    if (this.heatMap.options && typeof this.heatMap.options == "string") {
      this.heatMap.options = JSON.parse(this.heatMap.options);
    }
    console.log(this)
  },
  watch: {
    heatMap() {
      console.log(this.heatMap);
    },
    isReadOnly() {
      console.log(this)
    }
  },
};
</script>

<style>
.chart-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
