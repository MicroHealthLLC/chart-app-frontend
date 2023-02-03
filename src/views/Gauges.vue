<template>
  <v-row>
    <v-col class="col-11">
      <div class="d-flex justify-space-between">
        <h3><v-icon class="mr-2 pb-1" color="red darken-2">mdi-gauge</v-icon>KPIs</h3>
        <div>
        <v-btn class="mb-2 mr-2" color="primary" small @click.prevent="toNewGauge">Add Gauge <v-icon small>mdi-plus</v-icon>
        </v-btn>
        <v-btn class="mb-2" color="primary" small @click.prevent="toNewHeatMap">Add Heat Map <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </div>
      </div>
      <v-dialog v-model="showAddGaugeForm" width="60%">
        <v-card class="px-4 py-4 modal">
          <GaugeForm @closeGaugeForm="closeGaugeForm" :showAddGaugeForm="showAddGaugeForm" />  
        </v-card> 
      </v-dialog>
      <v-dialog v-model="showAddHeatMapForm" width="60%">
        <v-card class="px-2 py-2 modal">
          <HeatMapForm @closeHeatMapForm="closeHeatMapForm" :showAddHeatMapForm="showAddHeatMapForm" />  
        </v-card> 
      </v-dialog>
      <v-divider class="mb-4"></v-divider>
      <v-container v-if="channelGauges.length > 0" class="pl-5">
        <v-row>
        <v-col xl="2" lg="3" md="4" sm="6" v-for="(gauge) in channelGauges" :key="gauge.id">
          <v-card width="250px" min-width="250px" @click.prevent="toGauge(gauge.id)" tile elevation="4">
            <KPIGauge :gauge="gauge" :height="130" :width="200" :segmentStops="gauge.segmentStops.split(',').map(x => parseFloat(x))" :needleHeightRatio=".7" />
            <v-divider class="my-2"></v-divider>
            <v-card-title>{{ gauge.title }}</v-card-title>
            <v-card-subtitle>By: {{ gauge.createdBy }}</v-card-subtitle>
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
      <v-divider class="mb-4"></v-divider>
      <v-container class="pl-5">
        <v-row>
        <v-col v-for="(heatMap) in channelHeatMaps" :key="heatMap.id" xl="2" lg="3" md="4" sm="6">
          <v-card @click.prevent="toHeatMap(heatMap.id)" width="250px" min-width="250px" tile elevation="4">
            
            <!-- <KPIHeatMap :heatMap="heatMap" /> -->
            <!-- <v-divider class="my-2"></v-divider> -->
            <v-row justify="center" align="center">
              <v-icon cols="6" x-large>mdi-table-large</v-icon>
              <v-col cols="6">
                <v-card-title>{{ heatMap.title }}</v-card-title>
                <v-card-subtitle v-if="heatMap.createdBy">By: {{ heatMap.createdBy }}</v-card-subtitle>
                <v-card-subtitle v-else>By: John Smith</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        </v-row>
      </v-container>
      <div v-if="channelGauges.length == 0 && channelHeatMaps.length == 0" class="placeholder d-flex flex-column justify-center align-center">
        <p class="font-weight-light">No KPIs on this Channel yet...</p>
        <v-btn text small color="primary" @click.prevent="toNewGauge">Add a KPI</v-btn>
      </div>
    </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import GaugeForm from "../components/GaugeForm.vue";
import HeatMapForm from "../components/HeatMapForm.vue";
//import KPIHeatMap from "../components/KPIHeatMap.vue";
import KPIGauge from "../components/KPIGauge.vue";
import gaugeMixin from "../mixins/gauge-mixin";
//import VueSpeedometer from "vue-speedometer";

export default {
  name: "Gauges",
  components: {
    //VueSpeedometer,
    GaugeForm,
    HeatMapForm,
    KPIGauge,
    //KPIHeatMap
  },
  mixins: [gaugeMixin],
  data() {
    return {
      showAddGaugeForm: false,
      showAddHeatMapForm: false,
    } 
  },
  methods: {
    ...mapActions(["fetchGauges", "fetchGauge", "removeGauge", "fetchHeatMaps", "fetchDataSets"]),
    ...mapMutations(["SET_GAUGE"]),
    toNewGauge(){
      this.showAddGaugeForm = true
      this.SET_GAUGE(this.newGauge)
      console.log(this.gauge)
      //this.$router.push(`data-sets/add-data-set`); 
    },
    toNewHeatMap(){
      this.showAddHeatMapForm = true
      //this.SET_HEATMAP(this.newHeatMap)
      //this.$router.push(`data-sets/add-data-set`); 
    },
    closeGaugeForm() {
      this.showAddGaugeForm = false
    },
    closeHeatMapForm() {
      this.showAddHeatMapForm = false
    },
  },
  computed: {
    ...mapGetters(["gauges", "currentChannels", "gauge", "heatMaps"]),
  },
  mounted() {
    //console.log(this.gauges)
  },
  beforeMount() {
    this.fetchGauges()
    this.fetchHeatMaps()
    this.fetchDataSets()
  },
  watch: {
    gauges() {
      if (this.gauges) {
        //console.log(this.gauges)
      }
    },
    heatMaps() {
      if (this.heatMaps) {
        console.log(this.heatMaps)
      }
    }
  }
};
</script>

<style scoped>
.placeholder {
  height: 150px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

.singleGaugeGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 4rem;
}

.mdi-table-large {
  background: linear-gradient(to right, #EF5350, #EF5350 33.33%, #FFCA28 33.33%, #FFCA28 66.66%, #66BB6A 66.66%);
  background-clip: text;
  color: rgba(0, 0, 0, 0.2) !important;
}
</style>