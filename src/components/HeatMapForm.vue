<template>
  <v-container>
    <v-row>
      <!-- Title -->
      <v-col cols="11">
        <div class="d-flex justify-space-between">
          <h3 v-if="heatMap.id">Update {{ heatMap.title }}</h3>
          <h3 v-else>Add Heat Map</h3>
          <div>
            <v-btn @click="saveHeatMap" class="px-5 mr-2 mb-2" color="primary" depressed small>Save</v-btn>
            <v-btn class="mb-2" @click="resetAndGoBack" small outlined>Close</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="11">
        <v-alert v-if="!formValid && submitAttempted" type="error" dense dismissible>Please fix highlighted fields below before submitting Heat Map</v-alert>
        <!-- Form Fields -->
        <v-form v-model="formValid" ref="form" class="mt-2">
          <div class="grid">
            <div>
              <v-text-field v-model="heatMap.title" label="Title" dense required
                :rules="[(v) => !!v || 'Title is required']"></v-text-field>
            </div>
            <div>
              <v-select v-model="heatMap.dataSet" :items="dataSetChoices" item-text="title" item-value="id" label="Data Set"
                dense required :rules="[(v) => !!v || 'Data Set is required']" @change="loadTable"></v-select>
            </div>
            <div>
              <v-select v-model="selectedHeaders" :items="headers" label="Target Columns" multiple small dense return-object
                @change="onChangeSelected">
              </v-select>
            </div>
            <div>
              <v-select v-model="leadCol" :items="leadColKeys" label="Lead Column" dense @change="onChangeAxis"></v-select>
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="heatMap.dataSet" class="mt-2 mb-4" cols="11">
        <v-card>
          <KPIHeatMap :heatMap="heatMap" :headers="selectedHeaders" :dataItems="items" :options="options" />
        </v-card>
      </v-col>
    </v-row>
    <div v-if="heatMap.dataSet">
      <!-- <v-row v-for="header, j in headers" :key="j">
        <v-col v-for="option, i in options.cols" :key="i" cols="3">
          <v-text-field :v-model="options.cols[i]" :label="options.cols[i]" dense required :rules="[(v) => !!v || 'Title is required']">
            <template v-slot:label>
              {{ option }}
            </template>
          </v-text-field>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col xl="1" md="2" sm="3" xs="4" :key="i" v-for="col, i in heatMap.options.cols">
          <v-card-title>{{ col.name }}</v-card-title>
          <v-text-field v-model="heatMap.options.cols[i].gre" solo class="text-green" dense required :rules="[(v) => !!v || 'required']">
            <v-icon color="green lighten-1" slot="prepend-inner">
              {{!heatMap.options.cols[i].abs ? 'mdi-greater-than-or-equal' : 'mdi-less-than-or-equal'}}
            </v-icon>
          </v-text-field>
          <v-text-field v-model="heatMap.options.cols[i].yel" solo class="text-yellow" :prepend-inner-icon="!heatMap.options.cols[i].abs ? 'mdi-greater-than-or-equal' : 'mdi-less-than-or-equal'" dense required :rules="[(v) => !!v || 'required']">
            <v-icon color="amber lighten-1" slot="prepend-inner">
              {{!heatMap.options.cols[i].abs ? 'mdi-greater-than-or-equal' : 'mdi-less-than-or-equal'}}
            </v-icon>
          </v-text-field>
          <v-text-field v-model="heatMap.options.cols[i].yel" solo class="text-red" :prepend-inner-icon="!heatMap.options.cols[i].abs ? 'mdi-less-than' : 'mdi-greater-than'" dense required :rules="[(v) => !!v || 'required']">
            <v-icon color="red lighten-1" slot="prepend-inner">
              {{heatMap.options.cols[i].abs ? 'mdi-greater-than' : 'mdi-less-than'}}
            </v-icon>
          </v-text-field>
          <v-checkbox v-model="heatMap.options.cols[i].abs" label="Use Absolute Value"></v-checkbox>
          </v-col>
      </v-row>
    </div>
    <!-- Delete Button -->
    <div v-if="heatMap && heatMap.id" class="d-flex justify-end mt-4">
        <v-btn
          @click="deleteDialog = true"
          small
          color="error"
          depressed
          outlined
          >Delete Heat Map</v-btn
        >
      </div>
      <!-- Delete Prompt -->
      <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
          <v-card-title>Delete this Heat Map?</v-card-title>
          <v-divider class="mx-4 mb-2"></v-divider>
          <v-card-text
            >Are you sure you would like to delete this heat map?</v-card-text
          >
          <v-card-actions class="d-flex justify-end">
            <v-btn
              @click="deleteDialog = false"
              small
              outlined
              color="secondary"
              >Cancel</v-btn
            >
            <v-btn @click="deleteHeatMap" small depressed color="error"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import KPIHeatMap from "./KPIHeatMap.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import datasetMixin from "../mixins/dataset-mixin";

