<template>
  <v-row>
    <v-col class="col-11">
      <div class="d-flex justify-space-between">
        <h3><v-icon class="mr-2 pb-1" color="red darken-2">mdi-gauge</v-icon>KPIs</h3>
        <v-btn class="mb-2" color="primary" small @click.prevent="toNewGauge">Add KPI <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-dialog v-model="showAddGaugeForm" width="40%">
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
    </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GaugeForm from "../components/GaugeForm.vue";
//import VueSpeedometer from "vue-speedometer";

export default {
  name: "Gauges",
  components: {
    //VueSpeedometer
    GaugeForm
  },
  data() {
    return {
      showAddGaugeForm: false,
    } 
  },
  methods: {
    ...mapActions([]),
    toNewGauge(){
      this.showAddGaugeForm = true
      //this.$router.push(`data-sets/add-data-set`); 
    },
    closeGaugeForm() {
      this.showAddGaugeForm = false
    },
  },
  computed: {
    ...mapGetters([]),
  },
  beforeMount() {
    
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
</style>