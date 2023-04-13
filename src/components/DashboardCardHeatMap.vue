<template>
  <div>
    <fullscreen
      v-if="!fullscreen"
      v-model="fullscreenHM"
      :class="fullscreenHM ? 'pa-6' : ''"
    >
      <span class="d-flex">
        <h4 class="pa-4">{{ heatMap.title }}</h4>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-0 mt-2"
              icon
              v-bind="attrs"
              @click.prevent="toHeatMap(heatMap.id)"
              v-on="on"
              ><v-icon small>fa-solid fa-up-right-from-square</v-icon>
            </v-btn>
          </template>
          <span>Go to KPI Heat Map</span>
        </v-tooltip>
        <v-tooltip v-if="!isReadOnly" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-4 mt-2"
              icon
              v-bind="attrs"
              @click.prevent="$emit('deleteItem', heatMap.id)"
              v-on="on"
              ><v-icon small color="red">fa-trash</v-icon>
            </v-btn>
          </template>
          <span>Remove from Dashboard</span>
        </v-tooltip>
      </span>
      <v-btn class="chart-menu" icon @click="fullscreenHeatMap">
        <v-icon>{{
          fullscreenHM ? "mdi-fullscreen-exit" : "mdi-fullscreen"
        }}</v-icon>
      </v-btn>
      <!-- <fullscreen v-if="!fullscreen" v-model="fullscreenHM"> -->
      <span v-if="fullscreenHM" height="100vh">
        <!-- <v-toolbar class="px-5" color="info" dark>
          <h3>{{ heatMap.title }}</h3>
          <v-spacer></v-spacer>
          <v-btn @click="fullscreenHM = false" icon>
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
        </v-toolbar> -->
        <v-row justify="space-around" class="mt-10">
          <v-col :cols="heatMap.notes ? 8 : 12">
            <KPIHeatMap
              :heat-map="heatMap"
              :headers="cols"
              :data-items="data"
            />
          </v-col>
          <v-col v-if="heatMap.notes" cols="3">
            <v-card
              elevation="1"
              width="fit-content"
              class="pa-6 ma-8"
              v-html="heatMap.notes"
            />
          </v-col>
        </v-row>
      </span>
      <KPIHeatMap
        v-else
        :heat-map="heatMap"
        :headers="cols"
        :data-items="data"
        :is-dashboard="true"
      />
    </fullscreen>
    <span v-else>
      <!-- </v-toolbar> -->
      <span class="d-flex">
        <h4 class="pa-4">{{ heatMap.title }}</h4>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-0 mt-2"
              icon
              v-bind="attrs"
              @click.prevent="toHeatMap(heatMap.id)"
              v-on="on"
              ><v-icon small>fa-solid fa-up-right-from-square</v-icon>
            </v-btn>
          </template>
          <span>Go to KPI Heat Map</span>
        </v-tooltip>
      </span>
      <v-row justify="space-around">
        <v-col :cols="heatMap.notes ? 6 : 10">
          <KPIHeatMap :heat-map="heatMap" :headers="cols" :data-items="data" />
        </v-col>
        <v-col v-if="heatMap.notes" cols="4">
          <v-card
            elevation="1"
            width="fit-content"
            class="pa-6 ma-8"
            v-html="heatMap.notes"
          />
        </v-col>
      </v-row>
    </span>
  </div>
</template>

<script>
import KPIHeatMap from "./KPIHeatMap.vue";
import datasetMixin from "../mixins/dataset-mixin";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardCardHeatMap",
  components: {
    KPIHeatMap,
  },
  mixins: [datasetMixin],
  props: {
    heatMap: Object,
    isReadOnly: Boolean,
    fullscreen: Boolean,
  },
  data() {
    return {
      data: [],
      cols: [],
      fullscreenHM: false,
      reveal: false,
    };
  },
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
      this.fullscreenHM = this.fullscreenHM ? false : true;
    },
  },
  watch: {
    heatMap() {
      console.log(this.heatMap);
    },
    isReadOnly() {
      console.log(this);
    },
  },
  async mounted() {
    await this.fetchDataSet(this.heatMap.dataSetId);
    this.data = this.createMasterData(this.dataSet.dataValues.items);
    // console.log(this.data);
    // console.log(this.heatMap);
    if (this.heatMap.columns && typeof this.heatMap.columns == "string") {
      this.cols = JSON.parse(this.heatMap.columns);
      this.heatMap.columns = JSON.parse(this.heatMap.columns);
    } else {
      this.cols = this.heatMap.columns;
    }
    if (this.heatMap.options && typeof this.heatMap.options == "string") {
      this.heatMap.options = JSON.parse(this.heatMap.options);
    }
    console.log(this);
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
