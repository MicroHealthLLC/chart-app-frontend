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
      <!--<v-divider class="mb-4"></v-divider>
      <v-container class="pl-5">
        <v-row>
        <v-col xl="6" lg="6" md="10" sm="12">
          <v-card tile elevation="4">
            <KPIHeatMap />
            <v-divider class="my-2"></v-divider>
            <v-card-title>Title</v-card-title>
            <v-card-subtitle>By: "Name"</v-card-subtitle>
          </v-card>
        </v-col>
        </v-row>
      </v-container> -->
      <div v-if="channelGauges.length == 0" class="placeholder d-flex flex-column justify-center align-center">
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
    ...mapActions(["fetchGauges", "fetchGauge", "removeGauge", "fetchDataSets"]),
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
    /* toGauge(gaugeId) {
      this.fetchGauge(gaugeId)
      this.$router.push(
        `gauges/${gaugeId}`
      );
    }, */
    /* async editItem(item) {
      console.log(item)
      let id = item.id
      await this.fetchGauge(id)
      this.$router.push(`gauges/${id}`)
    },
    deleteItem(item) {
      this.$confirm(
        `Are you sure you want to delete the "${item.title}" KPI?`,
        "Confirm Delete",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
       ).then(() => {
        this.removeGauge({ id: item.id });
      });
    }, */
    /* setSegments(chartType, prop) {
      if (chartType == "Traditional" ) {
        return prop == 'color' ? ['tomato', 'gold', 'limegreen'] 
          : (prop == 'count') ? 3 : ''
      } else if (chartType == "Middle") {
        return prop == 'color' ? ['tomato', 'gold', 'limegreen', 'gold', 'tomato'] 
          : (prop == 'count') ? 5 : ''
      } else {
        return prop == 'color' ? ['tomato', 'gold', 'limegreen'] 
          : (prop == 'count') ? 3 : ''
      }
    } */
  },
  computed: {
    ...mapGetters(["gauges", "currentChannels", "gauge"]),
    /* channelGauges(){
      if (this.gauges && this.gauges.length > 0 && this.currentChannels && this.currentChannels[0].channelId){
        return this.gauges.filter(t => t.channelId == this.currentChannels[0].channelId)
      } else return []
    }, */
    
  },
  mounted() {
    console.log(this.gauges)
  },
  beforeMount() {
    this.fetchGauges()
    this.fetchDataSets()
  },
  watch: {
    gauges() {
      if (this.gauges) {
        console.log(this.gauges)
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
</style>