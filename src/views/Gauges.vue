<template>
  <v-row>
    <v-col class="col-11">
      <div class="d-flex justify-space-between">
        <h3><v-icon class="mr-2 pb-1" color="red darken-2">mdi-gauge</v-icon>KPIs</h3>
        <v-btn class="mb-2" color="primary" small @click.prevent="toNewGauge">Add KPI <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-dialog v-model="showAddGaugeForm" width="50%">
        <v-card class="px-4 py-4 modal">
          <!-- <v-form v-model="formValid" ref="form">
            <div class="grid">
              <div>
                <v-text-field v-model="dataSet.title" label="Title" dense required :readonly="isReadOnly"
                  :rules="[(v) => !!v || 'Title is required']"></v-text-field>
              </div>
              <div>
                <v-text-field :readonly="isReadOnly" v-model="dataSet.user" label="Created By" dense>
                </v-text-field>
              </div>
              <div :class="{ description: dataSet.id }">
                <v-text-field v-model="dataSet.description" label="Description" dense :readonly="isReadOnly"></v-text-field>
              </div>
              <div>
                <v-file-input v-show="dataSet.id != ''" placeholder="Please choose a file..." type="file"
                  @change.native="onChange" @click:clear="clearInput('file')" dense required
                  :rules="[(v) => !!v || 'Data File is required']" />
                <xlsx-read :options="readOptions" :file="file">
                  <xlsx-json :options="readOptions" @parsed="uploadData"></xlsx-json>
                </xlsx-read>
                <div>
                  <v-btn v-if="dataSet.id" :disabled="(!file)" class="mb-1" elevation="4" small
                    @click="addNewDataValue"><v-icon>mdi-plus-circle-outline</v-icon> Add New Data</v-btn>
                </div>
              </div>
            </div>
          </v-form> -->
        <GaugeForm @closeGaugeForm="closeGaugeForm" />  
      </v-card> 
      <!-- <span v-else>NO DATA</span> -->
    </v-dialog>
      <v-divider class="mb-4"></v-divider>
      <v-container v-if="channelGauges.length > 0" class="pl-5">
        <v-row>
        <v-col xl="2" lg="3" md="6" sm="12" v-for="(gauge) in channelGauges" :key="gauge.id">
          <v-card width="250px" min-width="250px" @click.prevent="toGauge(gauge.id)" tile elevation="4">
            <KPIGauge :gauge="gauge" :height="130" :width="200" :segmentStops="gauge.segmentStops.split(',').map(x => parseInt(x))" />
            <v-divider class="my-2"></v-divider>
            <v-card-title>{{ gauge.title }}</v-card-title>
            <v-card-subtitle>{{ gauge.createdBy }}</v-card-subtitle>
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
      <div v-else class="placeholder d-flex flex-column justify-center align-center">
        <p class="font-weight-light">No KPIs on this Channel yet...</p>
        <v-btn text small color="primary" @click.prevent="toNewGauge">Add a KPI</v-btn>
      </div>
    </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GaugeForm from "../components/GaugeForm.vue";
import KPIGauge from "../components/KPIGauge.vue";
//import VueSpeedometer from "vue-speedometer";

export default {
  name: "Gauges",
  components: {
    //VueSpeedometer,
    GaugeForm,
    KPIGauge
  },
  data() {
    return {
      showAddGaugeForm: false,
    } 
  },
  methods: {
    ...mapActions(["fetchGauges", "fetchGauge", "removeGauge"]),
    toNewGauge(){
      this.showAddGaugeForm = true
      //this.$router.push(`data-sets/add-data-set`); 
    },
    closeGaugeForm() {
      this.showAddGaugeForm = false
    },
    toGauge(gaugeId) {
      this.fetchGauge(gaugeId)
      this.$router.push(
        `gauges/${gaugeId}`
      );
    },
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
    ...mapGetters(["gauges", "currentChannels"]),
    channelGauges(){
      if (this.gauges && this.gauges.length > 0 && this.currentChannels && this.currentChannels[0].channelId){
        return this.gauges.filter(t => t.channelId == this.currentChannels[0].channelId)
      } else return []
    },
    
  },
  beforeMount() {
    this.fetchGauges()
  },
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