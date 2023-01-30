<template>
    <v-row>
      <!-- Title -->
      <v-col class="col-12">
        <div class="d-flex justify-space-between">
          <h3 v-if="heatMap.id">Update {{ heatMap.title }}</h3>
          <h3 v-else>Add Heat Map</h3>
          <div>
            <v-btn
              @click="saveHeatMap"
              class="px-5 mr-2 mb-2"
              color="primary"
              depressed
              small
              >Save</v-btn
            >
            <v-btn class="mb-2" @click="resetAndGoBack" small outlined
              >Close</v-btn
            >
          </div>
        </div>
        <v-divider></v-divider>
      </v-col>
      <v-col>
        <v-alert
          v-if="!formValid && submitAttempted"
          type="error"
          dense
          dismissible
          >Please fix highlighted fields below before sumbitting Report</v-alert
        >
        <!-- Form Fields -->
        <v-form v-model="formValid" ref="form">
          <div class="grid">
            <div>
              <v-text-field
                v-model="heatMap.title"
                label="Title"
                dense
                required
                :readonly="isReadOnly"
                :rules="[(v) => !!v || 'Title is required']"
              ></v-text-field>
            </div>
            <div>
              <v-text-field :readonly="isReadOnly" v-model="heatMap.user" label="Created By" dense>
              </v-text-field>
            </div>
            <div :class="{ description: heatMap.id }">
              <v-text-field
                v-model="heatMap.description"
                label="Description"
                dense
                :readonly="isReadOnly"
              ></v-text-field>
            </div>
            <div>
              <v-file-input
                v-show="heatMap.id != ''"
                placeholder="Please choose a file..."
                type="file"
                @change.native="onChange"
                @click:clear="clearInput('file')"
                dense
              />
              <xlsx-read :options="readOptions" :file="file">
                <xlsx-json
                  :options="readOptions"
                  @parsed="uploadData"
                ></xlsx-json>
              </xlsx-read>
              <div>
              <v-btn v-if="heatMap.id" :disabled="(!file)" class="mb-1" elevation="4" small @click="addNewDataValue"><v-icon>mdi-plus-circle-outline</v-icon> Add New Data</v-btn>
          </div>
            </div>
          </div>
        </v-form>
      </v-col> 
      <!-- Chart Preview -->
      <v-col v-show="heatMap.id && this.heatMap.dataValues && this.heatMap.dataValues.items && this.heatMap.dataValues.items.length > 0" class="col-12">
        <v-card  class="d-flex flex-column preview-container justify-center">
          <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-card-title class="justify-center">
          </v-card-title>
          <div class="ma-4" v-if="(chartType === 'Data Table')">
            <v-data-table :headers="headers" :items="items" :single-select="false" :search="search" :loading="$store.getters.loading" loading-text="Loading... Please wait">
            </v-data-table>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import { XlsxRead } from "vue-xlsx";
  import { XlsxJson } from "vue-xlsx";
  import { mapActions, mapGetters, mapMutations } from "vuex";
  import datasetMixin from "../mixins/dataset-mixin";
  
  export default {
    name: "HeatMapForm",
    components: {
      XlsxRead,
      XlsxJson,
    },
    data() {
      return {
        file: null,
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: ["", ""],
          },
          bezierCurve: false,
        },
        chartType: "Data Table",
        readOptions: {
          cellDates: true,
          raw: false,
          dateNF: "mm/dd/yyyy",
        },
        headers: [],
        value: [],
        items: [],
        selected: [],
        xAxisKeys: [],
        xAxisValue: "",
        formValid: true,
        submitAttempted: false,
        dataValueInput: '',
        isReadOnly: false,
        search: ''
      };
    },
    mixins: [datasetMixin],
    computed: {
      ...mapGetters([
        "heatMap",
        "currentChannels",
        "statusCode",
        "user",
      ]),
    },
    methods: {
      ...mapActions([]),
      ...mapMutations([]),
      onChange(event) {
        this.file = event.target.files ? event.target.files[0] : null;
      },
      resetAndGoBack(){
        this.clear()
        this.$refs.form.reset();
        if (this.$route.path === `/${this.currentChannels[0].name}/gauges`){
          this.$emit("closeAddHeatMapForm")
        } else {
          this.$router.push(`/${this.currentChannels[0].name}/gauges`)
        }
      },
      clear() {
        this.$refs.form.reset();
        this.file = null;
        this.data = [];
        this.selected = [];
        this.headers = [];
        this.items = [];
  
      },
      async saveHeatMap() {
        this.$refs.form.validate();
        if (this.formValid) {
          if (!this.isReadOnly && this.heatMap.id) {
            await this.updateHeatMapById({
              id: this.heatMap.id,
              title: this.heatMap.title,
              description: this.heatMap.description,
              user: this.heatMap.user,
              channelId: this.currentChannels[0].channelId
            }).then(this.isReadOnly = true)
          } else {
            let oldHeatMapIds = this.dataSets.filter(d => this.currentChannels[0].channelId == d.channelId).map(f => f.id)
            await this.addHeatMap({
              title: this.heatMap.title,
              description: this.heatMap.description,
              user: this.heatMap.user,
              channelId: this.currentChannels[0].channelId
            })
            this.fetchHeatMaps().then(() => {
              let lastAdded = this.dataSets.filter(d => this.currentChannels[0].channelId == d.channelId).filter(d => !oldHeatMapIds.includes(d.id))
              let id = lastAdded[0].id
              /* this.$router.push(`/data-sets/${id}`) */
              this.$router.push(`/:title/data-sets/${id}`)
              console.log(this.selected)
              /* console.log(this.selected)
              this.fetchHeatMapThenAddDataValue(id, this.selected) */
  
              this.heatMap.id = id
            })
          }
        }
      },
      async addNewDataValue() {
        let objString = JSON.stringify(this.selected)
        await this.addDataValue({
          data: objString,
          dataSetId: this.heatMap.id
        });
        this.showDataChart()
        this.clearInput("file")
      },
      clearInput(type) {
        this.$refs.form.inputs.forEach(input => {
          if (input.type == type) {
            input.reset()
          }
        })
      },
      editForm() {
        this.isReadOnly = false
      },
      async showDataChart() {
        await this.fetchHeatMap(this.$route.params.dataSetId)
        console.log(this.heatMap)
        //this.createMasterData(this.heatMap.dataValues.items)
        this.uploadData(this.createMasterData(this.heatMap.dataValues.items))
      },
      uploadData(data) {
        console.log(data)
        this.items = data;
        this.selected = data;
        const keys = Object.keys(data[0])
          this.headers = keys.map((item) => ({
          text: item,
          value: item,
          })); 
      },
    },
    async mounted() {
      if (this.$route.path === `/${this.currentChannels[0].name}/data-sets`){ 
        this.heatMap.id = ""
        this.isReadOnly = false
        this.clear()
      } else {
        await this.fetchHeatMap(this.$route.params.dataSetId)
        if (this.heatMap && this.heatMap.dataValues && this.heatMap.dataValues.items && this.heatMap.dataValues.items.length > 0) {
          console.log(this.heatMap.dataValues)
          const keys = Object.keys(this.createMasterData(this.heatMap.dataValues.items)[0])
          //this.xAxisKeys = keys
          this.headers = keys.map((item) => ({
          text: item,
          value: item,
          }));
          //this.selectedHeaders = this.headers
          this.uploadData(this.createMasterData(this.heatMap.dataValues.items))
        }
        this.isReadOnly = true
      }
      this.fetchChannels();
      this.fetchHeatMaps()
      if (!this.heatMap.user) {
        this.heatMap.user = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
      }
    },
    watch: {
      heatMap() {
        if (this.heatMap.id) {
          this.isReadOnly = true
                 
          if (this.heatMap.id !== this.$route.params.dataSetId){
            console.log(this.heatMap)
          this.clear()
          }
        } else this.isReadOnly = false
  
      },
      selected(){
        if (this.selected && this.selected.length > 0){
          //console.log(this.selected)
        } else (console.log("no SELECTED data"))
      },
      statusCode() {
        if (this.statusCode == 201) {
          this.$router.push(`/data-sets/${this.heatMap.id}`);
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
  div >>> .v-select__selections {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  div >>> .v-select__selections .v-chip {
    color: white;
    background-color: #2196F3;
  }
  div >>> .v-select__selections .v-chip .v-icon {
    color: white;
  }
  </style>
  