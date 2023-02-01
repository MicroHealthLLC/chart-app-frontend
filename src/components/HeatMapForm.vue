<template>
<v-container >
  <v-row>
    <!-- Title -->
    <v-col cols="12">
      <div class="d-flex justify-space-between">
        <!-- <h3 v-if="heatMap.id">Update {{ heatMap.title }}</h3> -->
        <h3>Add Heat Map</h3>
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
    <v-col v-if="heatMap.dataSet" class="mt-2 mb-4">
      <v-card>
        <KPIHeatMap :heatMap="heatMap" />
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-alert
        v-if="!formValid && submitAttempted"
        type="error"
        dense
        dismissible
        >Please fix highlighted fields below before submitting Heat Map</v-alert
      >
      <!-- Form Fields -->
      <v-form v-model="formValid" ref="form" class="mt-2">
        <div class="grid">
          <div>
            <v-text-field
              v-model="heatMap.title"
              label="Title"
              dense
              required
              :rules="[(v) => !!v || 'Title is required']"
            ></v-text-field>
          </div>
          <!-- <div>
            <v-text-field v-model="heatMap.user" label="Created By" dense>
            </v-text-field>
          </div> -->
          <div>
          <v-select
            v-model="heatMap.dataSet"
            :items="dataSetChoices"
            item-text="title"
            item-value="id"
            label="Data Set"
            dense
            required
            :rules="[(v) => !!v || 'Data Set is required']"
          ></v-select>
        </div>
        </div>
      </v-form>
    </v-col> 
  </v-row>
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
      formValid: true,
      mapOptions: {
        cols: [
        {
          abs: false,
          yel: 70,
          gre: 90,
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
      } 
    };
  },
  mixins: [datasetMixin],
  computed: {
    ...mapGetters([
      "heatMap",
      "currentChannels",
      "dataSets",
      "statusCode",
      "user",
    ]),
    dataSetChoices(){
      if(this.dataSets) {
        return this.dataSets.filter(d => d.channelId == this.currentChannels[0].channelId);
      }
      return ""
    }
  },
  methods: {
    ...mapActions(["fetchHeatMaps", "fetchHeatMap", "addHeatMap"]),
    ...mapMutations([]),
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    resetAndGoBack(){
      this.clear()
      this.$refs.form.reset();
      if (this.$route.path === `/${this.currentChannels[0].name}/gauges`){
        this.$emit("closeHeatMapForm")
      } else {
        this.$router.go(-1)
        //this.$router.push(`/${this.currentChannels[0].name}/gauges`)
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
      this.submitAttempted = true
      this.$refs.form.validate();
      if (this.formValid) {
        let data = {
          title: this.heatMap.title,
          dataSetId: this.heatMap.dataSet,
          options: JSON.stringify(this.mapOptions),
          channelId: this.currentChannels[0].channelId
        }
        if (this.heatMap.id) {
          data.id = this.heatMap.id
          data.updatedBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
          await this.updateHeatMapById(data)
        } else {
          data.createdBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
          await this.addHeatMap(data)
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
    if (this.$route.path === `/${this.currentChannels[0].name}/gauges`){ 
      this.heatMap.id = ""
      this.isReadOnly = false
      this.clear()
    } else {
      console.log("else")
      await this.fetchHeatMap(this.$route.params.dataSetId)
      /* if (this.heatMap && this.heatMap.dataValues && this.heatMap.dataValues.items && this.heatMap.dataValues.items.length > 0) {
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
    this.fetchHeatMaps() */
    if (!this.heatMap.user) {
      this.heatMap.user = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
    }
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