export default {
  name: "HeatMapForm",
  components: {
    KPIHeatMap
  },
  data() {
    return {
      submitAttempted: false,
      deleteDialog: false,
      formValid: true,
      headers: [],
      dataHeaders: [],
      selectedHeaders: [],
      leadColKeys: [],
      leadCol: '',
      items: [],
      options: {},
      /* mapOptions: {
        cols: [
          {
            abs: false,
            yel: 50,
            gre: 80,
          },
          {
            abs: true,
            yel: 5,
            gre: 1,
          },
          {
            abs: false,
            yel: 1,
            gre: 2,
          }
        ]
      } */
    };
  },
  mixins: [datasetMixin],
  computed: {
    ...mapGetters([
      "heatMap",
      "currentChannels",
      "dataSets",
      "dataSet",
      "statusCode",
      "user",
    ]),
    dataSetChoices() {
      if (this.dataSets) {
        return this.dataSets.filter(d => d.channelId == this.currentChannels[0].channelId);
      }
      return ""
    }
  },
  methods: {
    ...mapActions(["fetchDataSets", "fetchDataSet", "fetchHeatMaps", "fetchHeatMap", "addHeatMap", "updateHeatMapById", "removeHeatMap"]),
    ...mapMutations([]),
    log(e) {
      console.log(e)
    },
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    resetAndGoBack() {
      this.clear()
      this.$refs.form.reset();
      if (this.$route.path === `/${this.currentChannels[0].name}/gauges`) {
        this.$emit("closeHeatMapForm")
      } else {
        this.$router.go(-1)
        //this.$router.push(`/${this.currentChannels[0].name}/gauges`)
      }
    },
    clear() {
      this.$refs.form.reset();
      /* this.file = null;
      this.data = [];
      this.selected = [];
      this.headers = [];
      this.items = []; */

    },
    async saveHeatMap() {
      this.submitAttempted = true
      this.$refs.form.validate();
      if (this.formValid) {
        let data = {
          title: this.heatMap.title,
          //dataSetId: this.heatMap.dataSet,
          options: JSON.stringify(this.options),
          leadCol: this.leadCol,
          columns: JSON.stringify(this.selectedHeaders),
          channelId: this.currentChannels[0].channelId
        }
        if (this.heatMap.id) {
          data.id = this.heatMap.id
          data.updatedBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
          data.dataSetId = this.heatMap.dataSet.id
          await this.updateHeatMapById(data)
        } else {
          data.createdBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
          data.dataSetId = this.heatMap.dataSet
          await this.addHeatMap(data)
        }
      }
    },
    deleteHeatMap() {
      this.removeHeatMap({ id: this.heatMap.id });
      this.$router.push(`/${this.$route.params.channelId}/gauges`);
    },
    clearInput(type) {
      this.$refs.form.inputs.forEach(input => {
        if (input.type == type) {
          input.reset()
        }
      })
    },
    /* async showDataChart() {
      await this.fetchHeatMap(this.$route.params.heatMapId)
      console.log(this.heatMap)
      console.log(this.createMasterData(this.heatMap.dataSet.dataValues.items))
      this.uploadData(this.createMasterData(this.heatMap.dataSet.dataValues.items))
    }, */
    
    onChangeSelected() {
      this.selectedHeaders.forEach((s, i) => {
        if (typeof s == "string") {
          this.selectedHeaders[i] = ({ text: s, value: s, })
        }
      })
      /* if (this.dataHeaders != this.selectedHeaders) {
        this.dataHeaders = this.selectedHeaders.shift()
      } */
      this.leadColKeys = this.selectedHeaders.map(h => h.text || h)
      this.onChangeAxis() 
      this.items = this.filterData(this.selectedHeaders, this.createMasterData(this.dataSet.dataValues.items))
      //console.log(this.items)
    },
    onChangeAxis() {
      this.leadColKeys = this.selectedHeaders.map(h => h.text || h)
      this.moveArrByKey(this.leadColKeys, this.leadCol)
      this.selectedHeaders = this.leadColKeys.map(x => ({
        text: x,
        value: x
      }))
      //console.log(this.selectedHeaders)
      //console.log(this.dataSet.dataValues.items)
      this.items = this.filterData(this.selectedHeaders, this.createMasterData(this.dataSet.dataValues.items))
      this.changeLegend()
    },
    moveArrByKey(keys, selected) {
      keys.forEach((k, i) => {
        if (k == selected) {
          this.arrayMove(keys, i, 0)
        }
      })
    },
    changeLegend() {
      console.log(this.heatMap.options.cols)
      if (this.selectedHeaders) {
        let legendSelect = []
        this.selectedHeaders.slice(1).forEach((h, i) => {
          let attr ={}
          if (this.heatMap.options.cols[i]) {
            attr = {
            name: h.text,
            gre: this.heatMap.options.cols[i].gre,
            yel: this.heatMap.options.cols[i].yel,
            abs: this.heatMap.options.cols[i].abs,
            }
          } else {
            attr = {
            name: h.text,
            gre: 0,
            yel: 0,
            abs: false,
            }
          }
          
          legendSelect.push(attr)
        })
        this.heatMap.options.cols = legendSelect
      }
    },
    uploadData(data) {
      this.items = data;
      //console.log(this.heatMap.options)
      this.options = this.heatMap.options
      //this.selected = data;
      const keys = Object.keys(data[0])
      this.headers = keys.map((key) => ({
        text: key,
        value: key,
      }));
    },
    loadTable() {
      this.uploadData(this.createMasterData(this.dataSet.dataValues.items))
    },
    populateData() {
      if (this.heatMap.id) {
        if (this.heatMap.columns) {
          this.selectedHeaders = this.heatMap.columns
          this.onChangeSelected()
        }
        if (this.heatMap.leadCol) {
          this.leadCol = this.heatMap.leadCol
          this.onChangeAxis()
        }
        if (this.heatMap.options && this.heatMap.options.cols && this.heatMap.options.cols.length > 0) {
          //console.log(this.heatMap.options)
          this.options = this.heatMap.options
        }
      }
    }
  },
  async mounted() {
    if (this.$route.path === `/${this.currentChannels[0].name}/gauges`) {
      this.heatMap.id = ""
      this.isReadOnly = false
      this.clear()
    } else {
      await this.fetchHeatMap(this.$route.params.heatMapId)
      await this.fetchDataSets()
      await this.fetchDataSet(this.heatMap.dataSetId)
      this.uploadData(this.createMasterData(this.dataSet.dataValues.items))
      if (!this.heatMap.user) {
        this.heatMap.user = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
      }
      this.populateData()
  }
  },
  watch: {
    headers() {
      //console.log(this.options)
      //console.log(this.selectedHeaders)
    },
    /* heatMap() {
      console.log(this.heatMap)
      if (this.heatMap.id){
        if (this.heatMap.columns) {
        this.selectedHeaders = this.heatMap.columns
        this.onChangeSelected()
        
      } 
        if (this.heatMap.leadCol) {
        this.leadCol = this.heatMap.leadCol
        this.onChangeAxis()
        }
      if (this.heatMap.options && this.heatMap.options.cols && this.heatMap.options.cols.length > 0) {
        console.log(this.heatMap.options)
        this.options = this.heatMap.options
      }  
      }
      
    }, */
    dataSet() {
      if (this.dataSet) {
        //console.log(this.dataSet)
      }
    },
    selected() {
      if (this.selected && this.selected.length > 0) {
        //console.log(this.selected)
      } else (console.log("no SELECTED data"))
    },
    statusCode() {
      if (this.statusCode == 201) {
        this.$router.push(`/heatMaps/${this.heatMap.id}`);
        this.SET_STATUS_CODE(0);
      }
    },
  },
};
</script>

<style scoped>
.placeholder-text,
.placeholder-icon {
  color: #1976d2;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.channels,
.description {
  grid-column: 1 / span 2;
}

div>>>.v-select__selections {
  padding-top: 5px;
  padding-bottom: 5px;
}

div>>>.v-select__selections .v-chip {
  color: white;
  background-color: #2196F3;
}

div>>>.v-select__selections .v-chip .v-icon {
  color: white;
}
</style>
